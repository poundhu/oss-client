export default class Buckets {
  navigator
  buckets
  cursor

  set (name, bucket) {
    this.buckets[name] = bucket
  }

  get (name) {
    return this.buckets[name]
  }
}
