<script setup lang="ts">
import type {LucideIcon} from "lucide-vue-next"
import {Button} from "@/components/ui/button"
import {useRoute} from "vue-router"
import { Separator } from '@/components/ui/separator'

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  isActive?: boolean;
};

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
  },
  {
    title: 'Password',
    href: '/settings/password',
  },
]

const route = useRoute()

const isCurrentUrl = (path:string)=>path===route.path
</script>

<template>
  <div class="px-4 py-6">
    <h4>Settings</h4>
    <p class="text-muted-foreground mb-4">
      Manage your profile and account settings
    </p>

    <div class="flex flex-col lg:flex-row lg:space-x-12">
      <aside class="w-full max-w-xl lg:w-48">
        <nav
            class="flex flex-col space-y-1 space-x-0"
            aria-label="Settings"
        >
          <Button
              v-for="item in sidebarNavItems"
              :key="item.href"
              variant="ghost"
              :class="[
                            'w-full justify-start',
                            { 'bg-muted': isCurrentUrl(item.href) },
                        ]"
              as-child
          >
            <a :href="item.href">
              <component :is="item.icon" class="h-4 w-4" />
              {{ item.title }}
            </a>
          </Button>
        </nav>
      </aside>

      <Separator class="my-6 lg:hidden" />

      <div class="flex-1 md:max-w-2xl">
        <section class="max-w-xl space-y-12">
          <router-view />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>