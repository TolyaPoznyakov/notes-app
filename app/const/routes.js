export default {
  notes: {
    list: () => '/notes',
    concrete: (id) => `/notes/${id}`
  },
  categories: {
    list: () => '/categories',
    concrete: (id) => `/categories/${id}`
  }
}
