<template>
  <DialogForm v-model:open="open">
    <template #trigger>
      <PencilLine :size="18" class="cursor-pointer" />
    </template>

    <template #title>Edit note</template>

    <template #description> Update your note information and save the changes. </template>

    <template #body>
      <div class="grid gap-3">
        <Label>Title</Label>
        <Input v-model="localNote.title" placeholder="Top Secret Note" />
      </div>

      <div class="grid gap-3">
        <Label>Text</Label>
        <Textarea v-model="localNote.text" placeholder="Buy milk, eggs, and maybe a dragon… 🐉" />
      </div>
    </template>

    <template #footer>
      <DialogClose as-child>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <!--      <DialogClose as-child>-->
      <!--      </DialogClose>-->
      <Button :disabled="!hasChanges" @click="saveChanges"> Save </Button>
    </template>
  </DialogForm>
</template>

<script setup>
import { PencilLine } from 'lucide-vue-next'
import { useNotesStore } from '~/store/notes'
import { toast } from 'vue-sonner'

const notesStore = useNotesStore()

const open = ref(false)

const props = defineProps({
  note: { type: Object, required: true }
})

const emit = defineEmits(['confirm'])

const localNote = reactive({ ...props.note })
const originalNote = reactive({ ...props.note })

const hasChanges = computed(
  () => localNote.title !== originalNote.title || localNote.text !== originalNote.text
)

const saveChanges = async () => {
  const res = await notesStore.update(props.note._id, localNote)
  emit('confirm', res.data.value)
  toast.success('Note updated')
  open.value = false
}
</script>
