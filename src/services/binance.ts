import { Spot } from '@binance/connector';
import { BinanceCredentials, SpotOrder, OrderResponse, AccountBalance } from '../types/binance.js';
import { getApiKeys } from './keystore.js';

let client: Spot | null = null;

export async function initializeBinanceClient(): Promise<boolean> {
  const credentials = await getApiKeys();
  if (!credentials) {
    return false;
  }

  client = new Spot(credentials.apiKey, credentials.apiSecret);
  return true;
}

export async function createSpotOrder(order: SpotOrder): Promise<OrderResponse> {
  if (!client) {
    throw new Error('Binance client not initialized');
  }

  const params: any = {
    symbol: order.symbol,
    side: order.side,
    type: order.type,
  };

  if (order.quantity) params.quantity = order.quantity;
  if (order.price) params.price = order.price;
  if (order.timeInForce) params.timeInForce = order.timeInForce;

  const response = await client.newOrder(params);
  return response.data;
}

export async function cancelOrder(symbol: string, orderId: number): Promise<void> {
  if (!client) {
    throw new Error('Binance client not initialized');
  }

  await client.cancelOrder(symbol, { orderId });
}

export async function getAccountBalances(): Promise<AccountBalance[]> {
  if (!client) {
    throw new Error('Binance client not initialized');
  }

  const response = await client.account();
  return response.data.balances;
}

export async function getOpenOrders(symbol?: string): Promise<OrderResponse[]> {
  if (!client) {
    throw new Error('Binance client not initialized');
  }

  const params = symbol ? { symbol } : {};
  const response = await client.openOrders(params);
  return response.data.map(order => ({
    ...order,
    transactTime: Date.now()
  }));
}
