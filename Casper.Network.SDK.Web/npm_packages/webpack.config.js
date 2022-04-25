const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        }
    },
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, '../wwwroot/js'),
        library: 'ledgerInterop',
        libraryTarget: 'window'
    },    
    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
        // ,
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // }),
    ],
};