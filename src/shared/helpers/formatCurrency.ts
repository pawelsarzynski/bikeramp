import { CURRENCY } from '../constants';

export const formatCurrency = (value: number): string =>
  `${(Number.isFinite(+value) ? +value : 0).toFixed(2)}${CURRENCY}`;
