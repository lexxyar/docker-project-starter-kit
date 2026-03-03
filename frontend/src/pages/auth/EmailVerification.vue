<script setup lang="ts">
import {CircleXIcon, MailCheckIcon} from "lucide-vue-next"
import {useRoute, useRouter} from "vue-router"
import {computed, ref} from "vue"
import {useHttp} from "@/services/api.ts"
import {Spinner} from "@/components/ui/spinner"
import type {AxiosError, AxiosResponse} from "axios"
import {Button} from "@/components/ui/button"
import {toast} from "vue-sonner"
import {Separator} from "@/components/ui/separator"

const {http} = useHttp()
const route = useRoute()
const router = useRouter()
const processing = ref(true)
const hasError = ref(false)
const resended = ref(false)

const decodeToken = (token: string): string => {
  return atob(token);
}

const hasToken = computed((): boolean => !!route.query.token)

if (hasToken.value) {
  const url = decodeToken(route.query.token!.toString())
      .replace(http.defaults.baseURL!, '')
  http.get(url)
      .then((response: AxiosResponse) => {
        if ([200, 204].includes(response.status)) {
          router.replace({name: 'dashboard'})
        }
      })
      .catch((e: AxiosError) => {
        console.log(e.message)
        hasError.value = true
      })
      .finally(() => {
        processing.value = false
      })
}

const handleResend = async () => {
  try {
    await http.post('/email/verification-notification')
    resended.value = true
    toast.success('New verification link sent to your email')
  } catch (e: any) {
    toast.error('Resend email verification link failed')
  }
}
</script>

<template>
  <div class="h-screen w-screen grid items-center justify-center">
    <template v-if="!resended">
      <template v-if="processing">
        <div class="flex flex-col items-center justify-center">
          <Spinner class="size-10"/>
          <div>Verifying...</div>
        </div>
      </template>
      <template v-else>
        <template v-if="hasError">
          <div class="flex flex-col items-center justify-center gap-4">
            <CircleXIcon class="size-10 text-destructive"/>
            <div class="text-destructive">Email verification failed</div>
            <Button @click="handleResend">Resend verification link</Button>
            <!--          <div class="flex items-center justify-center w-full gap-3">-->
            <!--            <Separator class="flex-1" />-->
            <!--            <span class="text-muted-foreground">or</span>-->
            <!--            <Separator class="flex-1" />-->
            <!--          </div>-->
          </div>
        </template>
      </template>
    </template>
    <template v-else>
      <div class="flex flex-col items-center justify-center gap-4 ">
        <MailCheckIcon class="size-10"/>
        <div>New verification link sent. Please check your email.</div>
        <div class="flex items-center justify-center w-full gap-3">
          <Separator class="flex-1"/>
          <span class="text-muted-foreground">or</span>
          <Separator class="flex-1"/>
        </div>
        <Button class="w-full" @click="()=>router.replace('/')">Go to home page</Button>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>