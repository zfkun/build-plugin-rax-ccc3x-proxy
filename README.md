## @hoowu/build-plugin-rax-ccc3x-proxy

Rax 项目 Web 应用 的 CocosCreator 3.x 游戏开发 集成代理插件

插件默认会开启以下能力:

- Web 应用注入 代理目标地址 `http://localhost:7456`

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
