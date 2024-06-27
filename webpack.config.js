const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './src/ts/program.ts',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.(glsl|vs|fs)$/,
                use: {
                    loader: 'ts-shader-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    }, 
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
            ],
        })
    ],   
}