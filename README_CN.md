# mcp-server-cex-bn

这个 MCP 服务器提供了强大的币安现货交易接口。

## 功能特性

### 交易操作
- 安全配置和存储币安 API 凭证
- 执行现货交易操作（限价/市价订单）
- 监控账户余额
- 跟踪和管理未完成订单
- 取消现有订单

### 工具

#### `configure_api_keys`
安全存储币安 API 凭证：
```typescript
await configureBinanceApiKeys({
  apiKey: '你的API密钥',
  apiSecret: '你的API密钥'
});
```

#### `create_spot_order`
创建限价或市价订单：
```typescript
// 限价订单
await createSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'LIMIT',
  quantity: '0.001',
  price: '40000'
});

// 市价订单
await createSpotOrder({
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'MARKET',
  quantity: '0.001'
});
```

#### `cancel_order`
取消现有订单：
```typescript
await cancelOrder({
  symbol: 'BTCUSDT',
  orderId: '12345678'
});
```

#### `get_balances`
查询账户余额：
```typescript
const balances = await getBalances();
// 返回: { BTC: '0.1', USDT: '1000', ... }
```

#### `get_open_orders`
列出所有未完成订单：
```typescript
const orders = await getOpenOrders({
  symbol: 'BTCUSDT' // 可选：指定交易对
});
```

## 安全注意事项

- 永远不要将 API 密钥提交到版本控制系统
- 使用环境变量或安全的密钥存储
- 限制 API 密钥权限仅用于所需操作
- 定期轮换您的 API 密钥

## 速率限制

- 遵守币安 API 速率限制
- 默认速率限制：
  - 订单操作每分钟 1200 个请求
  - 市场数据每秒 100 个请求
- 实现适当的速率限制错误处理

## 错误处理

常见错误场景：
- 无效的 API 凭证
- 余额不足
- 无效的订单参数
- 超出速率限制
- 网络连接问题

错误处理示例：
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
    console.error('余额不足');
  } else if (error.code === -1021) {
    console.error('超出速率限制');
  }
}
```

## 项目结构

```
.
├── src/
│   ├── index.ts                 # 服务器入口
│   ├── services/
│   │   ├── binance.ts          # 币安 API 集成
│   │   ├── keystore.ts         # API 密钥管理
│   │   └── tools.ts            # 交易工具实现
│   └── types/
│       ├── binance.ts          # 币安类型定义
│       └── binance-connector.d.ts  # API 客户端类型
├── README.md
├── README_CN.md
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## 开发

1. 设置环境变量：

在根目录创建 `.env` 文件，并设置您的币安 API 凭证：

```txt
BINANCE_API_KEY=你的API密钥
BINANCE_API_SECRET=你的API密钥
```

2. 安装依赖：

```bash
pnpm install
```

构建服务器：

```bash
pnpm build
```

用于自动重新构建的开发模式：

```bash
pnpm watch
```

## 安装

1. 克隆仓库
2. 安装依赖：
```bash
pnpm install
```
3. 在 `.env` 中配置您的币安 API 凭证
4. 构建并启动服务器：
```bash
pnpm build
pnpm start
```
```

### 调试

由于 MCP 服务器通过标准输入输出进行通信，调试可能具有挑战性。我们建议使用 [MCP Inspector](https://github.com/modelcontextprotocol/inspector)，可以通过包脚本使用：

```bash
pnpm inspector
```

Inspector 将提供一个 URL，用于在浏览器中访问调试工具。


