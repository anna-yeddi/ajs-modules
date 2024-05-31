const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
  devServer: {
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 9000,
  },
}
