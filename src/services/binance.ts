import { Spot } from '@binance/connector';
import { BinanceCredentials, SpotOrder, OrderResponse, AccountBalance } from '../types/binance.js';
import { BinanceClientError, OrderValidationError } from '../types/errors.js';
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
    throw new BinanceClientError('Binance client not initialized');
  }

  try {
    const params: any = {
      symbol: order.symbol,
      side: order.side,
      type: order.type,
    };

    if (order.quantity) params.quantity = order.quantity;
    if (order.price) params.price = order.price;
    if (order.timeInForce) params.timeInForce = order.timeInForce;

    if (order.type === 'LIMIT' && !order.price) {
      throw new OrderValidationError('Price is required for LIMIT orders');
    }

    const response = await client.newOrder(params);
    return response.data;
  } catch (error) {
    if (error instanceof OrderValidationError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new BinanceClientError(`Failed to create spot order: ${error.message}`);
    }
    throw new BinanceClientError('Failed to create spot order: Unknown error');
  }
}

export async function cancelOrder(symbol: string, orderId: number): Promise<void> {
  if (!client) {
    throw new BinanceClientError('Binance client not initialized');
  }

  try {
    await client.cancelOrder(symbol, { orderId });
  } catch (error) {
    if (error instanceof Error) {
      throw new BinanceClientError(`Failed to cancel order: ${error.message}`);
    }
    throw new BinanceClientError('Failed to cancel order: Unknown error');
  }
}

export async function getAccountBalances(): Promise<AccountBalance[]> {
  if (!client) {
    throw new BinanceClientError('Binance client not initialized');
  }

  try {
    const response = await client.account();
    return response.data.balances;
  } catch (error) {
    if (error instanceof Error) {
      throw new BinanceClientError(`Failed to get account balances: ${error.message}`);
    }
    throw new BinanceClientError('Failed to get account balances: Unknown error');
  }
}

export async function getOpenOrders(symbol?: string): Promise<OrderResponse[]> {
  if (!client) {
    throw new BinanceClientError('Binance client not initialized');
  }

  try {
    const params = symbol ? { symbol } : {};
    const response = await client.openOrders(params);
    return response.data.map(order => ({
      ...order,
      transactTime: Date.now()
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new BinanceClientError(`Failed to get open orders: ${error.message}`);
    }
    throw new BinanceClientError('Failed to get open orders: Unknown error');
  }
}
