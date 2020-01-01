/*
config:{
ak,sk,origin
}
 */

export default {
  state: {
    ossConfigList: [],
    currentOssBucketNames: [],
    currentBucketName: '',
    currentOssAk: '',
    currentBucket: {}
  },
  mutations: {
    'SET_CURRENT_BUCKET_NAME' (state, bucketName) {
      state.currentBucketName = bucketName
    },
    'SET_CURRENT_OSS_AK' (state, ossAk) {
      state.currentOssAk = ossAk
    },
    'SET_CURRENT_BUCKET' (state, bucket) {
      state.currentBucket = bucket
    },
    'SET_CURRENT_OSS_BUCKET_NAMES' (state, bucketNames) {
      state.currentOssBucketNames = bucketNames
    }
  }
}
