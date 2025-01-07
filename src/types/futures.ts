export enum PositionSide {
  BOTH = 'BOTH',
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export enum MarginType {
  ISOLATED = 'ISOLATED',
  CROSSED = 'CROSSED'
}

export enum WorkingType {
  MARK_PRICE = 'MARK_PRICE',
  CONTRACT_PRICE = 'CONTRACT_PRICE'
}

export enum TimeInForce {
  GTC = 'GTC',  // Good Till Cancel
  IOC = 'IOC',  // Immediate or Cancel
  FOK = 'FOK',  // Fill or Kill
  GTX = 'GTX'   // Good Till Crossing
}

export interface FuturesOrder {
  symbol: string;
  side: 'BUY' | 'SELL';
  positionSide?: PositionSide;
  type: 'LIMIT' | 'MARKET' | 'STOP' | 'STOP_MARKET' | 'TAKE_PROFIT' | 'TAKE_PROFIT_MARKET' | 'TRAILING_STOP_MARKET';
  quantity: string;
  price?: string;
  stopPrice?: string;
  reduceOnly?: boolean;
  workingType?: WorkingType;
  timeInForce?: TimeInForce;
  activationPrice?: string;
  callbackRate?: string;
  closePosition?: boolean;
  priceProtect?: boolean;
}

export interface FuturesPosition {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  liquidationPrice: string;
  leverage: number;
  marginType: MarginType;
  isolatedMargin: string;
  positionSide: PositionSide;
  updateTime: number;
}

export interface FundingRate {
  symbol: string;
  fundingRate: string;
  fundingTime: number;
  nextFundingTime: number;
}

export interface LeverageSettings {
  symbol: string;
  leverage: number;
  maxNotionalValue?: string;
}

export interface FuturesAccountBalance {
  asset: string;
  walletBalance: string;
  unrealizedProfit: string;
  marginBalance: string;
  maintMargin: string;
  initialMargin: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  maxWithdrawAmount: string;
  crossWalletBalance: string;
  crossUnPnl: string;
  availableBalance: string;
}

export interface FuturesAccountInformation {
  feeTier: number;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  updateTime: number;
  totalInitialMargin: string;
  totalMaintMargin: string;
  totalWalletBalance: string;
  totalUnrealizedProfit: string;
  totalMarginBalance: string;
  totalPositionInitialMargin: string;
  totalOpenOrderInitialMargin: string;
  totalCrossWalletBalance: string;
  totalCrossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  assets: FuturesAccountBalance[];
  positions: FuturesPosition[];
}
