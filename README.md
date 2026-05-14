# WhalesBot AI 设备接入文档

面向硬件与固件团队的 **WhalesBot** 对接说明，使用 [Mintlify](https://mintlify.com) 构建。

## 本地预览

```bash
npm i -g mint
cd path/to/this/repo
mint dev
```

浏览器打开 `http://localhost:3000`。

推荐用 **`npm run dev`**：会先根据 **`site-config.json`** 注入当前环境的控制台链接，再启动 Mintlify。

## 控制台链接（多环境）

环境与 URL 写在 **`site-config.json`**：

| 环境名（`DOCS_ENV`） | 默认控制台 |
|---------------------|------------|
| `test` | `https://test-whalesbotai-console.whalesbot.com/` |
| `production` | `https://prod-whalesbotai-console.whalesbot.com/` |

正文 **[概览](/)**（章节「智控台环境地址」）与 **[设备绑定](/device-binding)**（「部署环境与访问地址」）中也列出了上表 URL，供开发拼接跳转链接时查阅。

- **本地预览（默认测试环境）**：`npm run dev` 或先执行 `npm run config:apply` 再 `mint dev`。未设置变量时使用 `defaultEnvironment`（当前为 **test**）。
- **切到生产控制台**：PowerShell 示例  
  `$env:DOCS_ENV="production"; npm run config:apply`  
  然后再 `mint dev`。
- **CI / 发布**：部署生产文档前在流水线中设置  
  `DOCS_ENV=production`（或 `SITE_PROFILE=production`），再执行  
  `npm run config:apply`，然后执行你们的 `mint deploy`（或等价命令）。

**说明**：`scripts/apply-site-config.mjs` 会重写 **`docs.json`** 里的 `navbar.primary.href`，请勿手工改该字段后与配置不一致；应改 **`site-config.json`** 或环境变量。

## 配置

全站导航与选项在 **`docs.json`**；勿再添加 `mint.json`。

**Logo / 站点图标**：侧栏与顶栏 Logo 使用与智控台相同的 **`favicon.ico`**（复制自 `manager-web/public/favicon.ico`）。样式微调见仓库根目录 **`custom.css`**（隐藏页脚社交与 Mintlify 署名、**顶部搜索框**；Mintlify 未提供关闭搜索的 `docs.json` 开关）。

## 目录

| 文件 | 说明 |
|------|------|
| `index.mdx` | 概览与端到端时序 |
| `device-binding.mdx` | 设备密钥、激活、OTA、环境与错误说明（manager-api） |
| `device-connection.mdx` | WebSocket 建连、鉴权、会话流程与 type 总览 |
| `websocket-protocol.mdx` | 文本帧 JSON 示例（hello / listen / stt / tts 等）与联调顺序 |

## 检查

```bash
mint broken-links
```

## 发布

在 [Mintlify Dashboard](https://dashboard.mintlify.com) 连接 GitHub 仓库以实现自动部署。
