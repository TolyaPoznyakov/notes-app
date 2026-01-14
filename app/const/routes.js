export default {
  auth: {
    register: () => '/auth/register'
    // login: () => '/auth/login' роут для входу в систему
    // profile: () => '/auth/profile' роут для отримання профілю користувача
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
