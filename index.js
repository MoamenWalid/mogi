#!/usr/bin/env node
import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import { exec } from 'node:child_process';
import { program } from 'commander';
import { gitCommand } from './commands.js';
import { getFilesToCommit } from './fileChanges.js';

const git = simpleGit();

const randBranch = (obj) => obj.branch = random(8, 'lowernumeric');

program
  .name('mogi')
  .description('GitHub Desktop simplifies Git and GitHub tasks by offering an intuitive interface, making it easy to upload all data without the need for manual upload commands.')
  .version('1.1.0'); 

program.command('up')
  .description('This base command to mogi start')
  .option('-b, --branch <branch>', 'name of branch')
  .option('-m, --message <message>', 'message when commit')
  .option('-d, --delete', 'delete branch will make')
  .action(async (obj) => {
    if (!obj.branch) randBranch(obj);
    if (!obj.message) await getFilesToCommit(obj);

    try {
      const branches = await git.branch();
      const mainBranch = branches.all.find(branch => branch === 'main' || branch === 'master');
      const diff = await git.diffSummary();
      const commands = gitCommand(mainBranch, obj);

      if (diff.files.length) {
        console.log(obj);
        console.log('file changes found!');
        for (const command of commands.inFilesChange) {
          exec(command, (err, stdout) => {
            if (stdout) console.log('Success to commit changes ✅', stdout);
          });
        }
      }

      await new Promise((resolve, reject) => {
        git.fetch(async (err) => {
          if (err) reject(err);

          const data = await git.diff(['HEAD', 'origin/main']);
          if (data) {
            console.log('Changes detected. Pull is possible.');
            for (const command of commands.inNeedPull) {
              exec(command, (err, stdout) => {
                if (stdout) console.log('Success to pull changes ✅', stdout);
              });
            }
          } else {
            console.log('No changes to pull.');
          }
          resolve();
        });
      });

      const status = await git.status();
      if (!status.conflicted.length) {
        console.log(`Not exist conflict ✅`);
        // for (const command of commands.inAll) {
        //   exec(command, (err, stdout) => {
        //     if (stdout) console.log('Succes to merge data ✅', stdout);
        //   });
        // }
        exec(`git checkout ${mainBranch}`, (err, stdout) => {
          if (stdout) console.log('Succes to checkout main ✅', stdout);
        });
        exec(`git merge "${obj.branch}"`, (err, stdout) => {
          if (stdout) console.log('Succes to merge data ✅', stdout);
        });
        exec(`git push -f origin ${mainBranch}`, (err, stdout) => {
          if (stdout) console.log('Succes to push ✅', stdout);
        });
      }

    } catch (error) {
      console.error('Error Happen!', error); 
    }
  });

program.parse();
