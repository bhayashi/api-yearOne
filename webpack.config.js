const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    // match the output 'publicPath'
    publicPath: '/build/',
    hot: true,
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            // loader compiles typescript
            loader: 'ts-loader',
          },
        ],
      },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
};