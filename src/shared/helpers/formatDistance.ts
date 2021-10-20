import { DISTANCE_UNIT } from '../constants';

export const formatDistance = (value: number) =>
  `${(Number.isFinite(+value) ? +value : 0).toFixed(3)}${DISTANCE_UNIT}`;
