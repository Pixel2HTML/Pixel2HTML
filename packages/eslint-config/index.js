module.exports = {
  extends: 'standard',
  // all valid babel is valid linted
  parser: 'babel-eslint',
  rules: {
    'semi': 'off',
    'comma-dangle': 'off'
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    jquery: true,
  }
}
