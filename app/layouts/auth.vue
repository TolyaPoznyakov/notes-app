<script setup>
import 'vue-sonner/style.css'
import { Toaster } from '~/components/ui/sonner'
</script>

<template>
  <div class="h-screen">
    <slot />
    <Toaster />
  </div>
</template>
