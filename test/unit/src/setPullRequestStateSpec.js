const setPullRequestState = require('../../../src/setPullRequestState');

const createContext = (repoStub, createStatusStub) => ({
  payload: { pull_request: { head: { sha: 'foo-sha' } }, },
  repo: repoStub,
  github: { repos: { createStatus: createStatusStub } }
});

describe('setPullRequestState', () => {
  it('creates status based on what return from repo function', () => {
    const repoStub = jest.fn().mockReturnValue('foo-bar');
    const createStatusStub = jest.fn();
    const context = createContext(repoStub, createStatusStub);
    const success = false;
    setPullRequestState(context, success);

    expect(createStatusStub).toHaveBeenCalledTimes(1);
    expect(createStatusStub).toHaveBeenCalledWith('foo-bar');
  });

  it('creates repo with correct params', () => {
    const repoStub = jest.fn();
    const createStatusStub = jest.fn();
    const expectedRepoParams = {
      context: 'Blogpost Checker',
      description: 'publish date should be updated',
      sha: 'foo-sha',
      state: 'pending',
      target_url: 'https://github.com/apps/blogpost-checker'
    };
    const context = createContext(repoStub, createStatusStub);
    const success = false;
    setPullRequestState(context, success);

    expect(repoStub).toHaveBeenCalledTimes(1);
    expect(repoStub).toHaveBeenCalledWith(expectedRepoParams);
  });

  it('should set successful state if success true', () => {
    const repoStub = jest.fn();
    const context = createContext(repoStub, jest.fn());
    const success = true;
    setPullRequestState(context, success);

    expect(repoStub).toHaveBeenCalledTimes(1);
    const { state, description } = repoStub.mock.calls[0][0];
    expect(state).toBe('success');
    expect(description).toBe('ready to be merged');
  });

  it('should set failed state if success false', () => {
    const repoStub = jest.fn();
    const context = createContext(repoStub, jest.fn());
    const success = false;
    setPullRequestState(context, success);

    expect(repoStub).toHaveBeenCalledTimes(1);
    const { state, description } = repoStub.mock.calls[0][0];
    expect(state).toBe('pending');
    expect(description).toBe('publish date should be updated');
  });
});
