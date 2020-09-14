export interface IPosition {
  id?: number;
  productId?: string;
  currency?: string;
  quantity?: number;
  averagePrice?: number;
}

export const defaultValue: Readonly<IPosition> = {};
