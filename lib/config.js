"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PROXY_CONTEXT = exports.DEFAULT_PROXY_TARGET = void 0;
// IDE 本地预览地址 (浏览器模式)
exports.DEFAULT_PROXY_TARGET = "http://localhost:7456";
// 资源代理规则列表
exports.DEFAULT_PROXY_CONTEXT = [
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
];
