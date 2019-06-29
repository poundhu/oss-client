const transfer = {
  state: {
    active: 0,
    downloads: [],
    uploads: [],
    done: []
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
        const done = state.downloads.splice(index, 1)
        state.done.push(...done)
      }
    },
    'CLEAR_DOWNLOADS' (state) {
      state.downloads = []
    },
    'PUSH_UPLOAD' (state, file) {
      state.uploads.push(file)
    },
    'REMOVE_UPLOAD' (state, file) {
      const index = state.uploads.findIndex(i => i.uuid === file.uuid)
      if (index >= 0) {
        const done = state.uploads.splice(index, 1)
        state.done.push(...done)
      }
    },
    'CLEAR_UPLOADS' (state) {
      state.uploads = []
    },
    'CLEAR_DONE' (state) {
      state.done = []
    }
  }
}

export default transfer
