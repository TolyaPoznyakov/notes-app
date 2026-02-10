<template>
  <DialogForm v-model="open">
    <template #trigger>
      <Button variant="secondary" class="w-full rounded-none cursor-pointer"> Add category </Button>
    </template>

    <template #title> Create category </template>

    <template #description> Create a new category for your notes. </template>

    <template #body>
      <div class="grid gap-3">
        <Label>Name *</Label>
        <Input v-model="form.name" />
      </div>

      <div class="grid gap-3">
        <Label>Description</Label>
        <Input v-model="form.description" />
      </div>

      <div class="grid gap-3">
        <Label>Color</Label>
        <Input v-model="form.color" />
      </div>
    </template>

    <template #footer>
      <Button variant="outline" @click="open = false">Cancel</Button>
      <Button @click="createCategory">Save</Button>
    </template>
  </DialogForm>
</template>

<script setup>
import { toast } from 'vue-sonner'
import { useCategoriesStore } from '~/store/categories.js'

const categoriesStore = useCategoriesStore()

const open = ref(false)

const form = reactive({
  name: '',
  description: '',
  color: ''
})

const createCategory = async () => {
  try {
    const payload = {
      name: form.name,
      description: form.description,
      color: form.color || null
    }
    await categoriesStore.create(payload)

    toast.success('Category has been created')
    open.value = false
    resetForm()
  } catch (error) {
    toast.error('Failed to create category')
    console.error(error)
  }
}

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.color = ''
}
</script>
