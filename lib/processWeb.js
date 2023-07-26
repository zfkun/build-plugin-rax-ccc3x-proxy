"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var utils_1 = require("./utils");
exports.default = (function (api, options) {
    var context = api.context, log = api.log, onGetWebpackConfig = api.onGetWebpackConfig, onHook = api.onHook, setValue = api.setValue;
    var rootDir = context.rootDir;
    var _a = options || {}, _b = _a.proxy, proxy = _b === void 0 ? true : _b, _c = _a.allowedHosts, allowedHosts = _c === void 0 ? "all" : _c, _d = _a.proxyTarget, proxyTarget = _d === void 0 ? config_1.DEFAULT_PROXY_TARGET : _d, _e = _a.proxyContext, proxyContext = _e === void 0 ? config_1.DEFAULT_PROXY_CONTEXT : _e;
    var config = (0, utils_1.parseConfigFile)(rootDir, log);
    if (config) {
        log.info("[plugin-ccc3x-proxy] 存在 自定义配置文件 尝试合并", config);
        if ("proxy" in config) {
            log.info("[plugin-ccc3x-proxy] 合并 自定义配置 (proxy):", proxy, config.proxy);
            proxy = config.proxy;
        }
        if ("allowedHosts" in config) {
            log.info("[plugin-ccc3x-proxy] 合并 自定义配置 (allowedHosts):", allowedHosts, config.allowedHosts);
            allowedHosts = config.allowedHosts;
        }
        if ("proxyTarget" in config) {
            log.info("[plugin-ccc3x-proxy] 合并 自定义配置 (proxyTarget):", proxyTarget, config.proxyTarget);
            proxyTarget = config.proxyTarget;
        }
        if ("proxyContext" in config) {
            log.info("[plugin-ccc3x-proxy] 合并 自定义配置 (proxyContext):", proxyContext, config.proxyContext);
            proxyContext = config.proxyContext;
        }
    }
    if (proxy === false)
        return;
    if (!proxyTarget) {
        log.error("[plugin-ccc3x-proxy] 代理目标地址 (proxyTarget) 不能为空");
        return;
    }
    setValue("ccc3xProxyTarget", proxyTarget);
    onGetWebpackConfig("web", function (config) {
        if (config.plugins.has("DefinePlugin")) {
            config.plugin("DefinePlugin").tap(function (args) { return [
                Object.assign.apply(Object, __spreadArray(__spreadArray([{}], args, false), [{
                        "process.env.REMOTE_GAME_SERVER": JSON.stringify(proxyTarget),
                    }], false)),
            ]; });
            log.info("[plugin-ccc3x-proxy] 声明环境变量 process.env.REMOTE_GAME_SERVER => ", JSON.stringify(proxyTarget));
        }
    });
    onHook("before.start.devServer", function (e) {
        if (allowedHosts) {
            e.devServer.options.allowedHosts = allowedHosts;
            log.info("[plugin-ccc3x-proxy] 改写域名白名单: ", allowedHosts);
        }
        if (proxyContext && proxyContext.length > 0) {
            var rule = {
                context: proxyContext,
                target: "".concat(proxyTarget, "/"),
                secure: false,
                changeOrigin: true,
            };
            log.info("[plugin-ccc3x-proxy] 注册 CocosCreator 3.x 浏览器预览模式代理策略: ", rule);
            e.devServer.options.proxy = [rule];
        }
    });
});
