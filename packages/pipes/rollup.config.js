import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: [
      // Everything under dependencies in package.json
      ...Object.keys(pkg.dependencies),
      // Node packages not in package.json
      'path',
      'fs'
    ]
  }
]
