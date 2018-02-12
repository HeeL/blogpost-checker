const R = require('ramda');

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const diffDatesInDays = (date1, date2) =>
  Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDayInMilliseconds)));

const isOlderThanTwoDays = dateString =>
  diffDatesInDays(new Date(), new Date(dateString)) > 2;

const containOutdatedPublishDate = (diffChunk) => {
  const regexpParsePostDate = /\n\s+\+date: (\d{4}-\d{2}-\d{2})/gi;
  const publishDateMatches = regexpParsePostDate.exec(diffChunk);
  if (publishDateMatches && isOlderThanTwoDays(publishDateMatches[1])) {
    return true;
  }
  return false;
};

module.exports = R.pipe(
  R.split('  diff --git'),
  R.filter(containOutdatedPublishDate),
  R.isEmpty,
);
