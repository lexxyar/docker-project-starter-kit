<script setup lang="ts">

import {Button} from "@/components/ui/button"
import {useRouter} from "vue-router"
import {useAuthStore} from "@/stores/auth.ts"

const router = useRouter()
const auth = useAuthStore()

</script>

<template>
  HomePage
  <template v-if="!auth.isLoggedIn">
    <Button @click="()=>router.push({name: 'login'})">Login</Button>
    <Button @click="()=>router.push({name: 'register'})">Register</Button>
  </template>
  <template v-else>
    <Button @click="()=>router.push({name: 'dashboard'})">Dashboard</Button>
  </template>
</template>

<style scoped>

</style>