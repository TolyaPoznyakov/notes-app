<template>
  <Card
    class="w-xs m-2 pt-1 transition-all"
    :class="[{ 'opacity-60': note.completed }, deadlineClass]"
  >
    <CardHeader class="flex items-center pl-3">
      <Checkbox class="w-5 h-5" :model-value="note.completed" @update:model-value="completeNote" />
      <CardTitle>
        <p class="max-w-40 break-words" :class="{ 'line-through': note.completed }">
          {{ note.title }}
        </p>
      </CardTitle>
      <CardAction class="ml-auto flex gap-2">
        <Button variant="ghost" class="cursor-pointer hover:scale-103" @click="editNote">
          <PencilLine :size="18" />
        </Button>
        <Button variant="ghost" class="cursor-pointer hover:scale-103" @click="deleteNote">
          <Trash2 :size="18" stroke="black" />
        </Button>
      </CardAction>
    </CardHeader>
    <hr class="mx-3" />
    <CardContent>
      <p class="max-w-xs break-words" :class="{ 'line-through': note.completed }">
        {{ note.text }}
      </p>
      <p
        v-if="note.deadlineAt"
        class="ml-auto pt-4 w-fit break-words text-xs font-medium"
        :class="deadlineTextClass"
      >
        Deadline: {{ formattedDeadlineDate }}
      </p>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card } from '~/components/ui/card'
import { Trash2, PencilLine } from 'lucide-vue-next'
import { useDialogsStore } from '~/store/dialogs'
import NoteForm from '~/components/note-form.vue'
import { useNotesStore } from '~/store/notes'
import { toast } from 'vue-sonner'

const dialogsStore = useDialogsStore()
const notesStore = useNotesStore()

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const formattedDeadlineDate = computed(() => {
  if (!props.note.deadlineAt) return ''
  const jsDate = new Date(props.note.deadlineAt)
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(jsDate)
})

const editNote = () => {
  dialogsStore.open('content', {
    title: 'Edit note',
    description: 'Edit your note information and save the changes',
    component: markRaw(NoteForm),
    componentProps: {
      note: props.note
    }
  })
}

const deleteNote = () => {
  dialogsStore.open('confirm', {
    title: 'Are you sure you want to delete this note?',
    description: 'This action is irreversible, be careful.',
    onSubmit: async () => {
      await notesStore.delete(props.note._id)
      toast.success('Note has been deleted')
    }
  })
}

const completeNote = async () => {
  await notesStore.update(props.note._id, { completed: !props.note.completed })
}

const deadlineClass = computed(() => {
  if (!props.note.deadlineAt || props.note.completed) return ''

  const now = new Date()
  const deadline = new Date(props.note.deadlineAt)
  const diffMs = deadline - now
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 0) return 'border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.45)]'
  if (diffHours < 24) return 'border border-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.35)]'
  return ''
})

const deadlineTextClass = computed(() => {
  if (props.note.completed) return ''
  if (!props.note.deadlineAt) return ''
  return new Date(props.note.deadlineAt) < new Date() ? 'text-red-500' : ''
})
</script>
