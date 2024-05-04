import simpleGit from 'simple-git';

const workingDirectory = process.cwd();
const git = simpleGit(workingDirectory);

git.pull((err, update) => {
  if (err) {
    console.error('Wrong', err);
    return;
  }

  if (update && update.summary.changes) {
    console.log('New Data');
    console.log('Changes: ', update.summary.changes);
  } else {
    console.log('Nothing Exist!');
  }
});