export default {
  notes: {
    list: () => '/notes'
  },
  categories: {
    list: () => '/categories',
    concrete: id => `/categories/${id}`
  }
}