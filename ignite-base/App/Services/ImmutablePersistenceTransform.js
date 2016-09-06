import R from 'ramda'
import Immutable from 'seamless-immutable'

// is this object already Immutable?
const isImmutable = R.has('asMutable')

// change this Immutable object into a JS object
const convertToJs = (state) => state.asMutable({deep: true})

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = R.when(isImmutable, convertToJs)

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

// the transform interface that redux-persist is expecting
export default {
  out: (state) => {
    // console.log({ retrieving: state })
    // --- HACKZORZ ---
    // Attach a empty-ass function to the object called `mergeDeep`.
    // This tricks redux-persist into just placing our Immutable object into the state tree
    // instead of trying to convert it to a POJO
    // https://github.com/rt2zz/redux-persist/blob/master/src/autoRehydrate.js#L55
    //
    // Another equal terrifying option would be to try to pass their other check
    // which is lodash isPlainObject.
    // --- END HACKZORZ ---
    state.mergeDeep = R.identity
    return toImmutable(state)
  },
  in: (raw) => {
    // console.log({ storing: raw })
    return fromImmutable(raw)
  }
}
