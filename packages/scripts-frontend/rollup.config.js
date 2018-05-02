import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: [
      // Node Stuff you don't add to package.json
      'path',
      'fs',
      'process',
      // Everything under dependencies in package.json
      ...Object.keys(pkg.dependencies),
    ]
  },
  {
    input: 'src/bin.js',
    output: [
      { file: pkg.bin['scripts-frontend'], format: 'cjs' }
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
