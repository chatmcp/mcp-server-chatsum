export const configureApiKeysTool = {
  name: "configure_api_keys",
  description: "Configure Binance API keys for trading",
  inputSchema: {
    type: "object",
    properties: {
      apiKey: { 
        type: "string", 
        description: "Binance API key" 
      },
      apiSecret: { 
        type: "string", 
        description: "Binance API secret" 
      }
    },
    required: ["apiKey", "apiSecret"],
  },
};

export const createOrderTool = {
  name: "create_spot_order",
  description: "Create a new spot order on Binance",
  inputSchema: {
    type: "object",
    properties: {
      symbol: { 
        type: "string", 
        description: "Trading pair symbol (e.g., BTCUSDT)" 
      },
      side: { 
        type: "string", 
        enum: ["BUY", "SELL"], 
        description: "Order side" 
      },
      type: { 
        type: "string", 
        enum: ["LIMIT", "MARKET"], 
        description: "Order type" 
      },
      quantity: { 
        type: "string", 
        description: "Order quantity" 
      },
      price: { 
        type: "string", 
        description: "Order price (required for LIMIT orders)" 
      },
      timeInForce: { 
        type: "string", 
        enum: ["GTC", "IOC", "FOK"], 
        description: "Time in force" 
      }
    },
    required: ["symbol", "side", "type", "quantity"],
  },
};

export const cancelOrderTool = {
  name: "cancel_order",
  description: "Cancel an existing order",
  inputSchema: {
    type: "object",
    properties: {
      symbol: { 
        type: "string", 
        description: "Trading pair symbol (e.g., BTCUSDT)" 
      },
      orderId: { 
        type: "number", 
        description: "Order ID to cancel" 
      }
    },
    required: ["symbol", "orderId"],
  },
};

export const getBalancesTool = {
  name: "get_balances",
  description: "Get account balances",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

export const getOpenOrdersTool = {
  name: "get_open_orders",
  description: "Get open orders",
  inputSchema: {
    type: "object",
    properties: {
      symbol: { 
        type: "string",
        description: "Trading pair symbol (optional)"
      }
    },
    required: [],
  },
};
