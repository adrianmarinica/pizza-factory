const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        //        vendor: ['moment']
    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'src/**/*.css', flatten: true },
            { from: 'src/**/*.html', flatten: true },
            { from: 'src/**/*.png', flatten: true }
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
};