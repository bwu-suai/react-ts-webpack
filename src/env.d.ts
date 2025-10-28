// 声明 process.env 的类型
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      API_BASE_URL: string; // 与 Webpack 注入的自定义变量对应
      // 其他变量...
    }
  }
}

// 确保该文件被 TypeScript 识别（在 tsconfig.json 中包含）
export {};