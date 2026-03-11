<template>
  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <base-form-field name="title" placeholder="Title*" />
    <base-form-field name="text" as="textarea" placeholder="Text*" />
    <CategoryAutocomplete v-model="categoryId" :categories="categories" />
    <div class="flex flex-col gap-2">
      <Label>Deadline</Label>
      <div class="flex gap-2">
        <date-picker v-model="deadlineDate" />
        <base-form-field v-model="deadlineTime" name="deadlineTime" type="time" />
      </div>
    </div>
    <Button
      type="submit"
      class="w-30 cursor-pointer hover:scale-103"
      variant="outline"
      :disabled="loading"
    >
      {{ isEdit ? 'Edit note' : 'Add note' }}
    </Button>
  </form>
</template>

<script setup>
import { Button } from '~/components/ui/button'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { useNotesStore } from '~/store/notes'
import { useCategoriesStore } from '~/store/categories.js'
import { storeToRefs } from 'pinia'
import BaseFormField from '~/components/base-form-field.vue'
import DatePicker from '~/components/date-picker.vue'
import { CalendarDateTime, getLocalTimeZone } from '@internationalized/date'

const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()
const { categories, selectedCategoryId } = storeToRefs(categoriesStore)

const props = defineProps({
  note: {
    type: Object,
    default: null
  },
  closeModal: {
    type: Function,
    default: null
  }
})

const deadlineDate = ref(null)
const deadlineTime = ref(null)

const isEdit = computed(() => props.note !== null)

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Title is required'),
    text: z.string().min(1, 'Text is required')
  })
)

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: formSchema
})

const categoryId = ref(selectedCategoryId.value !== 'all' ? selectedCategoryId.value : null)

const loading = ref(false)

const submit = handleSubmit(async (values) => {
  loading.value = true

  const deadlineAt = ref(null)

  if (deadlineDate.value || deadlineTime.value) {
    let year,
      month,
      day,
      hours = 0,
      minutes = 0

    if (deadlineDate.value) {
      year = deadlineDate.value.year
      month = deadlineDate.value.month
      day = deadlineDate.value.day
    } else {
      const today = new Date()
      year = today.getFullYear()
      month = today.getMonth() + 1
      day = today.getDate()
    }

    if (deadlineTime.value) {
      ;[hours, minutes] = deadlineTime.value.split(':').map(Number)
    }

    const dateTime = new CalendarDateTime(year, month, day, hours, minutes)

    const jsDate = dateTime.toDate(getLocalTimeZone())
    deadlineAt.value = jsDate.toString()
  }

  try {
    const payload = {
      title: values.title,
      text: values.text,
      category: categoryId.value || null,
      deadlineAt
    }
    if (isEdit.value) {
      await notesStore.update(props.note._id, payload)
    } else {
      await notesStore.create(payload)
    }
    toast.success(isEdit.value ? 'Note has been updated' : 'Note has been created')
    resetForm()
    if (props.closeModal) {
      props.closeModal()
    }
    categoryId.value = null
  } catch (error) {
    toast.error('Failed to create note')
    console.error(error)
  } finally {
    loading.value = false
  }
})

onMounted(() => {
  if (isEdit.value) {
    setValues({
      title: props.note.title,
      text: props.note.text
    })
  }
})
</script>
