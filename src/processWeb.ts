import { DEFAULT_PROXY_CONTEXT, DEFAULT_PROXY_TARGET } from "./config";

export default (api, options) => {
  const { log, onGetWebpackConfig, onHook, setValue } = api;

  const {
    proxy = true,
    allowedHosts = "all",
    proxyTarget = DEFAULT_PROXY_TARGET,
    proxyContext = DEFAULT_PROXY_CONTEXT,
  } = options || {};
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
