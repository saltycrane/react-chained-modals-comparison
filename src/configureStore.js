/* global __DEV__ */
if (__DEV__) {
  // use CommonJS `require` instead of ES6 `import` because the
  // latter is not allowed inside an if statement.
  // Uglify will remove dead code branches from the Webpack bundle.
  // https://github.com/gaearon/redux-devtools#exclude-devtools-from-production-builds
  module.exports = require('./configureStore.dev');
} else {
  module.exports = require('./configureStore.prod');
}
