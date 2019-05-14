const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		watchContentBase: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
        test: /\.js$/,
        use: [
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }
		]
	},
	plugins: [
    new CopyPlugin([
			{ from: 'index.html', to: 'index.html' },
      { from: 'css/', to: 'style.css' }
		]),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
  ]
};