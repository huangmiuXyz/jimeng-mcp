#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";
// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
});

// 处理未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
});

async function main() {
  try {
    // required: VOLCENGINE_ACCESS_KEY
    // required: VOLCENGINE_SECRET_KEY
    if (!process.env.VOLCENGINE_ACCESS_KEY) {
      throw new Error('VOLCENGINE_ACCESS_KEY is required!')
    }
    if (!process.env.VOLCENGINE_SECRET_KEY) {
      throw new Error('VOLCENGINE_SECRET_KEY is required!')
    }
    // Create the server
    const server = createServer();

    // Create stdio transport
    const transport = new StdioServerTransport();

    // Connect the server to the transport
    await server.connect(transport);

    console.error("JiMeng MCP Server running on stdio");

  } catch (error) {
    console.error('启动服务器时出错:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});