import { merge } from 'webpack-merge';
import type { Configuration } from 'webpack';
// 最新版本中类型定义的位置和名称已变更
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import baseConfig from './webpack.config.base';

// 合并Webpack配置和DevServer配置的类型
type WebpackConfiguration = Configuration & {
  devServer?: DevServerConfiguration;
};

const devConfig: WebpackConfiguration = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  
  devServer: {
    open: true,
    port: 3000,
    hot: true,
    static: {
      directory: './public',
    },
    historyApiFallback: true,
    client: {
      logging: 'warn',
    },
  },
});

export default devConfig;
