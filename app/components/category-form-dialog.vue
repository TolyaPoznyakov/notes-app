<template>
  <DialogForm v-model="open">
    <template #trigger>
      <Button variant="secondary" class="w-full rounded-none cursor-pointer" @click="openDialog">
        Add category
      </Button>
    </template>

    <template #title> Create category </template>

    <template #description> Create a new category for your notes. </template>

    <template #body>
      <div class="grid gap-3">
        <VeeField v-slot="{ field, errors }" name="name">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Name *</FieldLabel>
            <Input v-bind="field" :aria-invalid="!!errors.length" />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
      </div>

      <div class="grid gap-3">
        <VeeField v-slot="{ field, errors }" name="description">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Description</FieldLabel>
            <Input v-bind="field" :aria-invalid="!!errors.length" />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
      </div>

      <div class="grid gap-3">
        <VeeField v-slot="{ field, errors }" name="color">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Color</FieldLabel>
            <Input v-bind="field" :aria-invalid="!!errors.length" />
            <FieldError v-if="errors.length" :errors="errors" />
          </Field>
        </VeeField>
      </div>
    </template>

    <template #footer>
      <Button variant="outline" @click="open = false">Cancel</Button>
      <Button @click="createCategory">Save</Button>
    </template>
  </DialogForm>
</template>

<script setup>
import { useApiRequest } from '~/composables/apiRequest.js'
import routes from '~/const/routes.js'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { Field, FieldLabel } from '~/components/ui/field/index.js'

const open = ref(false)

const openDialog = () => {
  resetForm() // скидаємо всі поля і помилки
  open.value = true
}

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    color: z.string().optional()
  })
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    description: '',
    color: ''
  }
})

const createCategory = handleSubmit(async (values) => {
  try {
    await useApiRequest(routes.categories.list(), {
      method: 'POST',
      body: values
    })

    toast.success('Category has been created')
    open.value = false
    resetForm()
  } catch (error) {
    toast.error('Failed to create category')
    console.error(error)
  }
})
</script>
