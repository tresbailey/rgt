const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});
module.exports = {
	entry: [
		'font-awesome/scss/font-awesome.scss',
		'./src/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js',
        publicPath: '/',
	},
    devServer: {
        historyApiFallback: true
    },
	resolve: {
		extensions: [ '.js', '.jsx'],
		modules: ['node_modules']
	},
	module: {
		loaders: [
		{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/,
        options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        },
		{
			test: /\.scss$/,
			loaders: ["style-loader", "css-loader", "sass-loader"]
		},
		{
			test: /\.css$/,
			loaders: ["style-loader", "css-loader", "sass-loader"]
		},
		{
			test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			// Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
			// loader: "url?limit=10000"
			use: "url-loader"
		},
		{
			test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
			use: 'file-loader'
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
				'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}
		]/*,
		   rules: [{
		   test: /\.scss$/,
		   use: [{
		   loader: "style-loader" // creates style nodes from JS strings
		   }, {
		   loader: "css-loader", options: { // translates CSS into CommonJS
		   sourceMap: true
		   }
		   }, {
		   loader: "sass-loader", options: { // compiles Sass to CSS
		   sourceMap: true
		   }
		   }]
		   }]
		   */
	},
	plugins: [HtmlWebpackPluginConfig]
}
