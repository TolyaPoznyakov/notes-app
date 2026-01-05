<template>
  <div>
    <Dialog>
      <DialogTrigger><PencilLine :size="18" stroke="black" class="cursor-pointer" /></DialogTrigger>
      <DialogContent class-name="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit note</DialogTitle>
          <DialogDescription>
            Update your note information and save the changes.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label html-for="name-1">Title</Label>
            <Input
              id="name-1"
              v-model="localNote.title"
              placeholder="Top Secret Note"
              name="name"
            />
          </div>
          <div class="grid gap-3">
            <Label html-for="username-1">Text</Label>
            <Textarea
              id="username-1"
              v-model="localNote.text"
              placeholder="Buy milk, eggs, and maybe a dragon… 🐉"
              name="username"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button class="cursor-pointer" variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose as-child>
            <Button class="cursor-pointer" :disabled="!hasChanges" @click="saveChanges"
              >Save changes</Button
            >
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { PencilLine } from 'lucide-vue-next'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})
const localNote = reactive({ ...props.note })

const originalNote = reactive({ ...props.note })

const hasChanges = computed(
  () => localNote.title !== originalNote.title || localNote.text !== originalNote.text
)

const emit = defineEmits(['confirm'])

const saveChanges = () => {
  emit('confirm', { ...localNote })
}
</script>

<style scoped></style>
