import { defineStore } from 'pinia'
import routes from '~/const/routes'
import { useApiRequest } from '~/composables/apiRequest.js'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    selectedCategoryId: 'all'
  }),
  getters: {},
  actions: {
    async getAll() {
      const res = await useApiRequest(routes.categories.list(), {
        key: 'categories' + new Date().getMilliseconds() // обхід useFetch кешування
      })
      this.categories = res.data.value
    },
    async create(payload) {
      const res = await useApiRequest(routes.categories.list(), {
        method: 'POST',
        body: payload,
        key: 'createCategory' + new Date().getMilliseconds()
      })
      this.categories.push(res.data.value)
    },
    async delete(id) {
      await useApiRequest(routes.categories.concrete(id), {
        method: 'DELETE'
      })
      this.categories = this.categories.filter((category) => category.id !== id)
    },
    setSelectedCategoryId(id) {
      this.selectedCategoryId = id
    }
  }
})
