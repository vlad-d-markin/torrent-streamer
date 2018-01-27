const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'index.jsx'),
    indexTemplate: path.join(__dirname, 'template.ejs'),
    build: path.join(__dirname, '..', 'dist')
};

var commonConfig = {
    entry: {
        app: PATHS.app,
        // vendor: ["react", "jquery", "redux", "react-redux"],
        hot: 'webpack-hot-middleware/client'
    },
    output: {
        path: PATHS.build,
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js',
    },
    devtool: 'source-map',
    target: 'web',
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: [".js", ".json", ".jsx"],
        alias: {
            Components: path.join(__dirname, 'components'),
            Containers: path.join(__dirname, 'containers'),
            Actions: path.join(__dirname, 'actions'),
            Reducers: path.join(__dirname, 'reducers'),
            Assets: path.join(__dirname, 'assets'),
            Const: path.join(__dirname, 'const.js')
        }
    },


    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),
        new HtmlWebpackPlugin({
            title: 'Torrent streamer',
            template: PATHS.indexTemplate
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

var config = merge([
    commonConfig,
    parts.loadCSS(),
    parts.loadLESS(),
    parts.loadSCSS(),
    parts.loadFonts({ options: "[name].[ext]" }),
    parts.loadJSX({ exclude: /node_modules/, hmr: true }),
    parts.loadJS({ exclude: /node_modules/ }),
    parts.loadJSON()
]);

module.exports = config;
