const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';

let target = 'web'; // в режиме разработки browserlist  не используется

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';// в продакшен режиме используем browserslist
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html', // Данный html будет использован как шаблон
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
];// Создаем массив плагинов

module.exports = {
  mode,

  target,

  plugins,

  entry: './src/js/index.js', // Указываем точку входа - главный модуль приложения, в который импортируются все остальные

  output: {
    path: path.resolve(__dirname, 'dist'), // Директория, в которой будет размещаться итоговый бандл, папка dist в корне приложения
    assetModuleFilename: 'assets/[hash][ext][query]', // Все ассеты будут складываться в dist/assets
    clean: true, // Очищает директорию dist перед обновлением
    // бандла cвойство стало доступно с версии 5.20.0, до этого использовался
  },

  devtool: 'source-map', // Позволяет отображать нумерации строк и названия функций и переменных в инструментах отладки(Devtools) как в исходном коде.

  devServer: {
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(s*)css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource', // В продакшен режиме изображения размером до 8кб будут инлайнится в код, В режиме разработки все изображения будут помещаться в dist/assets
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // не обрабатываем файлы из node_modules
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Использование кэша для избежания рекомпиляции
            // при каждом запуске
          },
        },
      },
    ],
  },

};
