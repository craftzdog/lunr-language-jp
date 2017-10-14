import webpack from 'webpack'
import path from 'path'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    library: 'lunrLanguageJp',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'lib'),
    filename: 'index.js'
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}

if (process.env.NODE_ENV !== 'production') {
  config.cache = true
  config.devtool = 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    ...config.plugins,
    new UglifyJSPlugin()
  ]
}

export default config
