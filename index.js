#!/usr/bin/env node
import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import { exec } from 'node:child_process';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { promisify } from 'node:util';

const git = simpleGit();
const ex = promisify(exec);

// Function to make randBranch
const randBranch = (obj) => obj.branch = random(8, 'lowernumeric');

// Funciton when found files change
async function foundChanges(obj) {
  try {
    const diff = await git.diffSummary();
    if (diff.files.length) {
      console.log(obj);
      console.log('file changes found!');
  
      await ex(`git checkout -b "${obj.branch}"`);
      console.log('Success to checkout new branch ✅');
  
      await ex(`git add .`);
      console.log('Success to add data to stage ✅');
  
      await ex(`git commit -m "${obj.message}"`);
      console.log('Success to commit changes ✅');
  
      console.log('---------Mogi------------');
    } else throw 'Not found any changes';
  } catch (error) {
    console.log(error.message);
  }
}

// Function to pull changes if found
async function foundPull(mainBranch) {
  await new Promise((res, rej) => {
    git.fetch(async (err) => {
      if (err) rej(err);
  
      const data = await git.diff(['HEAD', `origin/${mainBranch}`]);
      if (data) {
        console.log('Changes detected. Pull is possible.');
  
        await ex(`git pull --no-ff origin ${mainBranch}`);
        console.log('Success to pull data ✅');
  
        await ex(`rm -fr ".git/rebase-merge"`);
        console.log('Success to Delete ".git/rebase-merge" file ✅');
  
        const diff = await git.diffSummary();
        if (diff.files.length) {
          await ex(`git add .`);
          console.log('Success to add data to stage ✅');
  
          await ex(`git commit -m 'success'`);
          console.log('Success to commit changes ✅');
        }
  
      } else {
        console.log('No changes to pull.');
      }
      
      res();
      console.log('---------Mogi------------');
    });
  });
}

// Function to merge, push on origin
async function mergePush(obj, mainBranch) {
  try {
    const status = await git.status();
    if (!status.conflicted.length) {
      console.log(`Not exist conflict ✅`);

      await ex(`git checkout ${mainBranch}`);
      console.log('Success to checkout main ✅');

      await ex(`git merge ${obj.branch}`);
      console.log('Success to merge Data ✅');

      await ex(`git push -f origin ${mainBranch}`);
      console.log('Success to push data ✅');
    }

    if (obj.delete) {
      await ex(`git branch -d ${obj.branch}`);
      console.log('Success to delete branch ✅');
    }
  } catch (error) {
    console.error('Wrong Happen!', error.message);
  }
}

program
  .name('mogi')
  .description('GitHub Desktop simplifies Git and GitHub tasks by offering an intuitive interface, making it easy to upload all data without the need for manual upload commands.')
  .version('1.6.0'); 

program.command('up')
  .description('This base command to mogi start')
  .option('-b, --branch <branch>', 'name of branch')
  .option('-m, --message <message>', 'message when commit')
  .option('-d, --delete', 'delete branch will make')
  .action(async (obj) => {
    if (!obj.branch) randBranch(obj);
    if (!obj.message) await getFilesToCommit(obj);

    const branches = await git.branch();
    const mainBranch = branches.all.find(branch => branch === 'main' || branch === 'master');

    await foundChanges(obj);
    await foundPull(mainBranch);
    await mergePush(obj, mainBranch);
  });

program.parse();
