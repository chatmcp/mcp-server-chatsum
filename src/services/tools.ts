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

export const createFuturesOrderTool = {
  name: "create_futures_order",
  description: "Create a new futures order on Binance",
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
      positionSide: {
        type: "string",
        enum: ["BOTH", "LONG", "SHORT"],
        description: "Position side"
      },
      type: { 
        type: "string", 
        enum: ["LIMIT", "MARKET", "STOP", "STOP_MARKET", "TAKE_PROFIT", "TAKE_PROFIT_MARKET", "TRAILING_STOP_MARKET"], 
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
      stopPrice: {
        type: "string",
        description: "Stop price (required for STOP/TAKE_PROFIT orders)"
      },
      timeInForce: { 
        type: "string", 
        enum: ["GTC", "IOC", "FOK", "GTX"], 
        description: "Time in force" 
      },
      reduceOnly: {
        type: "boolean",
        description: "Reduce only flag"
      },
      closePosition: {
        type: "boolean",
        description: "Close position flag"
      }
    },
    required: ["symbol", "side", "type", "quantity"],
  },
};

export const cancelFuturesOrderTool = {
  name: "cancel_futures_order",
  description: "Cancel an existing futures order",
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

export const getFuturesPositionsTool = {
  name: "get_futures_positions",
  description: "Get all futures positions",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

export const setFuturesLeverageTool = {
  name: "set_futures_leverage",
  description: "Set leverage for a futures symbol",
  inputSchema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description: "Trading pair symbol (e.g., BTCUSDT)"
      },
      leverage: {
        type: "number",
        description: "Leverage value (1-125)"
      }
    },
    required: ["symbol", "leverage"],
  },
};

export const getFuturesAccountTool = {
  name: "get_futures_account",
  description: "Get futures account information",
  inputSchema: {
    type: "object",
    properties: {},
    required: [],
  },
};

export const getFuturesOpenOrdersTool = {
  name: "get_futures_open_orders",
  description: "Get open futures orders",
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

export const getFundingRateTool = {
  name: "get_funding_rate",
  description: "Get funding rate for a futures symbol",
  inputSchema: {
    type: "object",
    properties: {
      symbol: {
        type: "string",
        description: "Trading pair symbol (e.g., BTCUSDT)"
      }
    },
    required: ["symbol"],
  },
};
