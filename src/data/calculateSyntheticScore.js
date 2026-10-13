/**
 * @typedef {{ u: number, b: number, p: number, e: number, w: number }} IndicatorValues
 * @param {IndicatorValues} values
 * @param {IndicatorValues} weights
 */
export function calculateSyntheticScore(values, weights) {
  return values.u * weights.u
    + values.b * weights.b
    + values.p * weights.p
    + values.e * weights.e
    + values.w * weights.w;
}