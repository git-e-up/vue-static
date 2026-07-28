import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // pre-existing single-word component names (Content, MyName, MyPic); not worth churn to rename
      'vue/multi-word-component-names': 'off'
    }
  }
]
