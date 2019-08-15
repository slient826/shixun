/* eslint-disable no-undef */
const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/joinus.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackPlugin({
            filename: 'join.html',
            title: 'demo',
            template: './join.html'
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')('last 10 versions')
                            ]
                        }
                    }
                ]
            },
            {
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: 'jquery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png)(\?[a-z0-9]+)?$/,
                loader: 'url-loader',
                query: {
                    limit: 8000,
                    name: 'image_joinus/[name].[ext]'
                }
            },
            {
                test: /\.html$/,
                use: ['html-withimg-loader']
            }
        ]
    }
};