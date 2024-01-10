const path = require('path');

module.exports = {
    mode: 'development',

    // CSP回避のためソースマップ作成
    devtool: "source-map",
    entry: './src/popup/popup.jsx',
    output: {
        path: path.resolve(__dirname, './src/popup/bundle'),
        filename: 'popup.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};