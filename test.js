
import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import child_process from 'node:child_process';
import { promisify  } from 'util';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';


const localPath = process.cwd();

const git = simpleGit(localPath);

git.fetch((err, fetchResult) => {
  if (err) {
    console.error('Error fetching remote changes:', err);
    return;
  }

  git.diff(['FETCH_HEAD', 'HEAD'], (err, diff) => {
    if (err) {
      console.error('Error comparing changes:', err);
      return;
    }

    if (diff) {
      console.log('There are changes to be downloaded from remote.');
    } else {
      console.log('No changes to be downloaded from remote.');
    }
  });
});
