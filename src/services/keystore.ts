import keytar from 'keytar';

const SERVICE_NAME = 'mcp-server-cex-bn';
const ACCOUNT_NAME = 'binance-api';

export async function storeApiKeys(apiKey: string, apiSecret: string): Promise<void> {
  await keytar.setPassword(SERVICE_NAME, `${ACCOUNT_NAME}-key`, apiKey);
  await keytar.setPassword(SERVICE_NAME, `${ACCOUNT_NAME}-secret`, apiSecret);
}

export async function getApiKeys(): Promise<{ apiKey: string; apiSecret: string } | null> {
  const apiKey = await keytar.getPassword(SERVICE_NAME, `${ACCOUNT_NAME}-key`);
  const apiSecret = await keytar.getPassword(SERVICE_NAME, `${ACCOUNT_NAME}-secret`);
  
  if (!apiKey || !apiSecret) {
    return null;
  }

  return { apiKey, apiSecret };
}

export async function deleteApiKeys(): Promise<void> {
  await keytar.deletePassword(SERVICE_NAME, `${ACCOUNT_NAME}-key`);
  await keytar.deletePassword(SERVICE_NAME, `${ACCOUNT_NAME}-secret`);
}
