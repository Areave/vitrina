const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const React = require('react');

let config = {};

/* 
Mode development || production
*/

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
if (mode === "development") {
    config = {
        ...config,
        mode: "development",
        devtool: "source-map",
        // debug: true,
    };
}
if (mode === "production") {
    config = {
        ...config,
        mode: "production",
        devtool: "source-map",
        // debug: true,
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
    };
}

config = {
    ...config,
    entry: ["@babel/polyfill", "./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        clean: true,
    },
    resolve: {
        extensions: ["*",".js", ".jsx"],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
        }),
        new CleanWebpackPlugin()
    ],
	devServer: {
		historyApiFallback: true
	  },
	optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                // loader: "file-loader",
                // options: {
                //     esModule: false,
                // },
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            publicPath: "",
                            name: "/img/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "application/font-woff",
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.m?js$/,
                // exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        // plugins: ["@babel/plugin-proposal-object-rest-spread"],
                    },
                },
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        // plugins: ['@babel/plugin-proposal-object-rest-spread']
                    },
                },
            },
        ],
    },
};

exports.default = config;
