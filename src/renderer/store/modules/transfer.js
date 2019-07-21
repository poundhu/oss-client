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
    'REMOVE_DOWNLOAD' (state, downloadId) {
      const index = state.downloads.findIndex(i => i.downloadId === downloadId)
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
    'REMOVE_UPLOAD' (state, uploadId) {
      const index = state.uploads.findIndex(i => i.uploadId === uploadId)
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
