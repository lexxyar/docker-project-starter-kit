<script setup lang="ts">
import AppLogo from "@/components/custom/AppLogo.vue"
import AuthLink from "@/components/custom/AuthLink.vue"
import CustomerFeedback from "@/components/custom/CustomerFeedback.vue"

defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div
      class="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <!--            <AppLogo class="z-20" />-->
      <div class="relative z-20 mt-auto">
        <CustomerFeedback />
      </div>
    </div>
    <div class="lg:p-8">
      <AppLogo class="z-20 absolute left-10 top-10 lg:text-white text-foreground" />
      <AuthLink />
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-xl font-medium tracking-tight" v-if="title">{{ title }}</h1>
          <p class="text-sm text-muted-foreground" v-if="description">{{ description }}</p>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
