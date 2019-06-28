import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['tActive', 'downloads'])
  },
  methods: {
    ...mapActions(['setTActive', 'pushDownload', 'removeDownload',
      'clearDownloads'])
  }
}
