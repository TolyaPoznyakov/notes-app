<template>
  <div>
    <div class="grid place-items-center mt-[10px] ">
      <note-form
          :loading="loading"
          @submit="createNote"
      />
    </div>
    <div class="grid grid-cols-4">
      <note-card
          v-for="note in notes"
          :key="note._id"
          :note="note"
      />
    </div>
  </div>
</template>

<script setup>
import { useApiRequest } from "~/composables/apiRequest.js"
import routes from "~/const/routes.js"


const notes = ref([])
const loading = ref(false)

const fetchNotes = async () => {
  const res = await useApiRequest(routes.notes.list)
  notes.value = res.data.value
}

const createNote = async (payload) => {
  loading.value = true

  const res = await useApiRequest(routes.notes.list, {
    method: 'POST',
    body: payload
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