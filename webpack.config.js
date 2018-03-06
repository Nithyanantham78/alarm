const webpack = require("webpack");
const path = require("path");


var DIST = path.resolve(__dirname,"dist");
var SRC = path.resolve(__dirname,"src");



var config = {
	entry:SRC+"/index.js",
	output:{
		path:DIST+"/",
		filename:"bundle.js",
		publicPath:"/"
	},
	module:{
		loaders:[{
			test:/\.js$/,
			include:SRC,
			exclude:/node_modules/,
			loader:"babel-loader",
			query:{
				presets:['react','es2015','stage-2']
			}
		},
		{
			test: /\.css$/,
			use:["style-loader","css-loader"]	
      		
		}
		]
	}
};


module.exports = config;