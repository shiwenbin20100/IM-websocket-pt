const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"dist")
        // publicPath: "/assets/"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts",".tsx",".js",".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            { 
                enforce: "pre", test: /\.js$/, 
                loader: "source-map-loader"
             }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    devServer: {
        host: "localhost",
        port: 9000,
        open: true,
        hot: true,
        contentBase: path.join(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
        })
    ]
}