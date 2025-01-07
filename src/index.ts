#!/usr/bin/env node

import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { SpotOrder } from "./types/binance.js";
import {
  storeApiKeys,
  getApiKeys,
  deleteApiKeys,
} from "./services/keystore.js";
import {
  createSpotOrder,
  cancelOrder,
  getAccountBalances,
  getOpenOrders,
} from "./services/binance.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { initializeBinanceClient } from "./services/binance.js";
import {
  configureApiKeysTool,
  createOrderTool,
  cancelOrderTool,
  getBalancesTool,
  getOpenOrdersTool,
} from "./services/tools.js";

const server = new Server(
  {
    name: "mcp-server-binance",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      configureApiKeysTool,
      createOrderTool,
      cancelOrderTool,
      getBalancesTool,
      getOpenOrdersTool,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  console.error("call tool request:", request);
  switch (request.params.name) {
    case "configure_api_keys": {
      const args = request.params.arguments as { apiKey: string; apiSecret: string };
      await storeApiKeys(args.apiKey, args.apiSecret);
      const initialized = await initializeBinanceClient();
      return {
        content: [
          {
            type: "text",
            text: initialized ? "API keys configured successfully" : "Failed to initialize Binance client",
          },
        ],
      };
    }

    case "create_spot_order": {
      const order = request.params.arguments as unknown as SpotOrder;
      const response = await createSpotOrder(order);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(response),
          },
        ],
      };
    }

    case "cancel_order": {
      const args = request.params.arguments as { symbol: string; orderId: number };
      await cancelOrder(args.symbol, args.orderId);
      return {
        content: [
          {
            type: "text",
            text: "Order cancelled successfully",
          },
        ],
      };
    }

    case "get_balances": {
      const balances = await getAccountBalances();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(balances),
          },
        ],
      };
    }

    case "get_open_orders": {
      const args = request.params.arguments as { symbol?: string };
      const orders = await getOpenOrders(args.symbol);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(orders),
          },
        ],
      };
    }

    default:
      throw new Error("Unknown tool");
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

dotenv.config();

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
