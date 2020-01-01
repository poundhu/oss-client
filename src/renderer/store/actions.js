const actions = {
  setBuckets: ({ commit }, buckets) => commit('SET_BUCKETS', buckets),
  setCurBucket: ({ commit }, bucket) => commit('SET_CURRENT_BUCKET', bucket),
  setBucketFiles: ({ commit }, bucket) => commit('SET_BUCKET_FILES', bucket),
  setBucketLoading: ({ commit }, bucketLoading) => commit('SET_BUCKET_LOADING', bucketLoading),
  setBucketTableView: ({ commit }, isTable) => commit('SET_BUCKET_TABLE', isTable),
  setDirFiles: ({ commit }, files) => commit('SET_DIR_FILES', files),
  pushPrev: ({ commit }, path) => commit('PUSH_PREV', path),
  popPrev: ({ commit }) => commit('POP_PREV'),
  clearPrev: ({ commit }) => commit('CLEAR_PREV'),
  addSelectedItem: ({ commit }, file) => commit('ADD_SELECTED_ITEM', file),
  removeSelectedItem: ({ commit }, file) => commit('REMOVE_SELECTED_ITEM', file),
  selectAllItem: ({ commit }) => commit('SELECT_ALL_ITEM'),
  clearAllSelected: ({ commit }) => commit('CLEAR_ALL_SELECTED'),
  addOSS: ({ commit }, oss) => commit('ADD_OSS', oss),
  setOSS: ({ commit }, oss) => commit('SET_OSS', oss),
  setTActive: ({ commit }, active) => commit('SET_ACTIVE', active),
  pushDownload: ({ commit }, file) => commit('PUSH_DOWNLOAD', file),
  removeDownload: ({ commit }, file) => commit('REMOVE_DOWNLOAD', file),
  clearDownloads: ({ commit }) => commit('CLEAR_DOWNLOADS'),
  pushUpload: ({ commit }, file) => commit('PUSH_UPLOAD', file),
  removeUpload: ({ commit }, file) => commit('REMOVE_UPLOAD', file),
  clearUploads: ({ commit }) => commit('CLEAR_UPLOADS'),
  clearDone: ({ commit }) => commit('CLEAR_DONE'),
  // new
  setCurrentOssAk: ({ commit }, ossAk) => commit('SET_CURRENT_OSS_AK', ossAk),
  setCurrentBucketName: ({ commit }, bucketName) => commit('SET_CURRENT_BUCKET_NAME', bucketName),
  setCurrentBucket: ({ commit }, bucket) => commit('SET_CURRENT_BUCKET', bucket),
  setCurrentOssBucketNames: ({ commit }, bucketNames) => commit('SET_CURRENT_OSS_BUCKET_NAMES', bucketNames)
}

export default actions
