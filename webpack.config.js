const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  mode:'development',
  entry: './src/app.ts',
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname,'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: "./src/index.html"
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static:'./dist'
  },
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