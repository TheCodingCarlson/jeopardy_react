var webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry: PATHS.app + '/jsx/main.jsx',
	module: {
		loaders: [
			{test: /\.(js|jsx)$/, 
			include: PATHS.app, 
			loader: 'babel'}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		filename: 'bundle.js',
		path: PATHS.dist
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
	devServer: {
      contentBase: PATHS.dist,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      //hot: true,
      //inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      //stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: '172.16.200.104',
      port: process.env.PORT
    },
}