const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    target: 'electron',
    entry: {
        'main': './src/renderer/main/index.js',
        'loading': './src/renderer/loading/index.js'
    },
    output: { //输出
        path: path.join(__dirname, 'public'),
        filename: 'js/[name].js'
    },
    resolve: {
        modules: ['node_modules'], //node_modules用于搜索模块的目录
        alias: {}, //别名
        extensions: ['.js', '.jsx'] //用于自动处理某些扩展名
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                exclude: /node_modules/
            }, {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader']
                })
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader",
                query: {
                    limit: 8196,
                    name: './images/[hash].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 4096,
                    name: './fonts/[hash].[ext]'
                }
            }, {
                test: /\.(json)$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, //移除注释
            },
            compress: { //压缩脚本
                warnings: false,
                drop_console: false
            }
        }),
        new ExtractTextPlugin('[name].css'), //输出css
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: [autoprefixer]
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            filename: 'main.html',
            title: 'icenote',
            inject: 'body',
            chunks: ['main'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            filename: 'loading.html',
            title: 'loading',
            inject: 'body',
            chunks: ['loading'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    ],
    devtool: process.env.NODE_ENV === 'production'
        ? undefined
        : 'cheap-module-eval-source-map'
};
