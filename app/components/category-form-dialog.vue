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
import { useApiRequest } from '~/composables/apiRequest.js'
import routes from '~/const/routes.js'
import { toast } from 'vue-sonner'

const open = ref(false)

const form = reactive({
  name: '',
  description: '',
  color: ''
})

const createCategory = async () => {
  try {
    await useApiRequest(routes.categories.list(), {
      method: 'POST',
      body: form
    })

    toast.success('Category has been created')
    open.value = false

    form.name = ''
    form.description = ''
    form.color = ''
  } catch (error) {
    toast.error('Failed to create category')
    console.error(error)
  }
}
</script>
