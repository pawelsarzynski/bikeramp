import { formatDistance } from '.';

describe('formatDistance', () => {
  test.each`
    value        | expected
    ${12}        | ${'12.000km'}
    ${111.1111}  | ${'111.111km'}
    ${0.231}     | ${'0.231km'}
    ${1092.322}  | ${'1092.322km'}
    ${'12'}      | ${'12.000km'}
    ${'30.6321'} | ${'30.632km'}
    ${null}      | ${'0.000km'}
    ${undefined} | ${'0.000km'}
    ${NaN}       | ${'0.000km'}
    ${Infinity}  | ${'0.000km'}
  `(
    'should return $expected when $value is provided',
    ({ value, expected }) => {
      expect(formatDistance(value)).toBe(expected);
    },
  );
});
