/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    entry: './js/carousel.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/carousel.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'carousel.html',
            title: 'demo',
            template: './carousel.html'
        })
    ],
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 5500,
        watchContentBase: true
    },
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
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: ['html-withimg-loader']
            }
        ]
    }
};