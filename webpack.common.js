const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry: './src/app.ts',
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname,'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: "./src/index.html"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test:/\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}