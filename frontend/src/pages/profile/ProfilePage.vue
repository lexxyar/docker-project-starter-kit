<script setup lang="ts">
import {FieldGroup, FieldSet} from "@/components/ui/field"
import {Button} from "@/components/ui/button"
import SpinnerIcon from "@/components/custom/SpinnerIcon.vue"
import FormInput from "@/components/custom/form/FormInput.vue"
import {useProfileInfo} from "@/services/Profile.ts"
import {useAuthStore} from "@/stores/auth.ts"
import {toast} from "vue-sonner"
import DeleteUser from "@/components/custom/DeleteUser.vue"
import {useHttp} from "@/services/api.ts"

const {http} = useHttp()
const {user} = useAuthStore()
const profile = useProfileInfo({name: user?.name ?? '', email: user?.email ?? ''})

const handleUpdateProfile = async () => {
  try {
    await profile.form.handleSubmit(async (values) => {
      try {
        await http.patch('/profile', values)
      } catch (e) {
        console.error(e)
        throw e
      }
    })()
    // await profile.update()
    toast.success('Profile updated')
  } catch (e: any) {
    console.error(e)
    toast.error(e.message)
  }
}
</script>

<template>
  <div>
    <h4>Profile information</h4>
    <p class="text-muted-foreground">
      Update your name and email address
    </p>
  </div>

  <div>
    <form @submit.prevent="handleUpdateProfile">
      <FieldSet class="mb-6">

        <FieldGroup>
          <FormInput name="name" label="Name" :disabled="profile.form.isSubmitting.value"/>
          <FormInput name="email" label="Email" type="email" :disabled="profile.form.isSubmitting.value"/>
        </FieldGroup>

      </FieldSet>

      <Button type="submit">
        <SpinnerIcon v-show="profile.form.isSubmitting.value" class="mr-2 h-4 w-4 animate-spin"/>
        Submit
      </Button>
    </form>
  </div>

  <DeleteUser/>

</template>

<style scoped>

</style>