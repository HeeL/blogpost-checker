const fs = require('fs');
const MockDate = require('mockdate');
const isPublishDateValid = require('../../../src/isPublishDateValid');

describe('isPublishDateValid', () => {
  afterEach(() => {
    MockDate.reset();
  });

  it('returns true for empty string', () => {
    expect(isPublishDateValid('')).toBe(true);
  });

  it('returns false for diff with date older than 2 days', () => {
    MockDate.set('2018-01-15');
    const gitDiffNewFileWithOldDate = fs.readFileSync('./test/unit/resources/gitDiffNewFileWithOldDate.txt', 'utf8');

    expect(isPublishDateValid(gitDiffNewFileWithOldDate)).toBe(false);
  });
});
