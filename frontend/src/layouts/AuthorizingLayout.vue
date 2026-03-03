<script lang="ts" setup>

import {computed, reactive, watch} from 'vue'
import {useRoute} from 'vue-router'
import AuthLayout from "@/components/partials/layouts/AuthSplitLayout.vue"

const route = useRoute()

const state = reactive({
  isRegisterForm: false,
  isLoginForm: false,
  isForgotPasswordForm: false,
  isResetPasswordForm: false,
})

const fill = (name: string) => {
  state.isRegisterForm = name === 'register'
  state.isLoginForm = name === 'login'
  state.isForgotPasswordForm = name === 'forgot-password'
  state.isResetPasswordForm = name === 'reset-password'
}

const title = computed(() => {
  switch (true) {
    case state.isRegisterForm:
      return 'Register'
    case state.isLoginForm:
      return 'Login'
    case state.isForgotPasswordForm:
      return 'Forgot password?'
    case state.isResetPasswordForm:
      return 'New password'
    default:
      return 'Unknown page'
  }
})

fill(route.name?.toString() ?? '')

watch(() => route.name?.toString() ?? '', (value: string) => {
  fill(value)
})

</script>

<template>
  <AuthLayout :title="title">
    <slot/>
  </AuthLayout>
</template>

<style scoped>

</style>
