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

  it('returns true for diff with date older than 2 days if its NOT a new file', () => {
    MockDate.set('2018-01-15');
    const gitDiffEditFileWithOldDate = fs.readFileSync('./test/unit/resources/gitDiffEditFileWithOldDate.txt', 'utf8');

    expect(isPublishDateValid(gitDiffEditFileWithOldDate)).toBe(true);
  });

  it('returns true for new files diff if its not a blogpost', () => {
    MockDate.set('2018-01-15');
    const gitDiffNewFileWithOldDateButNotBlogpost = fs.readFileSync('./test/unit/resources/gitDiffNewFileWithOldDateButNotBlogpost.txt', 'utf8');

    expect(isPublishDateValid(gitDiffNewFileWithOldDateButNotBlogpost)).toBe(true);
  });
});
