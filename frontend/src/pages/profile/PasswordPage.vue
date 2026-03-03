<script setup lang="ts">

import {Button} from "@/components/ui/button"
import {useChangePasswordProfile} from "@/services/Profile.ts"
import {toast} from "vue-sonner"
import {FieldGroup, FieldSet} from "@/components/ui/field"
import FormInput from "@/components/custom/form/FormInput.vue"

const profile = useChangePasswordProfile()
const handleSubmit = async () => {
  try {
    await profile.submit()
    toast.success('Password was changed')
  } catch (e: any) {
    console.error(e)
    toast.error(e.message)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
    <h4>Update password</h4>
    <p class="text-muted-foreground">
      Ensure your account is using a long, random password to stay secure
    </p>
    </div>

    <form @submit.prevent="handleSubmit"
        class="space-y-6"
    >
      <FieldSet class="mb-6">

        <FieldGroup>
          <FormInput name="current_password" label="Current password" type="password" :disabled="profile.form.isSubmitting.value"/>
          <FormInput name="password" label="New password" type="password" :disabled="profile.form.isSubmitting.value"/>
          <FormInput name="password_confirmation" label="Confirm password" type="password" :disabled="profile.form.isSubmitting.value"/>
        </FieldGroup>
      </FieldSet>

      <div class="flex items-center gap-4">
        <Button
            :disabled="profile.form.isSubmitting.value"
            data-test="update-password-button"
        >Save password</Button
        >
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>