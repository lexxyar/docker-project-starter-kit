<script setup lang="ts">
import {useRoute, useRouter} from "vue-router"
import {usePasswordResetProfile} from "@/services/Profile.ts"
import {FieldGroup, FieldSet} from "@/components/ui/field"
import {Button} from "@/components/ui/button"
import FormInput from "@/components/custom/form/FormInput.vue"
import {toast} from "vue-sonner"

const router = useRouter()
const route = useRoute()

const query = JSON.parse(atob(route.query.token?.toString() ?? ''))

const form = usePasswordResetProfile(query)

const handleSubmit = async () => {
  try {
    await form.submit()
    toast.success('Password was changed')
    setTimeout(async()=>await router.replace({name: 'login'}), 3)
  } catch (e:any) {
    toast.error(e.message)
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit"
        class="space-y-6"
  >
    <FieldSet class="mb-6">

      <FieldGroup>
        <FormInput name="password" label="New password" type="password" :disabled="form.form.isSubmitting.value"/>
        <FormInput name="password_confirmation" label="Confirm password" type="password"
                   :disabled="form.form.isSubmitting.value"/>
      </FieldGroup>
    </FieldSet>

    <div class="flex items-center gap-4">
      <Button
          :disabled="form.form.isSubmitting.value"
          data-test="update-password-button"
      >Reset password
      </Button
      >
    </div>
  </form>
</template>

<style scoped>

</style>