<script setup lang="ts">

import AuthenticatedNav from "@/components/custom/AuthenticatedNav.vue"
</script>

<template>
  <div class="min-h-screen flex flex-col">

    <AuthenticatedNav />

<!--    <AuthenticatedPageHeader :sticky="stickyHeader"/>-->

    <main class="flex-1 flex m-4">
      <div class="mx-auto max-w-7xl w-full flex-1">
        <slot/>
      </div>
    </main>
    <!--    <footer>-->
    <!--      <SiteFooter/>-->
    <!--    </footer>-->
  </div>
</template>

<style scoped>

</style>