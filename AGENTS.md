> For Mintlify components and global settings, install: `npx skills add https://mintlify.com/docs`

# WhalesBot AI 设备接入 — 文档说明

## 项目

- 产品：**WhalesBot AI 设备接入**（OEM 硬件对接）
- 技术栈：[Mintlify](https://mintlify.com)，MDX + YAML frontmatter
- **仅使用 `docs.json` 配置**（勿使用已废弃的 `mint.json`）
- 本地预览：`npm run dev`（会先执行 `config:apply` 注入控制台 URL），或直接 `mint dev`
- **控制台链接**：由 **`site-config.json`** + 环境变量 **`DOCS_ENV`**（`test` | `production`）经 **`scripts/apply-site-config.mjs`** 写入 `docs.json` → `navbar.primary.href`。发布生产文档前在 CI 设置 `DOCS_ENV=production` 再 `npm run config:apply`
- 链接检查：`mint broken-links`

## 信息架构

- **概览**：`index`
- **设备接入**：`device-binding`（HTTP）、`device-connection`（建连与帧类型概述）、`websocket-protocol`（文本 JSON 示例与联调顺序）

全文为简体中文；协议字段名、JSON 示例中的 key 保持与实现对齐（英文 snake_case / 小写）。

## 写作约定

- 标题与正文用简洁的技术中文
- 适当使用 `<Tip>`、`<Warning>`、`<CardGroup>` 提升可读性

## 修改检查清单

- [ ] MDX 含 `title`、`description`
- [ ] 新页面已写入 `docs.json` → `navigation`
- [ ] 站内链接使用根路径且无扩展名，例如 `/device-binding`
