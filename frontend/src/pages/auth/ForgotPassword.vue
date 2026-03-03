<script setup lang="ts">
import {MailCheckIcon} from "lucide-vue-next"
import {useForgotPasswordProfile} from "@/services/Profile.ts"
import {FieldGroup, FieldSet} from "@/components/ui/field"
import {Button} from "@/components/ui/button"
import SpinnerIcon from "@/components/custom/SpinnerIcon.vue"
import FormInput from "@/components/custom/form/FormInput.vue"
import {toast} from "vue-sonner"
import {useRouter} from "vue-router"
import {ref} from "vue"

const sent = ref(false)

const router = useRouter()
const form = useForgotPasswordProfile()

const handleSubmit = async () => {
  try {
    await form.submit()
    toast.success('Reset password link sent. Check your email.')
    sent.value = true
  } catch (e: any) {
    toast.error('Send password reset link failed')
  }
}
</script>

<template>
  <form v-if="!sent" @submit.prevent="handleSubmit">
    <FieldSet class="mb-6">

      <FieldGroup>
        <FormInput name="email" label="Email" :disabled="form.busy.value"/>
      </FieldGroup>

    </FieldSet>

    <div class="flex items-center justify-between">
      <Button type="submit">
        <SpinnerIcon v-show="form.busy.value" class="mr-2 h-4 w-4 animate-spin"/>
        Send reset password link
      </Button>

      <Button variant="link" @click.prevent="()=>router.push({name: 'login'})">
        Login page
      </Button>
    </div>
  </form>
  <template v-else>
    <div class="flex flex-col items-center gap-4">
      <MailCheckIcon class="size-10" />
      <div>Reset password link sent. Check your email.</div>
    </div>
  </template>
</template>

<style scoped>

</style>