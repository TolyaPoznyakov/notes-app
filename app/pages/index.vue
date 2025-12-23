<template>
  <div>
    <div class="grid place-items-center mt-[10px] ">
      <Card
          class="m-5 w-md h-64 p-4"
      >
        <Input v-model="title" placeholder="Title"/>
        <Textarea v-model="text" placeholder="Text"/>
        <Button class="w-30" variant="outline" :disabled="loading" @click="createNote">Add note</Button>
      </Card>
    </div>
    <div class="grid grid-cols-4">
      <Card
          v-for="note in notes"
          :key="note._id"
          class="w-xs m-5 p-5"
      >
        <h3 class="mb-3 h-1"> {{ note.title }}</h3>
        <hr>
        <p> {{ note.text }}</p>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useApiRequest } from "~/composables/apiRequest.js"
import routes from "~/const/routes.js"
import { Button } from "~/components/ui/button/index.js"
import { Input } from "~/components/ui/input/index.js"
import { Textarea } from "~/components/ui/textarea/index.js"
import { Card } from "~/components/ui/card/index.js"


const notes = ref([])
const title = ref('')
const text = ref('')
const loading = ref(false)

const fetchNotes = async () => {
  const res = await useApiRequest(routes.notes.list)
  notes.value = res.data.value
}

const createNote = async () => {
  if (!title.value || !text.value) return

  loading.value = true
  const res = await useApiRequest(routes.notes.list, {
    method: 'POST',
    body: {
      title: title.value,
      text: text.value
    }
  })
  notes.value.push(res.data.value)
  title.value = ''
  text.value = ''
  loading.value = false
}



onMounted(async () => {
  await fetchNotes()
})
</script>


<style scoped>

</style>