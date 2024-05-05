import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import child_process from 'node:child_process';
import { promisify  } from 'util';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';

// إنشاء كائن simple-git
const git = simpleGit();

// جلب التحديثات من المسار البعيد
git.fetch((err) => {
  if (err) {
    console.error('wrong', err);
    return;
  }

  git.diff(['HEAD', 'origin/main'], (err, changes) => {
    if (changes) {
      console.log('pull');
    } else {
      console.log('Not pull');
    }
  })
});
