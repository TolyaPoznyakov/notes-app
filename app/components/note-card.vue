<template>
  <Card class="w-xs m-5 p-5">
    <h3 class="mb-3 h-0">{{ note.title }}</h3>
    <hr >
    <p>{{ note.text }}</p>
  </Card>
</template>

<script setup>
import { Card } from "~/components/ui/card"

defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>