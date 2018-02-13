import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import prettier from 'rollup-plugin-prettier'
import filesize from 'rollup-plugin-filesize'

const config = (target) => {
  const folder = target
  const babelPresetTarget = (target === 'browser')
    ? { browser: 'last 2 versions' }
    : { node: 6 }

  return {
    input: 'src/index.js',
    output: [
      {
        file: `dist/${folder}/cjs/index.js`,
        format: 'cjs'
      },
      {
        file: `dist/${folder}/es/index.js`,
        format: 'es'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: [['@babel/preset-env', { targets: babelPresetTarget, modules: false }]]
      }),
      cleanup({
        comments: 'none',
        maxEmptyLines: 1
      }),
      prettier({
        printWidth: 100,
        singleQuote: true
      }),
      filesize()
    ]
  }
}

export default [
  config('node'),
  config('browser')
]
