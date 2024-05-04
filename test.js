import simpleGit from 'simple-git';

const git = simpleGit();

git.fetch('--dry-run', (err, fetchResult) => {
  if (err) {
    console.error('Error fetching remote changes:', err);
    return;
  }

  if (fetchResult && fetchResult.remote && fetchResult.remote.default && fetchResult.remote.default !== 'up to date') {
    console.log('There are new changes to pull from the remote repository.');
  } else {
    console.log('No new changes to pull from the remote repository.');
  }
});
