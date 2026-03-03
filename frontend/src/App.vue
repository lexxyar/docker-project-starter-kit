<script setup lang="ts">
import AppContainerLayout from "@/layouts/AppContainerLayout.vue";
import 'vue-sonner/style.css'
import {Toaster} from "vue-sonner"
</script>

<template>
  <AppContainerLayout>
    <router-view/>
  </AppContainerLayout>
  <Toaster/>
</template>

<style scoped>

</style>
