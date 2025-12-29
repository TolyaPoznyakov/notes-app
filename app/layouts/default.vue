<script setup>
import 'vue-sonner/style.css'
import { Toaster } from '~/components/ui/sonner'
</script>

<template>
    <div class="h-screen">
        <main>
            <slot />
        </main>
        <Toaster />
    </div>
</template>