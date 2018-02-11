const fs = require('fs');
const isPublishDateValid = require('../../../src/isPublishDateValid');

describe('isPublishDateValid', () => {
  it('returns true for empty string', () => {
    expect(isPublishDateValid('')).toBe(true);
  });

  it('returns false for diff with date older than 2 days', () => {
    const gitDiffNewFileWithOldDate = fs.readFileSync('./test/unit/resources/gitDiffNewFileWithOldDate.txt', 'utf8');

    expect(isPublishDateValid(gitDiffNewFileWithOldDate)).toBe(false);
  });
});
