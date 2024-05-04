import simpleGit from 'simple-git';

const git = simpleGit();

git.pull('--dry-run', (err, update) => {
  if (err) {
    console.error('Error pulling changes:', err);
    return;
  }

  if (update && update.summary.changes) {
    console.log('Pulled changes successfully:', update.summary.changes + ' files changed.');
    console.log(update);
  } else {
    console.log('No new changes to pull.');
  }
})