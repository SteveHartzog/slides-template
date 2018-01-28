
import * as webpack from 'webpack';
import { ProvidePlugin } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import * as tsnode from 'ts-node';
import * as path from 'path';
import { api } from './src/api';

// const Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

var srcDir = path.resolve(__dirname, 'src');
var nodeModules = path.resolve(__dirname, '../node_modules');

module.exports = {
  context: srcDir,
  entry: { main: './main.ts', index: './index.ts' },
  output: {
    path: '/dist',
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.ts$/i, loader: 'awesome-typescript-loader', exclude: path.join(__dirname, 'node_modules') },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader' },
      // Required for FontAwesome 
      { test: /\fontawesome-webfont.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader', 
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../../../node_modules/font-awesome/'
        }
      },
      { test: /index\.html/, loader: "file-loader?name=[name].[ext]" },
      { test: /\.css$/i, issuer: [{ test: /\.html$/i }], use: [ { loader: 'css-loader' } ] },
      { test: /\.scss$/, 
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ],
        issuer: /\.[tj]s$/i
      },
      { test: /\.scss$/, use: ['css-loader', 'sass-loader'], issuer: /\.html?$/i }
    ]
  },
  plugins: [
    // Exposes dependencies in-memory by webpack-dev-server to allow for
    // async loads by head.js, any iframes, or the theme switch in the menu
    new CopyWebpackPlugin([
      // The Ace Editor
      {
        from: '../node_modules/ace-builds/src-min',
        to: './node_modules/ace-builds/src-min'
      },
      // Reveal.js: All Themes, Fonts & Default Plugins
      {
        from: { glob: '../node_modules/reveal.js/**/*' },
        to: './node_modules'
      },
      {
        from: '../plugins/ace/theme/theme-aurelia-dark-plus.js',
        to: './node_modules/ace-builds/src-min/theme-aurelia-dark-plus.js'
      },
      // For Plugins that have no npm install (sad but true)
      { from: { glob: '../plugins/**/*' }, to: './plugins' },
      // Reveal.js: Menu Plugin
      { from: { glob: '../node_modules/reveal.js-menu/**/*' }, to: './node_modules' },
      // Reveal.js: d3js Plugin
      { from: { glob: '../node_modules/reveald3/**/*' }, to: './node_modules' }
    ])
    // new BundleAnalyzerPlugin(),
    // new DashboardPlugin({ port: 80, handler: dashboard.setData  })
    // new DashboardPlugin(dashboard.setData)
  ],
  devServer: {
    clientLogLevel: 'none',
    contentBase: srcDir,
    compress: true,
    historyApiFallback: true,
    port: 80,
    host: '127.0.0.1',
    inline: true,
    quiet: true,
    open: false,
    before: (app) => new api(app)
  }
};