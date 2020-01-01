const app = {
  state: {
    buckets: [],
    curBucketName: '',
    curBucketFiles: [],
    bucketLoading: false,
    bucketTableView: true,
    dirFiles: [],
    prev: [],
    curPath: '',
    selected: [],
    ossArr: [],
    oss: null
  },
  mutations: {
    // 'SET_CURRENT_BUCKET' (state, bucket) {
    //   state.curBucketName = bucket
    //   state.curBucketFiles = state.buckets[state.curBucketName]
    // },
    'SET_BUCKET_FILES' (state, { name, files }) {
      state.buckets[name] = files
    },
    'SET_BUCKETS' (state, buckets) {
      state.buckets = buckets
    },
    'SET_BUCKET_LOADING' (state, loading) {
      state.bucketLoading = loading
    },
    'SET_BUCKET_TABLE' (state, isTable) {
      state.bucketTableView = isTable
    },
    'SET_DIR_FILES' (state, files) {
      state.dirFiles = files
    },
    'PUSH_PREV' (state, path) {
      state.curPath = path.path
      state.prev.push(path)
    },
    'POP_PREV' (state) {
      if (state.prev.length > 1) {
        state.prev.pop()
        state.curPath = state.prev[state.prev.length - 1].path
      }
    },
    'CLEAR_PREV' (state) {
      state.prev = []
    },
    'ADD_SELECTED_ITEM' (state, hash) {
      const index = state.curBucketFiles.findIndex(item => item.uuid === hash)
      const currentIndex = state.selected.findIndex(item => item.uuid === hash)
      if (currentIndex < 0 && index >= 0) {
        state.selected.push(state.curBucketFiles[index])
      }
    },
    'REMOVE_SELECTED_ITEM' (state, hash) {
      const index = state.selected.findIndex(item => item.hash === hash)
      if (index >= 0) {
        state.selected.splice(index, 1)
      }
    },
    'SELECT_ALL_ITEM' (state) {
      state.selected = state.curBucketFiles
    },
    'CLEAR_ALL_SELECTED' (state) {
      state.selected = []
    },
    'ADD_OSS' (state, oss) {
      if (state.ossArr.findIndex(item => item.ak === oss.ak) < 0) {
        state.ossArr.push(oss)
      }
    },
    'SET_OSS' (state, oss) {
      state.oss = oss
    }
  }
}

export default app
