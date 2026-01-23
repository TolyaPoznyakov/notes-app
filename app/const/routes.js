export default {
  auth: {
    register: () => '/auth/register',
    login: () => '/auth/login',
    profile: () => '/auth/profile'
  },
  notes: {
    list: () => '/notes',
    concrete: (id) => `/notes/${id}`
  },
  categories: {
    list: () => '/categories',
    concrete: (id) => `/categories/${id}`
  }
}
