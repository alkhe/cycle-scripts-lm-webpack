'use strict'

var fs = require('fs-extra')
var path = require('path')
var mkdirp = require('mkdirp')
var webpack = require('webpack')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

var buildPath = path.join(process.cwd(), 'build')
var publicPath = path.join(process.cwd(), 'public')

mkdirp.sync(buildPath)

var compiler = webpack({
	resolve: {
		extensions: ['', '.js', '.lm']
	},
	entry: [
		'./src/index.lm'
	],
	output: {
		filename: 'bundle.js',
		path: './public/'
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ },
			{ test: /\.lm$/, loaders: ['babel?presets[]=es2015', 'lambdant'], exclude: /node_modules/ }
		]
	},
	plugins: [
		new ProgressBarPlugin(),
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
})

compiler.run(function (err, stats) {
	if (err) {
		console.log(err)
	} else {
		fs.copySync(publicPath, buildPath)
	}
})
