# remotion-mcp 🕷️
### An MCP server that connects Claude to Remotion 
### for programmatic video generation

---

## What This Is

A Model Context Protocol server that gives Claude
direct access to Remotion — a framework for creating
videos programmatically using JavaScript.

When connected, Claude can generate, render, and
manage video compositions directly from a session
without switching tools.

---

## What It Enables

- Generate video slideshows from Claude sessions
- Render compositions programmatically
- Build video content directly from your AI workflow

---

## Part Of The auny-ai Stack

This MCP is part of [claude-os](https://github.com/auny-ai/claude-os) —
a multi-AI operating system built in public.

Full integration guide:
[integrations/03_remotion-mcp-setup.md](https://github.com/auny-ai/claude-os/blob/main/integrations/03_remotion-mcp-setup.md)

---

## Setup

```bash
cd remotion-mcp
npm install
node index.js
```

Add to your Claude Desktop config:
```json
{
  "mcpServers": {
    "remotion": {
      "command": "node",
      "args": ["/path/to/remotion-mcp/index.js"]
    }
  }
}
```

---

*auny-ai/remotion-mcp — built in public.*
*Learning as I go. Sharing it all for you.* 🕷️
