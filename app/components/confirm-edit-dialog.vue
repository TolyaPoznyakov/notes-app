<template>
  <DialogForm v-model:open="open">
    <template #trigger>
      <PencilLine :size="18" class="cursor-pointer" />
    </template>

    <template #title>Edit note</template>

    <template #description> Update your note information and save the changes. </template>

    <template #body>
      <div class="grid gap-3">
        <VeeField v-slot="{ errors }" name="title">
          <Field :data-invalid="!!errors.length">
            <Label>Title</Label>
            <Input
              v-model="title"
              v-bind="titleAttrs"
              placeholder="Top Secret Note"
              :aria-invalid="!!errors.length"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
      </div>
      <div class="grid gap-3">
        <VeeField v-slot="{ errors }" name="text">
          <Field :data-invalid="!!errors.length">
            <Label>Text</Label>
            <Textarea
              v-model="text"
              v-bind="textAttrs"
              placeholder="Buy milk, eggs, and maybe a dragon… 🐉"
              :aria-invalid="!!errors.length"
            />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
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
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'

const notesStore = useNotesStore()


const open = ref(false)

const props = defineProps({
  note: { type: Object, required: true }
})
const emit = defineEmits(['confirm'])

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Title is required'),
    text: z.string().min(1, 'Text is required')
  })
)
const { setValues, defineField } = useForm({ validationSchema: formSchema })

const [title, titleAttrs] = defineField('title')
const [text, textAttrs] = defineField('text')

// Set form values when the dialog opens (or when note changes) so fields show the current note
watch(
  () => [open.value, props.note], // TODO: make it simplier
  () => {
    // TODO: make it simplier
    if (open.value && props.note) {
      setValues({
        title: props.note.title,
        text: props.note.text
      })
    }
  }
)

const hasChanges = computed(
  () =>
    (title.value ?? '') !== (props.note?.title ?? '') ||
    (text.value ?? '') !== (props.note?.text ?? '')
)

const saveChanges = async () => {
  const res = await notesStore.update(props.note._id, localNote)
  emit('confirm', res.data.value)
  toast.success('Note updated')
  open.value = false
}
</script>
