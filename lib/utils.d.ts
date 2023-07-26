interface IConfig {
    proxy?: boolean;
    allowedHosts?: string;
    proxyTarget?: string;
    proxyContext?: string[];
}
export declare const parseConfigFile: (rootDir: any, log: any) => IConfig | undefined;
export {};
