<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {FieldGroup, FieldSet} from "@/components/ui/field"
import {useAuthForm} from "@/services/Auth.ts"
import FormInput from "@/components/custom/form/FormInput.vue"
import SpinnerIcon from "@/components/custom/SpinnerIcon.vue"
import {useRoute, useRouter} from "vue-router"
import {Separator} from "@/components/ui/separator"
import YandexIdIcon from "@/components/icons/YandexIdIcon.vue"
import type {TSocialProvider} from "@/types"
import {toast} from "vue-sonner"
import {onMounted, ref} from "vue"
import {Spinner} from "@/components/ui/spinner"
import GoogleIcon from "@/components/icons/GoogleIcon.vue"

const redirection = ref(false)
const socialLoginInProgress = ref(false)

const route = useRoute()
const router = useRouter()

const isRegisterForm = route.name === 'register'
const isLoginForm = route.name === 'login'

const form = useAuthForm(isRegisterForm ? 'register' : 'login')

const handleSubmit = async () => {
  try {
    await form.submit()
    if (route.query.ref) {
      window.location.href = route.query.ref.toString()
    } else {
      await router.replace({name: 'dashboard'})
    }
  } catch (e) {
    console.error(e)
  }
}

const handleSocialLogin = async (provider: TSocialProvider) => {
  redirection.value = true
  try {
    await form.socialRedirect(provider)
  } catch (e: any) {
    toast.error('Redirection failed. Try to continue with email.')
  } finally {
    redirection.value = false
  }
}

onMounted(async () => {
  if (!!route.query.m && route.query.m === 'auth') {
    socialLoginInProgress.value = true
    try {
      await form.socialLogin(route.query)
      await router.replace({name: 'dashboard'})
    } catch (e: any) {
      toast.error('Login failed. Try to continue with email.')
    } finally {
      socialLoginInProgress.value = false
    }
  }
})

</script>

<template>
  <div class="relative">
    <div v-if="socialLoginInProgress" class="absolute bg-background/60 inset-0 grid items-center justify-center">
      <Spinner class="size-10"/>
    </div>
    <div class="grid gap-4">
      <Button variant="outline" class="w-full" @click="handleSocialLogin('google')"
              :tabindex="socialLoginInProgress?-1:0">
        <SpinnerIcon v-if="redirection" class="mr-2 h-4 w-4 animate-spin"/>
        <GoogleIcon v-else class="mr-2 size-4"/>
        Google
      </Button>
      <Button variant="outline" class="w-full" @click="handleSocialLogin('yandex')"
              :tabindex="socialLoginInProgress?-1:0">
        <SpinnerIcon v-if="redirection" class="mr-2 h-4 w-4 animate-spin"/>
        <YandexIdIcon v-else class="mr-2 size-4"/>
        Yandex ID
      </Button>
    </div>
    <div class="w-full flex flex-nowrap items-center justify-between gap-3 flex-row my-6">
      <Separator class="flex-1"/>
      <span class="text-muted-foreground whitespace-nowrap">or continue with email</span>
      <Separator class="flex-1"/>
    </div>
    <form @submit.prevent="handleSubmit">
      <FieldSet class="mb-6">

        <FieldGroup>
          <FormInput name="email" label="Email" :disabled="form.busy"/>
          <FormInput name="password" label="Password" type="password" :disabled="form.busy"/>
        </FieldGroup>

      </FieldSet>

      <div class="flex items-center justify-between">
        <Button type="submit" :tabindex="socialLoginInProgress?-1:0">
          <SpinnerIcon v-show="form.busy" class="mr-2 h-4 w-4 animate-spin"/>
          Submit
        </Button>

        <template v-if="isLoginForm">
          <Button variant="link" @click.prevent="()=>router.push({name: 'forgot-password'})"
                  :tabindex="socialLoginInProgress?-1:0">
            Forgot password?
          </Button>
        </template>
        <template v-if="isRegisterForm">
          <Button variant="link" @click.prevent="()=>router.push({name: 'login'})"
                  :tabindex="socialLoginInProgress?-1:0">
            Already have account?
          </Button>
        </template>

      </div>
    </form>
  </div>
</template>
