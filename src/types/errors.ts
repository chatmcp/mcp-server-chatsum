export class BinanceClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BinanceClientError';
  }
}

export class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiKeyError';
  }
}

export class OrderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderValidationError';
  }
}

export class InsufficientMarginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InsufficientMarginError';
  }
}

export class InvalidPositionModeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPositionModeError';
  }
}
