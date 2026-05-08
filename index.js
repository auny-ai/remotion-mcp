#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { execSync } from "child_process";
import fs from "fs";

const REMOTION_DIR = process.env.REMOTION_DIR || "/Users/auny/remotion-studio";

const server = new McpServer({ name: "remotion", version: "1.0.0" });

server.tool("list_templates", {}, async () => {
  const rootFile = fs.readFileSync(`${REMOTION_DIR}/src/Root.tsx`, "utf-8");
  return { content: [{ type: "text", text: rootFile }] };
});

server.tool("render_video", {
  compositionId: z.string(),
  outputName: z.string().optional().default("output"),
  props: z.string().optional().default("{}")
}, async ({ compositionId, outputName, props }) => {
  const outPath = `${REMOTION_DIR}/out/${outputName}.mp4`;
  const cmd = `cd ${REMOTION_DIR} && npx remotion render ${compositionId} ${outPath} --props='${props}'`;
  try {
    execSync(cmd, { timeout: 120000 });
    return { content: [{ type: "text", text: `✅ Rendered: ${outPath}` }] };
  } catch (err) {
    return { content: [{ type: "text", text: `❌ Error: ${err.message}` }] };
  }
});

server.tool("new_slideshow", {
  topic: z.string(),
  slides: z.array(z.object({
    title: z.string(),
    body: z.string()
  }))
}, async ({ topic, slides }) => {
  const slideContent = slides.map((s, i) => `Slide ${i + 1}: ${s.title} — ${s.body}`).join("\n");
  return { content: [{ type: "text", text: `Topic: ${topic}\n\n${slideContent}\n\nRun render_video with compositionId to render.` }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
