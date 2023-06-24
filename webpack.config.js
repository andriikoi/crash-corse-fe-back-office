const path = require('path');
const fs = require('fs');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

if (fs.existsSync('./public/favicon.ico')) {
    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('dist');
    }
    fs.copyFileSync('./public/favicon.ico', './dist/favicon.ico');
}

const plugins = [
    //new CleanWebpackPlugin(),
    new Dotenv()
];

if (process.env.NODE_ENV === 'development') {
    plugins.push(new ReactRefreshWebpackPlugin());
}

const client = {
    entry: ["./src/index.tsx"],
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
        publicPath: "/",
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

const server = {
    entry: ["./server/server.tsx"],
    target: 'node',
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
        publicPath: "/",
        filename: "server.js"
    },
    plugins
};

module.exports = [client, server];
