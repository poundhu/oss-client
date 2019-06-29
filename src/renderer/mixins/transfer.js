import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tActive', 'downloads', 'done', 'uploads'])
  },
  methods: {
    ...mapActions(['setTActive', 'pushDownload', 'removeDownload',
      'clearDownloads', 'pushUpload', 'removeUpload', 'clearUploads', 'clearDone'])
  }
}
