import { slugify } from './slugify.helper';

describe('slugify', () => {
  it.each([
    {
      text: 'This is a test',
      expected: 'this-is-a-test',
    },
    {
      text: 'coração-é-uma-pedra',
      expected: 'coracao-e-uma-pedra',
    },
    {
      text: 'último teste',
      expected: 'ultimo-teste',
    },
    {
      text: '  test with spaces  ',
      expected: 'test-with-spaces',
    },
    {
      text: 'test with    multiple spaces',
      expected: 'test-with-multiple-spaces',
    },
    {
      text: 'áéíóú',
      expected: 'aeiou',
    },
    {
      text: 'ç',
      expected: 'c',
    },
    {
      text: 'àçàòèùì',
      expected: 'acaoeui',
    },
  ])('should return a slugified string', ({ text, expected }) => {
    const result = slugify(text);

    expect(result).toBe(expected);
  });
});
