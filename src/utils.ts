import { resolve as pathResolve } from "node:path";
import {
  accessSync as fsAccessSync,
  constants,
  existsSync as fsExistsSync,
  readFileSync as fsReadFileSync,
} from "node:fs";

const readConfigSync = (file, log) => {
  let json;

  try {
    fsAccessSync(file, constants.R_OK);
    const body = fsReadFileSync(file, { encoding: "utf8" });
    json = JSON.parse(body);
  } catch (e) {
    log.error(`无法读取 ${file}: ${e.message}`);
  }

  return json;
};

interface IConfig {
  proxy?: boolean;
  allowedHosts?: string;
  proxyTarget?: string;
  proxyContext?: string[];
}

export const parseConfigFile = (rootDir, log): IConfig | undefined => {
  const configPath = pathResolve(rootDir, ".cc3x.json");
  if (fsExistsSync(configPath)) {
    log.info(
      "[plugin-ccc3x-proxy] 检测到 自定义配置 (.cc3x.json) 文件, 尝试自动读取解析"
    );

    const c = readConfigSync(configPath, log);
    if (c) {
      const config: IConfig = {};

      if (typeof c.proxy === "boolean") config.proxy = c.proxy;
      if (typeof c.allowedHosts === "string" && c.allowedHosts)
        config.allowedHosts = c.allowedHosts;
      if (typeof c.proxyTarget === "string" && c.proxyTarget)
        config.proxyTarget = c.proxyTarget;
      if (Array.isArray(c.proxyContext) && c.proxyContext.length > 0)
        config.proxyContext = c.proxyContext.map((v) => v.toString());

      log.info(
        "[plugin-ccc3x-proxy] 自定义配置 (.cc3x.json) 解析结果: ",
        config
      );
      return config;
    }
  }
};
