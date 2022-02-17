const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TARGET_URL = "https://nielslam.github.io/frankframework.org";

module.exports = (env, argv) => {
    return {
        devServer: {
            static: {
            directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
        },
        mode: 'development',
        entry: './src/js/index.js',
        output: {
            filename: 'main.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            
            clean: true
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "./src/assets", to: "assets" },
                ],
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                inject: 'body',
                base: argv.mode === 'production' ? TARGET_URL : '/',
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            })
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                            implementation: require.resolve("sass"),
                            },
                        },
                    ]
                }
            ]
        }
    }
};