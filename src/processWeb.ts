import { DEFAULT_PROXY_CONTEXT, DEFAULT_PROXY_TARGET } from "./config";
import { parseConfigFile } from "./utils";

export default (api, options) => {
  const { context, log, onGetWebpackConfig, onHook, setValue } = api;
  const { rootDir } = context;

  let {
    proxy = true,
    allowedHosts = "all",
    proxyTarget = DEFAULT_PROXY_TARGET,
    proxyContext = DEFAULT_PROXY_CONTEXT,
  } = options || {};

  const config = parseConfigFile(rootDir, log);
  if (config) {
    log.info("[plugin-ccc3x-proxy] 存在 自定义配置文件 尝试合并", config);

    if ("proxy" in config) {
      log.info(
        "[plugin-ccc3x-proxy] 合并 自定义配置 (proxy):",
        proxy,
        config.proxy
      );
      proxy = config.proxy;
    }

    if ("allowedHosts" in config) {
      log.info(
        "[plugin-ccc3x-proxy] 合并 自定义配置 (allowedHosts):",
        allowedHosts,
        config.allowedHosts
      );
      allowedHosts = config.allowedHosts;
    }

    if ("proxyTarget" in config) {
      log.info(
        "[plugin-ccc3x-proxy] 合并 自定义配置 (proxyTarget):",
        proxyTarget,
        config.proxyTarget
      );
      proxyTarget = config.proxyTarget;
    }

    if ("proxyContext" in config) {
      log.info(
        "[plugin-ccc3x-proxy] 合并 自定义配置 (proxyContext):",
        proxyContext,
        config.proxyContext
      );
      proxyContext = config.proxyContext;
    }
  }

  if (proxy === false) return;

  if (!proxyTarget) {
    log.error("[plugin-ccc3x-proxy] 代理目标地址 (proxyTarget) 不能为空");
    return;
  }

  setValue("ccc3xProxyTarget", proxyTarget);

  onGetWebpackConfig("web", (config) => {
    if (config.plugins.has("DefinePlugin")) {
      config.plugin("DefinePlugin").tap((args) => [
        Object.assign({}, ...args, {
          "process.env.REMOTE_GAME_SERVER": JSON.stringify(proxyTarget),
        }),
      ]);

      log.info(
        "[plugin-ccc3x-proxy] 声明环境变量 process.env.REMOTE_GAME_SERVER => ",
        JSON.stringify(proxyTarget)
      );
    }
  });

  onHook("before.start.devServer", (e) => {
    if (allowedHosts) {
      e.devServer.options.allowedHosts = allowedHosts;
      log.info("[plugin-ccc3x-proxy] 改写域名白名单: ", allowedHosts);
    }

    if (proxyContext && proxyContext.length > 0) {
      const rule = {
        context: proxyContext,
        target: `${proxyTarget}/`,
        secure: false,
        changeOrigin: true,
      };

      log.info(
        "[plugin-ccc3x-proxy] 注册 CocosCreator 3.x 浏览器预览模式代理策略: ",
        rule
      );

      e.devServer.options.proxy = [rule];
    }
  });
};
