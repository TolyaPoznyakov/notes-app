export const useDialogsStore = defineStore('dialogs', {
  state: () => ({
    dialogs: {
      content: {
        isOpen: false,
        params: null,
        resolve: null
      },
      confirm: {
        isOpen: false,
        params: null,
        resolve: null
      }
    }
  }),
  actions: {
    open(type, params) {
      return new Promise((resolve) => {
        this.dialogs[type].isOpen = true
        this.dialogs[type].resolve = resolve
        this.dialogs[type].params = params
      })
    },
    close(type, data) {
      this.dialogs[type].isOpen = false
      this.dialogs[type].resolve(data ?? null)
      this.dialogs[type].params = null
    }
  }
})