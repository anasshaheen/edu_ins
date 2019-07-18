module.exports = {
  parser: 'babel-eslint',
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'arrow-spacing': 2,
    'brace-style': [2, '1tbs'],
    'comma-dangle': [2, 'never'],
    'comma-style': 2,
    'computed-property-spacing': [2, 'never'],
    curly: 0,
    'dot-notation': 2,
    eqeqeq: 2,
    'handle-callback-err': 2,
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ],
    'keyword-spacing': 2,
    'key-spacing': 2,
    'linebreak-style': [0, 'unix'],
    // 'eol-last': [2, 'never'],
    'max-lines': [1, 120],
    'max-depth': [2, 5],
    'max-len': [
      1,
      {
        code: 100,
        tabWidth: 2,
        ignoreUrls: true
      }
    ],
    'newline-before-return': 2,
    'no-underscore-dangle': 0,
    'no-use-before-define': [2, 'nofunc'],
    'no-duplicate-imports': 2,
    'no-useless-computed-key': 2,
    'no-var': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': 2,
    'no-whitespace-before-property': 2,
    'no-process-exit': 0,
    'no-dupe-keys': 2,
    'no-dupe-args': 2,
    'no-undef': [
      2,
      {
        typeof: true
      }
    ],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 0,
    'no-case-declarations': 0,
    'no-fallthrough': 0,
    'no-multi-spaces': 2,
    'no-shadow': 2,
    'no-useless-return': 2,
    'no-irregular-whitespace': 2,
    'object-curly-spacing': [1, 'always'],
    'object-shorthand': [2, 'always'],
    'one-var': [2, 'never'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-template': 2,
    quotes: [2, 'single'],
    'quote-props': [2, 'as-needed'],
    semi: [2, 'always'],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never'
      }
    ],
    'space-before-blocks': [2, 'always'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-in-parens': [2, 'never']
  },
  globals: {
    analytics: false
  },
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
      experimentalObjectRestSpread: true,
      modules: true,
      es6: true,
      classes: true
    }
  }
};
