const type = {
  base: 'HelveticaNeue',
  bold: 'HelveticaNeue-Bold',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  title: 30,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: 38
  },
  h2: {
    fontFamily: type.bold,
    fontSize: 34
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: 30
  },
  h4: {
    fontFamily: type.base,
    fontSize: 26
  },
  h5: {
    fontFamily: type.bold,
    fontSize: 24
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: 19
  },
  normal: {
    fontFamily: type.base,
    fontSize: 15
  }
}

export default {
  type,
  size,
  style
}

