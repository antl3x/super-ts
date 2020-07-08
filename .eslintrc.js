module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-array-constructor': "off",
    'no-unexpected-multiline': "off",
    '@typescript-eslint/ban-types': "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-use-before-define': "off",
    '@typescript-eslint/no-empty-interface': "off",
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true },
    ],
    'func-call-spacing': [
      'error',
      'always',
      { allowNewlines: true },
    ],
  },
};
