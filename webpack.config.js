var Clean = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var merge = require("webpack-merge");
var path = require("path");
var pkg = require("./package.json");
var webpack = require("webpack");

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, "src");
var BUILD_PATH = path.resolve(ROOT_PATH, "dist");

var common = {
    entry: [
        APP_PATH
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: BUILD_PATH,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Comments",
            template: "src/index-template.html",
            inject: "body"
        })
    ],
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, "node_modules/bootstrap-sass/assets/stylesheets"),
            path.resolve(__dirname, "node_modules/bootstrap-sass/assets/fonts")
        ]
    }
};

if (TARGET === "start" || !TARGET) {
    module.exports = merge(common, {
        devtool: "eval-source-map",
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            port: 3000
        },
        // to specify options (in particular the editor) for redbox-react for react-transform-catch-errors for babel-plugin-react-transform
        resolve: {
            alias: {
                reporterOptions: path.join(__dirname, "reporterOptions.js")
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: true
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"],
                    include: APP_PATH
                },
                {
                    test: /\.js$/,
                    loaders: ["babel"],
                    include: APP_PATH
                }
            ]
        }
    });
}
else if (TARGET === "build") {
    module.exports = merge(common, {
        devtool: "source-map",
        entry: {
            // separate entries for "app" and "vendor" code
            app: APP_PATH,
            // the vendor bundle includes all the modules in the "dependencies"
            // section of package.json except for "bootstrap-sass" (because I
            // don't need to bootstrap javascript right now).
            vendor: Object.keys(pkg.dependencies).filter(item => item !== "bootstrap-sass")
        },
        output: {
            path: BUILD_PATH,
            filename: "[name].[chunkhash].js?"
        },
        plugins: [
            // used to set feature flags which can be accessed by the app
            new webpack.DefinePlugin({
                __DEV__: false
            }),
            // used to delete the "dist" directory before building
            new Clean(["dist"]),
            // used to create the CSS file
            new ExtractTextPlugin("style.[chunkhash].css"),
            // used to make the React library size slightly smaller
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            // used to minimize the javascript
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            // used to separate the vendor JS from the app JS
            new webpack.optimize.CommonsChunkPlugin(
                "vendor",
                "[name].[chunkhash].js"
            )
        ],
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
                    include: APP_PATH
                },
                {
                    test: /\.js$/,
                    loaders: ["babel"],
                    include: APP_PATH
                }
            ]
        }
    });
}
