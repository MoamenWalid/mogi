#!/usr/bin/env node
import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import { exec } from 'node:child_process';
import { program } from 'commander';
import { gitCommand } from './commands.js';
import { getFilesToCommit } from './fileChanges.js';
import { promisify } from 'node:util';

const git = simpleGit();
const ex = promisify(exec);

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

            await ex(`git pull --no-ff origin ${mainBranch}`);
            console.log('Success to pull data ✅');

            await ex(`rm -fr ".git/rebase-merge"`);
            console.log('Success to Delete ".git/rebase-merge" file ✅');

            await ex(`git add .`);
            console.log('Success to add data to stage ✅');

            await ex(`git commit -m 'success'`);
            console.log('Success to commit changes ✅');



          } else {
            console.log('No changes to pull.');
          }
          resolve();
        });
      });

      async function pulling() {

      }

      async function mergePush(obj, mainBranch) {
        try {
          const status = await git.status();
          if (!status.conflicted.length) {
            console.log(`Not exist conflict ✅`);

            await ex(`git checkout ${mainBranch}`);
            console.log('Success to checkout main ✅');

            await ex(`git merge "${obj.branch}"`);
            console.log('Success to merge Data ✅');

            await ex(`git push -f origin ${mainBranch}`);
            console.log('Success to push data ✅');
          }
        } catch (error) {
          console.error('Wrong Happen!', error);
        }
      }

      mergePush(obj, mainBranch);

    } catch (error) {
      console.error('Error Happen!', error); 
    }
  });

program.parse();
