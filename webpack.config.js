const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const plugins = [new Dotenv()];

if (process.env.NODE_ENV === 'development') {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    entry: "./src/index.tsx",
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/env", "@babel/preset-react", "@babel/preset-typescript"],
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public/"),
        },
        historyApiFallback: true,
        hot: true,
        port: 3000,
    },
    plugins
};
