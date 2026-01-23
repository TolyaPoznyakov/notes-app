<template>
  <div>
    <header class="flex justify-end m-5">
      <user-profile-popover />
    </header>
    <main>
      <slot />
    </main>
    <Toaster />
  </div>
</template>

<script setup>
import 'vue-sonner/style.css'
import { Toaster } from '~/components/ui/sonner'
import UserProfilePopover from '~/components/user-profile-popover.vue'
</script>
