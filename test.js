import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import child_process from 'node:child_process';
import { promisify  } from 'util';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';

// إنشاء كائن simple-git
const git = simpleGit();


git.status((err, status) => {
  console.log(status.conflicted.length);
})