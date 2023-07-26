"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfigFile = void 0;
var node_path_1 = require("node:path");
var node_fs_1 = require("node:fs");
var readConfigSync = function (file, log) {
    var json;
    try {
        (0, node_fs_1.accessSync)(file, node_fs_1.constants.R_OK);
        var body = (0, node_fs_1.readFileSync)(file, { encoding: "utf8" });
        json = JSON.parse(body);
    }
    catch (e) {
        log.error("\u65E0\u6CD5\u8BFB\u53D6 ".concat(file, ": ").concat(e.message));
    }
    return json;
};
var parseConfigFile = function (rootDir, log) {
    var configPath = (0, node_path_1.resolve)(rootDir, ".cc3x.json");
    if ((0, node_fs_1.existsSync)(configPath)) {
        log.info("[plugin-ccc3x-proxy] 检测到 自定义配置 (.cc3x.json) 文件, 尝试自动读取解析");
        var c = readConfigSync(configPath, log);
        if (c) {
            var config = {};
            if (typeof c.proxy === "boolean")
                config.proxy = c.proxy;
            if (typeof c.allowedHosts === "string" && c.allowedHosts)
                config.allowedHosts = c.allowedHosts;
            if (typeof c.proxyTarget === "string" && c.proxyTarget)
                config.proxyTarget = c.proxyTarget;
            if (Array.isArray(c.proxyContext) && c.proxyContext.length > 0)
                config.proxyContext = c.proxyContext.map(function (v) { return v.toString(); });
            log.info("[plugin-ccc3x-proxy] 自定义配置 (.cc3x.json) 解析结果: ", config);
            return config;
        }
    }
};
exports.parseConfigFile = parseConfigFile;
