var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
        sourceMapFilename: '[file].map'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader', {
                loader: 'html-minify-loader',
                options: {
                    comments: false
                }
            }]
        }]
    },
    resolveLoader: {
        modules: [path.join(__dirname, './src/loaders'), 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new HotModuleReplacementPlugin()
    ]
}