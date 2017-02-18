const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        'bootstrap-loader',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        https: true, // needed by Stripe
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/',
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
                stripeClientId: JSON.stringify('pk_test_VQtPlmj5VhEm9xOlrRJIDxWG'),
                appServer: JSON.stringify('http://127.0.0.1:8000'),
                clientId: JSON.stringify('uJZMHlRFcTHcBYnBctHhrfZQhfv6gg5jbqfgqiR1'),
                clientSecret: JSON.stringify('W9GY47vMMlEftgr3zGP0HjRHlx0LSC09HTrVTG1F3ioadyrzNx2DxmfyPK7DZjoQmR7a8jxzo8o5lNdAOHp8iEeDU0ihce25D9pXiZerVTe1FSCunr3OYwes1Rj9XXhi'),
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.ejs'),
        }),
        new webpack.NamedModulesPlugin(),
    ],
}
