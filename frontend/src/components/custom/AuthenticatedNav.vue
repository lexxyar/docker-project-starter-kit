<script setup lang="ts">
import {CircleCheckIcon, CircleHelpIcon, CircleIcon} from 'lucide-vue-next'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import AppLogoIcon from "@/components/custom/AppLogoIcon.vue"
import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar'
import {computed} from "vue"
import {useAuthStore} from "@/stores/auth.ts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useRouter} from "vue-router"
import {Button} from "@/components/ui/button"
import {useColorMode} from "@vueuse/core"
import { getInitials } from '@/lib/utils'

const auth = useAuthStore()
const router = useRouter()
const theme = useColorMode()

const components: { title: string, href: string, description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
        'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
        'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

const userInitials = computed(() => getInitials(auth.user?.name ?? 'User'))

const handleLogout = async () => {
  try {
    await auth.logout()
    await router.replace('/')
  } catch (e) {
    console.error(e)
  }
}

const handleToggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="flex justify-between max-w-7xl w-full mx-auto px-4 xl:px-0">
    <div class="flex items-center">
      <router-link to="/dashboard">
        <AppLogoIcon class="mr-4"/>
      </router-link>

      <NavigationMenu :viewport="false" class="z-20">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li class="row-span-3">
                  <NavigationMenuLink as-child>
                    <a
                        class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                        href="/"
                    >
                      <div class="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p class="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Tailwind CSS.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <router-link to="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </router-link>
                <router-link to="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </router-link>
                <router-link to="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </router-link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <router-link
                    v-for="component in components"
                    :key="component.title"
                    :title="component.title"
                    :to="component.href"
                >
                  {{ component.description }}
                </router-link>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
              <a href="/docs">Docs</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>List</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">
                      <div class="font-medium">Components</div>
                      <div class="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="#">
                      <div class="font-medium">Documentation</div>
                      <div class="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="#">
                      <div class="font-medium">Blog</div>
                      <div class="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#">Components</a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="#">Documentation</a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="#">Blocks</a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink as-child>
                    <a href="#" class="flex-row items-center gap-2">
                      <CircleHelpIcon/>
                      Backlog
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="#" class="flex-row items-center gap-2">
                      <CircleIcon/>
                      To Do
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="#" class="flex-row items-center gap-2">
                      <CircleCheckIcon/>
                      Done
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div class="flex items-center justify-end gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <div class="flex flex-nowrap gap-2 items-center cursor-default px-1">
            <Avatar class="size-6">
              <AvatarImage src="" alt="user avatar"/>
              <AvatarFallback class="text-xs">{{ userInitials }}</AvatarFallback>
            </Avatar>
            <span>{{ auth.user?.name }}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem @click="()=>router.push('/settings')">
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem @click="handleLogout">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button size="icon-sm" variant="ghost" @click="handleToggleTheme">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
          <path d="M12 3l0 18"></path>
          <path d="M12 9l4.65 -4.65"></path>
          <path d="M12 14.3l7.37 -7.37"></path>
          <path d="M12 19.6l8.85 -8.85"></path>
        </svg>
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>