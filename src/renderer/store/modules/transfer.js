const transfer = {
  state: {
    active: 0,
    downloads: [],
    uploads: []
  },
  mutations: {
    'SET_ACTIVE' (state, active) {
      state.active = active
    },
    'PUSH_DOWNLOAD' (state, file) {
      state.downloads.push(file)
    },
    'REMOVE_DOWNLOAD' (state, file) {
      const index = state.downloads.findIndex(i => i.uuid === file.uuid)
      if (index >= 0) {
        state.downloads.splice(index, 1)
      }
    },
    'CLEAR_DOWNLOADS' (state) {
      state.downloads = []
    }
  }
}

export default transfer
