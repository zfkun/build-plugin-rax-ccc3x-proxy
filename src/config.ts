// IDE 本地预览地址 (浏览器模式)
export const DEFAULT_PROXY_TARGET = "http://localhost:7456";

// 资源代理规则列表
export const DEFAULT_PROXY_CONTEXT = [
  // 2.x 支持
  "/preview-scripts",
  "/preview-scene",
  "/app",
  "/boot.js",

  // 预览器
  "/preview-app",

  // 基础
  "/settings",
  "/socket.io",
  "/scripting",
  "/query-extname",

  // 资源
  "/scene",
  "/assets",

  // 插件
  "/plugins",

  // 扩展
  "/engine_external",
];
