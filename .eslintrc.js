module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    indent: ["error", 4],
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "no-unused-vars": ["warn"],
    "array-bracket-spacing": ["error", "always"],
    "no-underscore-dangle": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/accessible-emoji": 0
  },
};
