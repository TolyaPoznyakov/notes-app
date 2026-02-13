<template>
  <Card class="w-xs m-2">
    <CardHeader class="flex items-center">
      <CardTitle>{{ note.title }}</CardTitle>
      <CardAction class="ml-auto flex gap-2">
        <Button variant="ghost" class="cursor-pointer" @click="editNote">
          <PencilLine :size="18"/>
        </Button>
        <Button variant="ghost" class="cursor-pointer" @click="deleteNote">
          <Trash2 :size="18" stroke="black"/>
        </Button>
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
</script>
