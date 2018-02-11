module.exports = (context, success) => context.github.repos.createStatus(context.repo({
  sha: context.payload.pull_request.head.sha,
  state: success ? 'success' : 'failure',
  target_url: 'https://github.com/apps/blogpost-checker',
  description: success ? 'ready to be merged' : 'publish date should be updated',
  context: 'Blogpost Checker',
}));
