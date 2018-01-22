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
        vendor: ["react"]
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
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
            Assets: path.join(__dirname, 'assets')
        }
    },


    plugins: [
        new HtmlWebpackPlugin({
            title: 'Torrent streamer',
            template: PATHS.indexTemplate
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
        })
    ]
};

var config = merge([
    commonConfig,
    parts.loadCSS(),
    parts.loadLESS(),
    parts.loadSCSS(),
    parts.loadFonts({ options: "[name].[ext]" }),
    parts.loadJSX({ exclude: /node_modules/ }),
    parts.loadJS({ exclude: /node_modules/ }),
    parts.loadJSON()
]);

module.exports = config;
