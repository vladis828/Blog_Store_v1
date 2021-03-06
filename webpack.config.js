const path = require('path')

module.exports = {
  mode: 'development',
  entry: [
    '@babel/polyfill',
    './app/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      // use the style-loader/css-loader combos for anything matching the .css extension
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         bypassOnDebug: true, // webpack@1.x
      //         disable: true, // webpack@2.x and newer
      //       },
      //     },
      //   ],
      // }

      {
        test: /\.(jpg|png|gif)$/,
        use: ['file-loader'],
      }
    ]
  }
}
