import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs', exports: 'named' },
      { file: pkg.module, format: 'es', exports: 'named' }
    ],
    external: [
      // Node Stuff you don't add to package.json
      'path',
      'fs',
      'process',
      // Everything under dependencies in package.json
      ...Object.keys(pkg.dependencies),
    ]
  }
]
