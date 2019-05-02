class MockGluegunBuilder {
  constructor() {
    this.reset()
  }

  reset() {
    this.props = {
      loadAlls: [],
      tokens: {},
    }
  }

  onCreateRuntime(fn) {
    this.runtimeMaker = fn
  }

  brand(brand) {
    this.props.brand = brand
    return this
  }

  loadDefault(dir) {
    this.props.loadDefault = dir
    return this
  }

  loadAll(dir, opts = {}) {
    this.props.loadAlls.push({ dir, opts })
    return this
  }

  token(key, value) {
    this.props.tokens[key] = value
    return this
  }

  createRuntime() {
    return this.runtimeMaker(this.props)
  }
}

module.exports = MockGluegunBuilder
