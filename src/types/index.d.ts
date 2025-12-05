// 可以在这里添加全局类型定义
// declare module '*.module.less' {
//   const classes: { [key: string]: string };
//   export default classes;
// }

declare module "*.m.less" {
  // 声明 .less 文件导出一个键为类名、值为哈希后类名的对象
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
