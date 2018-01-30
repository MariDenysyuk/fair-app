const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = env => {
    return {
        entry: './src/index.jsx',
        output: {
            path: path.resolve('dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015', 'stage-3']
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader'
                },
                {
                  test: /\.(png|jpg|gif)$/,
                  use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192
                      }
                    }
                  ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                JU_URL: JSON.stringify(env && env.dev ? "https://dev.jobufo.com" : "https://www.jobufo.com")
            })],
        devServer: {
            historyApiFallback: true
        }
    }

};
