const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const diffDatesInDays = (date1, date2) =>
  Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDayInMilliseconds)));

const isOlderThanTwoDays = dateString =>
  diffDatesInDays(new Date(), new Date(dateString)) > 2;

const containOutdatedPublishDate = (diffChunk) => {
  const regexpParsePostDate = /-{3} \/dev\/null\n\s+\+{3} b\/_posts\/(\d{4}-\d{2}-\d{2})[a-z0-9-_]+\.md/gi;
  const postDateMatches = regexpParsePostDate.exec(diffChunk);
  if (postDateMatches && isOlderThanTwoDays(postDateMatches[1])) {
    return true;
  }
  return false;
};

module.exports = (diffContent) => {
  const diffChunks = diffContent.split('  diff --git');

  return (diffChunks.filter(containOutdatedPublishDate)).length === 0;
};
