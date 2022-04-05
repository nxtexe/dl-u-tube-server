const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, 'src', 'app.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "url": false,
            "buffer": require.resolve('safe-buffer'),
            "util": false,
            "querystring": false
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'templates'),
                    to: path.resolve(__dirname, 'build', 'templates')
                },
                {
                    from: path.resolve(__dirname, 'src', 'public'),
                    to: path.resolve(__dirname, 'build', 'public')
                }
            ]
        })
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    target: 'node'
}