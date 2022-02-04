module.exports = {
  root: true,

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },

  env: {
    browser: true,
    node: true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  plugins: [
    'vue',
  ],

  extends: [
    '@vue/airbnb',
    'plugin:vue/vue3-recommended',
  ],
};
