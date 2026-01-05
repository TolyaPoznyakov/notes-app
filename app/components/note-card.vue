<template>
  <Card class="w-xs m-2 p-5">
    <div class="flex items-center">
      <h3>{{ note.title }}</h3>
      <div class="ml-auto flex gap-2">
        <confirm-edit-dialog :key="note._id" :note="note" @confirm="emit('edit', $event)" />
        <confirm-delete-dialog entity="note" @confirm="emit('delete')">
          <Trash2 :size="18" stroke="black" class="cursor-pointer" />
        </confirm-delete-dialog>
      </div>
    </div>
    <hr />
    <p>{{ note.text }}</p>
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
