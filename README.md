# mcp-server-cex-bn

This MCP Server provides a robust interface for Binance spot trading operations.

[中文说明](README_CN.md)

## Features

### Trading Operations
- Configure and store Binance API credentials securely
- Execute spot trading operations (LIMIT/MARKET orders)
- Monitor account balances
- Track and manage open orders
- Cancel existing orders

### Tools

#### `configure_api_keys`
Securely store your Binance API credentials:
```typescript
await configureBinanceApiKeys({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret'
});
```

#### `create_spot_order`
Create LIMIT or MARKET orders:
```typescript
// LIMIT order
await createSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '40000'
});

// MARKET order
await createSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'MARKET',
  quantity: '0.001'
});
```

#### `cancel_order`
Cancel an existing order:
```typescript
await cancelOrder({
  symbol: 'BTCUSDT',
  orderId: '12345678'
});
```

#### `get_balances`
Check your account balances:
```typescript
const balances = await getBalances();
// Returns: { BTC: '0.1', USDT: '1000', ... }
```

#### `get_open_orders`
List all open orders:
```typescript
const orders = await getOpenOrders({
  symbol: 'BTCUSDT' // Optional: specify symbol
});
```

## Security Considerations

- Never commit your API keys to version control
- Use environment variables or secure key storage
- Restrict API key permissions to only required operations
- Regularly rotate your API keys

## Rate Limits

- Respect Binance API rate limits
- Default rate limits:
  - 1200 requests per minute for order operations
  - 100 requests per second for market data
- Implement proper error handling for rate limit errors

## Error Handling

Common error scenarios:
- Invalid API credentials
- Insufficient balance
- Invalid order parameters
- Rate limit exceeded
- Network connectivity issues

Example error handling:
```typescript
try {
  await createSpotOrder({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: '0.001',
    price: '40000'
  });
} catch (error) {
  if (error.code === -2010) {
    console.error('Insufficient balance');
  } else if (error.code === -1021) {
    console.error('Rate limit exceeded');
  }
}
```

## Development

1. Set up environment variables:

create `.env` file in the root directory, and set your Binance API credentials:

```txt
BINANCE_API_KEY=your_api_key_here
BINANCE_API_SECRET=your_secret_key_here
```

2. Install dependencies:

```bash
pnpm install
```

Build the server:

```bash
pnpm build
```

For development with auto-rebuild:

```bash
pnpm watch
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```
3. Configure your Binance API credentials in `.env`
4. Build and start the server:
```bash
pnpm build
pnpm start
```
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
pnpm inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Community

- [MCP Server Telegram](https://t.me/+N0gv4O9SXio2YWU1)
- [MCP Server Discord](https://discord.gg/RsYPRrnyqg)

## About the author

- [idoubi](https://bento.me/idoubi)
