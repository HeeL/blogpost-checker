const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const diffDatesInDays = (date) => {
  const currentDate = new Date();

  return Math.round(Math.abs((currentDate.getTime() - date.getTime()) / (oneDayInMilliseconds)));
};

const isOlderThanTwoDays = dateString => diffDatesInDays(new Date(dateString)) > 2;

module.exports = (diffContent) => {
  const regexpParsePostDate = /-{3} \/dev\/null\n\s+\+{3} b\/_posts\/(\d{4}-\d{2}-\d{2})[a-z0-9-_]+\.md/gi;
  const postDateMatches = regexpParsePostDate.exec(diffContent);
  if (postDateMatches && isOlderThanTwoDays(postDateMatches[1])) {
    return false;
  }
  return true;
};
