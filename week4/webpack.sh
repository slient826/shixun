#!/bin/bash
npm init --yes
sed -i '7a,"webpack-d":"webpack --mode development",' package.json
sed -i '8a"webpack-p": "webpack --mode production"' package.json
sed -i '$i,"devDependencies": {"@babel/core": "^7.5.5","@babel/preset-env": "^7.5.5","autoprefixer": "^9.6.1","babel-loader": "^8.0.6","clean-webpack-plugin": "^3.0.0","css-loader": "^3.2.0","expose-loader": "^0.7.5","file-loader": "^4.2.0","html-webpack-plugin": "^3.2.0","html-withimg-loader": "^0.1.16","postcss-loader": "^3.0.0","style-loader": "^1.0.0","stylelint-config-standard": "^18.3.0","url-loader": "^2.1.0","webpack": "^4.39.1","webpack-cli": "^3.3.6"},"dependencies": {"jquery": "^3.4.1"},"babel": {"presets": ["@babel/preset-env"],"plugins": []}' package.json

printf "\n"
printf "正在以本地模式安装必要插件，请稍候..."

npm i

echo '{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "semi": "error",
        "no-unused-vars": "warn"
    }
}' >>.eslintrc.json

echo '/* eslint-disable no-undef */
module.exports = {
    extends: "stylelint-config-standard",
    rules: {
        indentation: null,
        "no-missing-end-of-source-newline": null
    }
};'>>stylelint.config.js

echo "/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'demo',
            template: './index.html'
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
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 50,
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
};">>webpack.config.js

mkdir -p css
mkdir -p js
mkdir -p img
mkdir -p scss