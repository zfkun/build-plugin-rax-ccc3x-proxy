## @hoowu/build-plugin-rax-ccc3x-proxy

Rax 项目 Web 应用 的 CocosCreator 3.x 游戏开发 集成代理插件

插件默认会开启以下能力:

- **Web 应用** 自动注入代理目标地址环境变量 `process.env.REMOTE_GAME_SERVER`

> **默认值:** `http://localhost:7456`
>
> **注意：** 插件只会在开发调试时生效，不用担心对生产环境造成影响。

### 安装

```bash
$ npm install @hoowu/build-plugin-rax-ccc3x-proxy
```

### 配置

在 build.json 中进行以下配置：

```diff
{
  "plugins": [
+   "@hoowu/build-plugin-rax-ccc3x-proxy"
  ]
}
```

#### 禁用代理

```json
{
  "plugins": [
    [
      "@hoowu/build-plugin-rax-ccc3x-proxy",
      {
        "proxy": false
      }
    ]
  ]
}
```

#### 修改代理地址

```json
{
  "plugins": [
    [
      "@hoowu/build-plugin-rax-ccc3x-proxy",
      {
        "proxyTarget": "http://192.168.1.17:7456"
      }
    ]
  ]
}
```

#### 修改代理规则

```json
{
  "plugins": [
    [
      "@hoowu/build-plugin-rax-ccc3x-proxy",
      {
        "proxyContext": ["/aaa", "/bbb"]
      }
    ]
  ]
}
```

#### 修改代理白名单

```json
{
  "plugins": [
    [
      "@hoowu/build-plugin-rax-ccc3x-proxy",
      {
        "allowedHosts": ["a.com", "sub.a.com", "b.com"]
      }
    ]
  ]
}
```

### 自定义配置

项目根目录下 .cc3x.json 文件, 定义的配置会强制覆盖 build.json 中的配置, 即优先级更高

比如:

```json
{
  "proxy": true,
  "proxyTarget": "http://192.168.1.17:7456",
  "proxyContext": ["/aaa", "/bbb"],
  "allowedHosts": ["a.com", "sub.a.com", "b.com"]
}
```
