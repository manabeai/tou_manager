const getCurrentTerm = require('./Library/Library');

test('getCurrentTerm returns correct term', () => {
  expect(getCurrentTerm(2022, 5, 15)).toBe('2022_term1');
  expect(getCurrentTerm(2022, 6, 22)).toBe('2022_term2');
  expect(getCurrentTerm(2022, 10, 1)).toBe('2022_term3');
  expect(getCurrentTerm(2022, 12, 15)).toBe('2022_term4');
  expect(getCurrentTerm(2023, 1, 1)).toBe('2022_term4');
  expect(getCurrentTerm(2009, 3, 31)).toBe('2008_term4');
});