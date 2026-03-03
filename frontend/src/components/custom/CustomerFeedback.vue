<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import customer01 from '@/assets/images/customer-01.png';
import customer03 from '@/assets/images/customer-03.png';
import customer13 from '@/assets/images/customer-13.png';
import customer22 from '@/assets/images/customer-22.png';
import customer09 from '@/assets/images/customer-09.png';
import { useMediaQuery } from '@vueuse/core';
import { getInitials } from '@/lib/utils';

const feedbacks = [
  {
    id: 1,
    message: 'Текст отзыва 1',
    author: 'Анна',
    position: 'Менеджер по работе с клиентами',
    avatar: customer01
  },
  {
    id: 2,
    message: 'Текст отзыва 2',
    author: 'Алексей',
    position: 'Менеджер проектов',
    avatar: customer09
  },
  {
    id: 3,
    message: 'Текст отзыва 3',
    author: 'Ольга',
    position: 'Финансовый аналитик',
    avatar: customer13
  },
  {
    id: 4,
    message: 'Текст отзыва 4',
    author: 'Константин',
    position: 'Специалист по работе с клиентами',
    avatar: customer03
  },
  {
    id: 5,
    message: 'Текст отзыва 5',
    author: 'Екатерина',
    position: 'Заместитель отдела продаж',
    avatar: customer22
  }
];

let isSmallAvatar = useMediaQuery('(max-width: 1149px)')
const onWindowResize = () => {
  isSmallAvatar = useMediaQuery('(max-width: 1149px)')
}

onMounted(()=>{
  window.addEventListener("resize", onWindowResize);
})
onBeforeUnmount(()=>{
  window.removeEventListener('resize', onWindowResize);
})

const feedback = computed(() => feedbacks[Math.floor(Math.random() * feedbacks.length)]);
</script>

<template>
  <div class="flex gap-4" v-if="feedback">
    <Avatar :size="isSmallAvatar?'base':'lg'">
      <AvatarImage :src="feedback.avatar" :alt="feedback.author" />
      <AvatarFallback>{{ getInitials(feedback.author) }}</AvatarFallback>
    </Avatar>
    <div class="flex-grow">
      <blockquote>
        &ldquo;
        {{ feedback.message }}
        &rdquo;
      </blockquote>
      <div class="border-t text-sm mt-2 pt-2">
        <div>{{ feedback.author }}</div>
        <div class="text-muted-foreground">{{ feedback.position }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
