const path = require('path');
const Extract = require('extract-text-webpack-plugin');
//const staticGenerator = require('static-site-generator-webpack-plugin')
// ^ looks mighty useful, but I'll leave that for later (not installed yet)

const cssExtract = new Extract("styles.css");
const htmlExtract = new Extract("[name].html");

module.exports = {
    entry: {
        app: "./script/wrapper.js",
        style: "./style/main.less",

        index: "./views/index.pug",
        react: "./views/react.pug",
        reaction: "./views/reaction.pug",
        process: "./views/process.pug",
        process2: "./views/dynamic.pug"
    },
    output: {
        path: path.join(__dirname,"docs"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: cssExtract.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader','less-loader'],
                })
            },
            {
                test: /\.pug$/,
                use: htmlExtract.extract({
                    use: ['html-loader?attrs=false','pug-html-loader'],
                }),

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                }
            }
        ]
    },
    plugins: [ htmlExtract, cssExtract ]
}
