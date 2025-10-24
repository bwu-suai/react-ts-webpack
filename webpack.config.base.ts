// webpack.config.base.ts
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";
import webpack from "webpack";
import dotenv from "dotenv";

// 项目根目录（避免硬编码路径）
const rootDir = path.resolve(__dirname);

// 1. 先定义环境类型（明确允许的值）
type EnvType = "development" | "production";

// 2. 给 env 添加类型断言，限制为 EnvType
const env = (process.env.NODE_ENV || "development") as EnvType;

// 3. 保持 envVariables 定义（此时索引类型匹配）
type EnvVars = Record<string, string>;
const envVariables: Record<EnvType, EnvVars> = {
  // 这里用 EnvType 更简洁
  development: {
    "process.env.API_BASE_URL": JSON.stringify("https://dev.api.example.com"),
    "process.env.ENABLE_LOG": JSON.stringify(true),
  },
  production: {
    "process.env.API_BASE_URL": JSON.stringify("https://prod.api.example.com"),
    "process.env.ENABLE_LOG": JSON.stringify(false),
  },
};

const envPath = path.resolve(rootDir, `.env.${env}`); // 路径：根目录/.env.development
const envConfig = dotenv.config({ path: envPath }).parsed || {}; // 解析 .env 文件内容

// 处理 .env 变量：转换为 DefinePlugin 所需的格式（key: JSON.stringify(value)）
const envFromDotenv = Object.entries(envConfig).reduce((acc, [key, value]) => {
  // 建议统一前缀（如 VITE_ 或 REACT_APP_），避免与系统变量冲突
  acc[`process.env.${key}`] = JSON.stringify(value);
  return acc;
}, {} as Record<string, string>);

const baseConfig: Configuration = {
  // 1. 入口文件（对应你项目的 src/index.tsx）
  entry: path.resolve(rootDir, "src", "index.tsx"),

  // 2. 出口配置
  output: {
    // 打包后的文件放在 dist 目录
    path: path.resolve(rootDir, "dist"),
    // 打包后的 JS 文件名（[name] 是入口名，默认是 main）
    filename: "js/[name].[hash:8].js",
    // 每次打包前清空 dist 目录（避免旧文件残留）
    clean: true,
    // 静态资源（图片、字体等）的路径前缀（配合 devServer/prod 用）
    publicPath: "/",
  },

  // 3. 解析规则（处理 TS/JS/React/Less 等文件）
  module: {
    rules: [
      // 3.1 解析 TypeScript + React（用 babel 转译）
      {
        test: /\.(ts|tsx|js|jsx)$/,
        // 排除 node_modules（不转译第三方依赖）
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // 预设：处理 React + TS + ES6+
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },

      // 3.2 解析 Less（配合 css-loader 处理样式）
      {
        test: /\.less$/,
        // 顺序：从后往前执行（less-loader → css-loader → style-loader）
        use: [
          "style-loader", // 把 CSS 注入到 HTML 的 style 标签里（开发环境用）
          "css-loader", // 解析 CSS 文件中的 @import 和 url()
          "less-loader", // 把 Less 编译成 CSS
        ],
        // 排除 node_modules（如果需要处理 antd 的 Less，可去掉这行）
        exclude: /node_modules/,
      },

      // 3.3 解析 CSS（如果项目里有单独的 .css 文件）
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // 3.4 解析图片、字体等静态资源
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        type: "asset", // webpack5 新特性：自动判断是转 base64（小文件）还是输出文件（大文件）
        parser: {
          dataUrlCondition: {
            // 小于 10kb 的文件转 base64（减少请求数）
            maxSize: 10 * 1024,
          },
        },
        generator: {
          // 静态资源输出到 dist/assets 目录
          filename: "assets/[name].[hash:8][ext]",
        },
      },
    ],
  },

  // 4. 插件配置（扩展 Webpack 功能）
  plugins: [
    // 4.1 自动生成 Html 文件，并注入打包后的 JS/CSS
    new HtmlWebpackPlugin({
      // 模板：用 public/index.html 当基础
      template: path.resolve(rootDir, "public", "index.html"),
      // 打包后的 Html 文件名（默认是 index.html）
      filename: "index.html",
      // 压缩 Html（开发环境可关闭，生产环境自动开启）
      minify: {
        removeComments: false, // 开发环境不删除注释
        collapseWhitespace: false, // 不折叠空格
      },
    }),

    // 根据当前环境注入变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env), // 注入当前环境标识
      ...envVariables[env], // 合并对应环境的变量
      ...envFromDotenv, // 新增：合并 .env 文件中的变量
    }),
  ],

  // 5. 解析路径别名（比如用 @ 代替 src，方便导入）
  resolve: {
    // 优先解析这些后缀的文件（导入时可省略后缀，如 import App from './App' 不用写 .tsx）
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
    // 路径别名
    alias: {
      "@": path.resolve(rootDir, "src"), // 例如：import utils from '@/utils' → 对应 src/utils
    },
  },
};

export default baseConfig;
