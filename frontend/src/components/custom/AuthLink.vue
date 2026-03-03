<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {reactive, watch} from 'vue'
import {Button} from "@/components/ui/button"

const route = useRoute()
const router = useRouter()

const state = reactive({
  title: '',
  authRouteName: 'login',
  isRegisterForm: false,
  isLoginForm: false,
})

const fill = (path: string) => {
  state.title = 'Login'
  state.authRouteName = 'login'

  state.isRegisterForm = path === 'register'
  state.isLoginForm = path === 'login'
  if (state.isRegisterForm) {
    state.title = 'Login'
    state.authRouteName = 'login'
  }
  if (state.isLoginForm) {
    state.title = 'Register'
    state.authRouteName = 'register'
  }
  if (!state.isLoginForm && !state.isRegisterForm) {
    state.isRegisterForm = true
  }

};

fill(route.name?.toString() ?? '')

watch(() => route.name?.toString() ?? '', (value: string) => {
  fill(value)
});

</script>

<template>
  <Button variant="link"
          class="absolute right-10 top-10"
          @click="()=>router.replace({name:state.authRouteName})"
  >
    {{ state.title }}
  </Button>
</template>

<style scoped>

</style>
