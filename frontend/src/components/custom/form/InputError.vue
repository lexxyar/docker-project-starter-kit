<script setup lang="ts">
defineProps<{
  errors?: string[]
}>();
</script>

<template>
  <div v-show="(errors?.length ?? 0) > 0">
    <p v-for="(message, index) in errors" :key="index" class="text-sm text-destructive">
      {{ message }}
    </p>
  </div>
</template>

<style scoped>

</style>
