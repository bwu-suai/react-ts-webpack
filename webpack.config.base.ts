import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";
import webpack from "webpack";
import dotenv from "dotenv";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const rootDir = path.resolve(__dirname);
type EnvType = "development" | "production";
const env = (process.env.NODE_ENV || "development") as EnvType;
const isProduction = env === "production"; // 新增：环境判断变量

// 环境变量处理（保持不变）
type EnvVars = Record<string, string>;
const envVariables: Record<EnvType, EnvVars> = {
  development: {
    "process.env.API_BASE_URL": JSON.stringify("https://dev.api.example.com"),
    "process.env.ENABLE_LOG": JSON.stringify(true),
  },
  production: {
    "process.env.API_BASE_URL": JSON.stringify("https://prod.api.example.com"),
    "process.env.ENABLE_LOG": JSON.stringify(false),
  },
};
const envPath = path.resolve(rootDir, `.env.${env}`);
const envConfig = dotenv.config({ path: envPath }).parsed || {};
const envFromDotenv = Object.entries(envConfig).reduce((acc, [key, value]) => {
  acc[`process.env.${key}`] = JSON.stringify(value);
  return acc;
}, {} as Record<string, string>);

// 核心：根据环境动态选择样式 loader（统一管理）
const getStyleLoader = () => {
  return isProduction
    ? MiniCssExtractPlugin.loader // 生产环境：提取 CSS 为文件
    : "style-loader"; // 开发环境：注入到 <style> 标签
};

const baseConfig: Configuration = {
  entry: path.resolve(rootDir, "src", "index.tsx"),
  output: {
    path: path.resolve(rootDir, "dist"),
    filename: "js/[name].[hash:8].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      // 1. 解析 TS/JS/React（保持不变）
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },

      // 2. 处理项目内的 Less（合并重复规则，启用 CSS Modules）
      {
        test: /\.less$/,
        exclude: /node_modules/, // 排除第三方库
        use: [
          getStyleLoader(), // 动态选择 loader（核心：避免重复）
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:6]", // CSS Modules 类名格式
              },
            },
          },
          "less-loader", // 编译 Less 为 CSS
        ],
      },

      // 3. 处理 node_modules 中的 Less（如 antd，不启用 CSS Modules）
      {
        test: /\.less$/,
        include: /node_modules/, // 只处理第三方库
        use: [
          getStyleLoader(), // 同样动态选择 loader
          "css-loader", // 不启用 modules（避免第三方样式被局部化）
          "less-loader",
        ],
      },

      // 4. 处理 CSS 文件（区分环境）
      {
        test: /\.css$/,
        use: [
          getStyleLoader(), // 生产环境提取，开发环境注入
          "css-loader",
        ],
      },

      // 5. 处理静态资源（保持不变）
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 },
        },
        generator: {
          filename: "assets/[name].[hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public", "index.html"),
      filename: "index.html",
      minify: {
        removeComments: isProduction, // 生产环境删除注释
        collapseWhitespace: isProduction, // 生产环境折叠空格
      },
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
      ...envVariables[env],
      ...envFromDotenv,
    }),
    // 生产环境实例化 MiniCssExtractPlugin（核心：之前缺失）
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css", // 输出 CSS 路径和文件名
            chunkFilename: "css/[name].[contenthash:8].chunk.css", // 异步 chunk 的 CSS
          }),
        ]
      : []),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
};

export default baseConfig;
