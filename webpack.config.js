const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        'bootstrap-loader',
        'react-hot-loader/patch',
    // activate HMR for React

        'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


        './index.js',
    // the entry point of our app
    ],
    output: {
        filename: 'bundle.js',
    // the output bundle

        path: resolve(__dirname, 'dist'),

        publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        https: true,
    // enable HMR on the server

        contentBase: resolve(__dirname, 'dist'),
    // match the output path

        publicPath: '/',
    // match the output `publicPath`
        historyApiFallback: {
            index: '/',
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[name]-[local]-[hash:base64]',
                            modules: true,
                        },
                    },
                    'postcss-loader',
                ],
                include: /flexboxgrid/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader?modules',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|jpg)$/,
                use: 'file-loader',
            },

        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            process: { env: { NODE_ENV: JSON.stringify('development') } },
            APP_ENV: {
                appServer: JSON.stringify('http://127.0.0.1:8000'),
                clientId: JSON.stringify('uJZMHlRFcTHcBYnBctHhrfZQhfv6gg5jbqfgqiR1'),
                clientSecret: JSON.stringify('W9GY47vMMlEftgr3zGP0HjRHlx0LSC09HTrVTG1F3ioadyrzNx2DxmfyPK7DZjoQmR7a8jxzo8o5lNdAOHp8iEeDU0ihce25D9pXiZerVTe1FSCunr3OYwes1Rj9XXhi'),
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.ejs'),
        }),
        new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    ],
}
