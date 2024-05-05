import simpleGit from 'simple-git';

const git = simpleGit();

git.fetch('--dry-run', (err, fetchResult) => {
  console.log(err);
  console.log(fetchResult);
});
//asd
//asf