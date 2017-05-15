const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// const path = require('path')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const clientSecret =
    'rmlZEIFyOtx5jPX7GBtkzWWf6KuX0hpQCJOChbpMAbltEZg5cmvXKrWSiUdEQDoGzfSuUD7Ki8yXw5BNsJx4PoqiKD1D8qzDeXtdDWYZZp1WsUc3lMwOzxmTKpKwWgsO'

module.exports = {
    entry: [
        'bootstrap-loader',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js',
    ],
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    cache: true,
    context: resolve(__dirname, 'src'),
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
        // https: true, // needed by Stripe
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
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                include: /flexboxgrid/,
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[path][name]__[local]',
                            modules: true,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|jpg|png)$/,
                use: 'file-loader',
            },
            {
                test: /\.graphql$/,
                loader: 'graphql-tag/loader',
            },
        ],
    },

    plugins: [
        new LodashModuleReplacementPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/), //eslint-disable-line
        // new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            process: { env: { NODE_ENV: JSON.stringify('development') } },
            APP_ENV: {
                stripeClientId: JSON.stringify('pk_test_VQtPlmj5VhEm9xOlrRJIDxWG'),
                appServer: JSON.stringify('http://127.0.0.1:8000'),
                clientId: JSON.stringify('Y2Zx6W64q65ibWnXFoFFwVBk038t2gEVcV8cLC6v'),
                clientSecret: JSON.stringify(clientSecret),
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.context && module.context.indexOf('node_modules') !== -1
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src/index.ejs'),
        }),
        new webpack.NamedModulesPlugin(),
        // new FaviconsWebpackPlugin({
        //     logo: path.join(__dirname, 'assets', 'logo-thumb.png'),
        //     persistentCache: true,
        //     inject: true,
        //     background: '#fff',
        //     title: 'Occasions App',
        //     icons: {
        //         android: true,
        //         appleIcon: true,
        //         appleStartup: true,
        //         coast: false,
        //         favicons: true,
        //         firefox: true,
        //     },
        // }),
    ],
}
