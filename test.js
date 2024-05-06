
import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import child_process from 'node:child_process';
import { promisify  } from 'util';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';

const git = simpleGit();

git.fetch(() => {
  git.diff(['HEAD', 'origin/main'], (err, data) => {
    console.log(data);
  })
});
