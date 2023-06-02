"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
module.exports = function (api, options) { return __awaiter(void 0, void 0, void 0, function () {
    var log, context, onGetWebpackConfig, onHook, setValue, command, targets, _a, _b, proxyTarget, _c, proxyContext;
    return __generator(this, function (_d) {
        log = api.log, context = api.context, onGetWebpackConfig = api.onGetWebpackConfig, onHook = api.onHook, setValue = api.setValue;
        command = context.command, targets = context.userConfig.targets;
        if (command !== "start")
            return [2 /*return*/];
        if (!targets.includes("web")) {
            log.info("[plugin-ccc3x-proxy] 工程构建目标未包含 web, 忽略退出");
            return [2 /*return*/];
        }
        _a = options || {}, _b = _a.proxyTarget, proxyTarget = _b === void 0 ? config_1.DEFAULT_PROXY_TARGET : _b, _c = _a.proxyContext, proxyContext = _c === void 0 ? config_1.DEFAULT_PROXY_CONTEXT : _c;
        if (!proxyTarget) {
            log.error("[plugin-ccc3x-proxy] 代理目标地址 (proxyTarget) 不能为空");
            return [2 /*return*/];
        }
        setValue("ccc3xProxyTarget", proxyTarget);
        onGetWebpackConfig(function (config) {
            if (config.plugins.has("DefinePlugin")) {
                config.plugin("DefinePlugin").tap(function (args) { return [
                    Object.assign.apply(Object, __spreadArray(__spreadArray([{}], args, false), [{
                            "process.env.REMOTE_GAME_SERVER": JSON.stringify(proxyTarget),
                        }], false)),
                ]; });
                log.info("[plugin-ccc3x-proxy] 声明环境变量 process.env.REMOTE_GAME_SERVER => ", JSON.stringify(proxyTarget));
            }
        });
        if (proxyContext && proxyContext.length > 0) {
            onHook("before.start.devServer", function (e) {
                var rule = {
                    context: proxyContext,
                    target: "".concat(proxyTarget, "/"),
                    changeOrigin: true,
                };
                log.info("[plugin-ccc3x-proxy] 注册 CocosCreator 3.x 浏览器预览模式代理策略: ", rule);
                e.devServer.options.proxy = [rule];
            });
        }
        return [2 /*return*/];
    });
}); };
