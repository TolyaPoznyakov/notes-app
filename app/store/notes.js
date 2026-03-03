import { defineStore } from 'pinia'
import routes from '~/const/routes'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }), // reactive state
  getters: {}, // computed state
  actions: {
    async getAll(categoryId) {
      const res = await useApiRequest(routes.notes.list(), {
        key: 'notes' + new Date().getMilliseconds(), // обхід useFetch кешування
        query: {
          categoryId
        }
      })
      this.notes = res.data.value
    },
    async create(payload) {
      const res = await useApiRequest(routes.notes.list(), {
        key: 'notes' + new Date().getMilliseconds(),
        method: 'POST',
        body: payload
      })
      this.notes.push(res.data.value)
    },
    async update(id, payload) {
      const res = await useApiRequest(routes.notes.concrete(id), {
        method: 'PATCH',
        body: payload
      })
      const updatedNote = res.data.value
      this.notes = this.notes.map((note) => (note._id === id ? updatedNote : note))
      return res
    },
    async delete(id) {
      await useApiRequest(routes.notes.concrete(id), {
        method: 'DELETE'
      })
      this.notes = this.notes.filter((note) => note._id !== id)
    }
  }
})
