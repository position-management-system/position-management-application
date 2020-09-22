import { Moment } from 'moment';

export interface ITrade {
  id?: number;
  uniqueTag?: string;
  tradeDate?: string;
  side?: string;
  quantity?: number;
  productId?: string;
  price?: number;
  currency?: string;
  executionTime?: string;
  primaryAccount?: string;
  versusAccount?: string;
  trader?: string;
}

export const defaultValue: Readonly<ITrade> = {};
