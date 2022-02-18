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
    // entry: ["./src/index.jsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        clean: true,
        // publicPath: '/public/',
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
	optimization: {
        minimize: false
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
                // options: {
                // 	limit: 10000,
                // 	name: PATH + '.[ext]' //Path will be assets or image path
                // }
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/i,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 name: "/public/icons/[name].[ext]",
            //             },
            //         },
            //     ],
            // },
            // {
            // 	test: /\.(ttf|woff|woff2|eot|svg)$/,
            // 	use: ['file-loader']
            // 	// use: ['url-loader?limit=100000']
            // },
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
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        // edge: "17",
                                        // firefox: "60",
                                        // chrome: "97",
                                        // safari: "11.1",
                                    	firefox: "5.5",
                                        ie: 6,
                                    },
                                    // browsers: ["edge >= 16", "safari >= 9", "firefox >= 5.5", "ie >= 6", "ios >= 9", "chrome >= 49"],
                                },
                            ],
                        ],
                        plugins: ["@babel/plugin-proposal-object-rest-spread"],
                    },
                },
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        // edge: "17",
                                        // firefox: "60",
                                        // chrome: "97",
                                        // safari: "11.1",
                                        ie: 6,
                                    },
                                },
                            ],
                            "@babel/preset-react",
                        ],
                        // plugins: ['@babel/plugin-proposal-object-rest-spread']
                    },
                },
            },
        ],
    },
};

exports.default = config;
