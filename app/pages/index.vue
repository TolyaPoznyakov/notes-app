<template>
<div>
  <div
      v-for="note in notes"
      :key="note._id"
  >
    <h3> {{ note.title }}</h3>
    <p> {{ note.text }}</p>
  </div>
  <Button variant="outline" :disabled="loading" @click="createNote">Add note</Button>
</div>
</template>

<script setup>
import { useApiRequest } from "~/composables/apiRequest.js"
import routes from "~/const/routes.js"
import { Button } from "~/components/ui/button/index.js"

const notes = ref([])
const loading = ref(false)

const fetchNotes = async () => {
  const res = await useApiRequest(routes.notes.list)
  notes.value = res.data.value
}

const createNote = async () => {
  loading.value = true
  const res = await useApiRequest(routes.notes.list, {
    method: 'POST',
    body: {
      title: 'Example title',
      text: 'Lorem Ipsum test tsetes qwqwfqfqf'
    }
  })
  notes.value.push(res.data.value)
  loading.value = false
}



onMounted(async () => {
  await fetchNotes()
})
</script>


<style scoped>

</style>