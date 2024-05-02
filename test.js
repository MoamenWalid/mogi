import simpleGit from 'simple-git';

const git = new simpleGit();

// Execute the 'git status' command and get the raw output
git.raw('checkout -b "wow"')
  .then(result => {
    console.log('Raw output of git status:', result);
  })
  .catch(err => {
    console.error('Error executing git status:', err);
  });
  //