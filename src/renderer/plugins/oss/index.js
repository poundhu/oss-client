import Instance from './instance'

export default {
  install (Vue, options) {
    Vue.prototype.$objectStorageService = new Instance()
  }
}
