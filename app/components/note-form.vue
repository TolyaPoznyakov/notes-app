<template>
  <Card class="m-5 w-md h-64 p-4">
    <Input v-model="localTitle" placeholder="Title" />
    <Textarea v-model="localText" placeholder="Text" />
    <Button
        class="w-30 cursor-pointer hover:scale-103"
        variant="outline"
        :disabled="loading"
        @click="submit"
    >
      Add note
    </Button>
  </Card>
</template>

<script setup>
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Card } from "~/components/ui/card"

const emit = defineEmits(['submit'])

defineProps({
  loading: Boolean
})

const localTitle = ref('')
const localText = ref('')

const submit = () => {
  if (!localTitle.value || !localText.value) return

  emit('submit', {
    title: localTitle.value,
    text: localText.value
  })

  localTitle.value = ''
  localText.value = ''
}
</script>
