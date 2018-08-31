import { src } from './paths'

const modules = {
  rules: [
    {
      test: /\.(js|jsx|mjs)$/,
      enforce: 'pre',
      use: [
        {
          options: {
            eslintPath: require.resolve('eslint'),
            baseConfig: {
              extends: [require.resolve('@pixel2html/eslint-config')]
            },
            ignore: false,
            useEslintrc: false
          },
          loader: require.resolve('eslint-loader')
        }
      ],
      include: src
    },
    {
      oneOf: [
      // Parse OUR js
        {
          test: /\.(js|jsx|mjs)$/,
          include: src,
          exclude: [/[/\\\\]node_modules[/\\\\]/],
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [require.resolve('@pixel2html/babel-preset')],
              compact: true,
              highlightCode: true,
            }
          }
        },
        // Parse VENDOR js
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              compact: false,
              presets: [require.resolve('@pixel2html/babel-preset/dependencies')],
              cacheDirectory: true,
              highlightCode: true,
            }
          }
        }
      ]
    }
  ] }

export default modules
