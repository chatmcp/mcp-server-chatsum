# mcp-server-cex-bn

This MCP Server provides a robust interface for Binance trading operations, supporting both spot and USDⓈ-M futures trading.

[中文说明](README_CN.md)

## Features

### Trading Operations
- Configure and store Binance API credentials securely
- Execute spot trading operations (LIMIT/MARKET orders)
- Execute futures trading operations with advanced order types (STOP, TAKE_PROFIT, etc.)
- Manage futures positions and leverage
- Monitor account balances for both spot and futures
- Track and manage open orders across markets
- Access real-time funding rates
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

#### `create_futures_order`
Create futures orders with advanced types:
```typescript
// LIMIT order with leverage
await createFuturesOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '40000',
  positionSide: 'LONG'
});

// STOP_MARKET order
await createFuturesOrder({
  symbol: 'BTCUSDT',
  side: 'SELL',
  type: 'STOP_MARKET',
  quantity: '0.001',
  stopPrice: '38000',
  positionSide: 'LONG'
});
```

#### `set_futures_leverage`
Set leverage for a futures symbol:
```typescript
await setFuturesLeverage({
  symbol: 'BTCUSDT',
  leverage: 10 // 1-125x
});
```

#### `get_futures_positions`
Get all futures positions:
```typescript
const positions = await getFuturesPositions();
// Returns array of positions with unrealized PnL, entry price, etc.
```

#### `get_futures_account`
Get futures account information:
```typescript
const account = await getFuturesAccount();
// Returns account details including margin, positions, balances
```

#### `get_funding_rate`
Get funding rate for a futures symbol:
```typescript
const fundingRate = await getFundingRate('BTCUSDT');
// Returns current funding rate and next funding time
```

## Security Considerations

- Never commit your API keys to version control
- Use environment variables or secure key storage
- Restrict API key permissions to only required operations
- Regularly rotate your API keys

## Rate Limits

- Respect Binance API rate limits
- Default rate limits for spot trading:
  - 1200 requests per minute for order operations
  - 100 requests per second for market data
- Default rate limits for futures trading:
  - 2400 requests per minute for order operations
  - 200 requests per second for market data
- Implement proper error handling for rate limit errors
- Use exponential backoff for rate limit handling

## Error Handling

Common error scenarios:
- Invalid API credentials (ApiKeyError)
- Insufficient balance or margin (InsufficientMarginError)
- Invalid order parameters (OrderValidationError)
- Invalid position mode (InvalidPositionModeError)
- Rate limit exceeded
- Network connectivity issues (BinanceClientError)

Example error handling:
```typescript
// Spot trading error handling
try {
  await createSpotOrder({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'LIMIT',
    quantity: '0.001',
    price: '40000'
  });
} catch (error) {
  if (error instanceof InsufficientMarginError) {
    console.error('Insufficient balance:', error.message);
  } else if (error instanceof OrderValidationError) {
    console.error('Invalid order parameters:', error.message);
  } else if (error instanceof BinanceClientError) {
    console.error('API error:', error.message);
  }
}

// Futures trading error handling
try {
  await createFuturesOrder({
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'STOP_MARKET',
    quantity: '0.001',
    stopPrice: '40000',
    positionSide: 'LONG'
  });
} catch (error) {
  if (error instanceof InsufficientMarginError) {
    console.error('Insufficient margin:', error.message);
  } else if (error instanceof InvalidPositionModeError) {
    console.error('Invalid position mode:', error.message);
  } else if (error instanceof OrderValidationError) {
    console.error('Invalid order parameters:', error.message);
  }
}
```

## Project Structure

```
.
├── src/
│   ├── index.ts                 # Server entry point
│   ├── services/
│   │   ├── binance.ts          # Spot trading operations
│   │   ├── binanceFutures.ts   # Futures trading operations
│   │   ├── keystore.ts         # API key management
│   │   └── tools.ts            # Trading tools implementation
│   └── types/
│       ├── binance.ts          # Spot trading types
│       ├── futures.ts          # Futures trading types
│       ├── errors.ts           # Custom error definitions
│       └── binance-connector.d.ts  # API client types
├── README.md
├── README_CN.md
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
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
