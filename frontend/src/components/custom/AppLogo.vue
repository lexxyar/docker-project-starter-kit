<script setup lang="ts">
import AppLogoIcon from '@/components/custom/AppLogoIcon.vue';

const appName: string = import.meta.env.VITE_APP_NAME ?? 'Laravel.app';
const appNames: string[] = appName.split('.');
if (appNames.length === 1) {
  appNames.push('');
}
</script>

<template>
  <router-link to="/" class="flex flex-nowrap items-center">
    <div
        class="">
      <AppLogoIcon class="size-6 text-brand " />
    </div>
    <div class="ml-1 grid flex-1 text-left text-lg">
      <div class="inline-flex mb-0.5 truncate font-semibold leading-none">
        <span class="text-xl font-semibold">{{ appNames[0] }}</span>
        <div v-if="appNames.length > 1">
          <div class="uppercase font-bold text-xs bg-brand text-white px-1 py-0 ml-1.5 rounded-full">
            {{ appNames[1] }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
