// webpack.config.prod.ts
import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // 生产环境提取 CSS 为单独文件
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'; // 压缩 CSS
import baseConfig from './webpack.config.base';

const prodConfig: Configuration = merge(baseConfig, {
  // 1. 模式：生产环境（webpack 自动启用生产优化，如压缩代码）
  mode: 'production',

  // 2. 开发工具：生成独立的 source-map（用于生产环境调试，不影响代码体积）
  devtool: 'source-map',

  // 3. 输出配置（生产环境单独优化）
  output: {
    // 生产环境 JS 文件名（[contenthash] 是内容哈希，方便缓存）
    filename: 'js/[name].[contenthash:8].js',
    // 拆分的公共 chunk 文件名（如 vendor：第三方依赖）
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
  },

  // 4. 模块规则：生产环境用 MiniCssExtractPlugin 提取 CSS（代替 style-loader）
  module: {
    rules: [
      // 覆盖 base 中的 Less 规则：生产环境提取 CSS 为单独文件
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, // 提取 CSS 到单独文件
          'css-loader',
          'less-loader',
        ],
      },
      // 覆盖 base 中的 CSS 规则
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  // 5. 插件配置：生产环境特有的插件
  plugins: [
    // 提取 CSS 到 dist/css 目录（文件名带哈希，方便缓存）
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
  ],

  // 6. 优化配置（生产环境代码分割、压缩）
  optimization: {
    // 6.1 压缩 CSS（配合 CssMinimizerPlugin）
    minimizer: [
      `...`, // 保留 webpack 默认的 JS 压缩插件（TerserPlugin）
      new CssMinimizerPlugin(), // 新增 CSS 压缩插件
    ],
    // 6.2 代码分割：拆分公共依赖（如 react、react-dom、antd 等）
    splitChunks: {
      chunks: 'all', // 对所有 chunk 进行分割
      cacheGroups: {
        // 拆分第三方依赖（node_modules 里的包）到 vendor.chunk.js
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 里的文件
          name: 'vendor', // 拆分后的 chunk 名
          priority: 10, // 优先级（越高越先被匹配）
          reuseExistingChunk: true, // 复用已有的 chunk（避免重复打包）
        },
        // 拆分公共组件/工具函数（被多个页面引用的代码）
        common: {
          name: 'common',
          minChunks: 2, // 至少被引用 2 次才会拆分
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    // 6.3 运行时 chunk 分离（避免依赖变化导致入口文件哈希变化，优化缓存）
    runtimeChunk: {
      name: 'runtime',
    },
  },
});

export default prodConfig;