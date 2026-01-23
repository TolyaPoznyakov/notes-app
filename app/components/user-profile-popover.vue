<template>
  <Popover>
    <PopoverTrigger as-child>
      <Avatar class="w-12 h-12 cursor-pointer">
        <AvatarImage :src="avatarUrl" alt="User avatar" />
        <AvatarFallback>{{ initials }}</AvatarFallback>
      </Avatar>
    </PopoverTrigger>
    <PopoverContent
      side="left"
      side-offset="1"
      class="mim-w-50 p-0 mt-1.5 border rounded-md shadow-md"
    >
      <div class="p-3">
        <p class="text-base font-medium">{{ username }}</p>
        <p class="text-base font-medium">{{ email }}</p>
      </div>
      <Button variant="secondary" class="w-full rounded-none cursor-pointer" @click="logout"
        >Log out</Button
      >
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { useUser } from '~/composables/useUser'
import { Popover } from '~/components/ui/popover/index.js'
import { Avatar } from '~/components/ui/avatar/index.js'

const user = useUser()

const logout = () => {
  user.clearUser()
  if (import.meta.client) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
  navigateTo('/auth/sign-in')
}

const username = computed(() => user.user.value?.username ?? 'Guest')
const email = computed(() => user.user.value?.email ?? 'guest@example.com')

const initials = computed(() => {
  return username.value
    .split(' ')
    .map((w) => w[0].toUpperCase())
    .join('')
})

const avatarUrl =
  'https://hille-lebensmittel.de/wp-content/uploads/2016/09/platzhalter-portrait-750x750.jpg'
</script>
