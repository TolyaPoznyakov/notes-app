<template>
  <Card class="w-xs m-2">
    <CardHeader class="flex items-center">
      <CardTitle>{{ note.title }}</CardTitle>
      <CardAction class="ml-auto flex gap-2">
        <confirm-edit-dialog :key="note._id" :note="note" @confirm="emit('edit', $event)" />
        <confirm-delete-dialog entity="note" @confirm="emit('delete')">
          <Trash2 :size="18" stroke="black" class="cursor-pointer" />
        </confirm-delete-dialog>
      </CardAction>
    </CardHeader>
    <hr class="mx-3" />
    <CardContent>
      <p>{{ note.text }}</p>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card } from '~/components/ui/card'
import { Trash2 } from 'lucide-vue-next'

const emit = defineEmits(['delete', 'edit'])

defineProps({
  note: {
    type: Object,
    required: true
  }
})
</script>
