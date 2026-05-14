/**
 * 从 public/websocket-playground.html 生成 websocket-playground.mdx。
 * 使用 iframe srcDoc；将 </script> 拆成两段模板拼接，避免 MDX/HTML 解析器误吞。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const htmlPath = path.join(root, "public", "websocket-playground.html");
const outMdx = path.join(root, "websocket-playground.mdx");

const html = fs.readFileSync(htmlPath, "utf8");
const token = "</script>";
const idx = html.indexOf(token);
if (idx === -1) {
  console.error("Expected", token, "in", htmlPath);
  process.exit(1);
}
const part1 = html.slice(0, idx) + "</scr";
const part2 = "ipt>" + html.slice(idx + token.length);

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const e1 = esc(part1);
const e2 = esc(part2);

const mdx = `---
title: WebSocket 联调台
description: 浏览器内连接 WSS、发送 JSON 文本帧并查看上下行日志（不含二进制 Opus）。
icon: "plug"
---

本页提供与 **HTTP API Playground** 类似的交互面板，用于对照 [WebSocket 消息协议](/websocket-protocol) 调试 **文本帧**。

<Warning>
  连接 URL 常含有 **Token** 与设备标识，请勿在不可信环境展示或录屏。语音链路的 **Opus 二进制帧** 无法在下列 iframe 内发送或播放，请使用设备固件或本地脚本配合抓包。
</Warning>

<iframe
  title="WebSocket 联调台"
  srcDoc={\`${e1}\` + \`${e2}\`}
  style={{
    width: "100%",
    minHeight: 880,
    border: "none",
    borderRadius: "12px",
    background: "transparent",
  }}
/>

### 使用说明

1. 按 [设备连接](/device-connection) 拼好 **完整 \`wss://\` URL**（Query 或 Header 与服务端约定一致；本工具使用浏览器原生 WebSocket，仅 URL 方式携带 Query）。
2. 点击 **连接**，确认状态为已连接后，用 **填入 hello** 再 **发送文本帧**，等待下行 \`hello\` 与 \`session_id\`。
3. 需要语音闭环时，在设备侧发送 **二进制 Opus**；此处可继续发送 \`listen\` / \`abort\` / \`ping\` 等控制面 JSON。

本页内容由 \`npm run build:ws\` 从 \`public/websocket-playground.html\` 生成；修改联调 UI 请编辑 HTML 后重新执行该命令。
`;

fs.writeFileSync(outMdx, mdx, "utf8");
console.log("Wrote", path.relative(root, outMdx));
