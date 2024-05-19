
import { simpleGit } from 'simple-git';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { foundBranch } from './foundBranch.js';

const git = simpleGit();
const ex = promisify(exec);
let pushOrNot = false;

// Function to handle files change and commit them
async function handleFilesChangeAndCommit(obj) {
  try {
    const diff = await git.diffSummary();
    if (diff.files.length) {
      pushOrNot = true;
      console.log(obj);
      console.log('file changes found!');

      if (foundBranch(obj.branch)) {
        await ex(`git checkout "${ obj.branch }"`);
        console.log(`Success to switch on branch '${ obj.branch }' ✅`);
      } else {
        await ex(`git checkout -b "${ obj.branch }"`);
        console.log(`Success to checkout new branch '${ obj.branch }' ✅`);
      }
  
      await ex(`git add .`);
      console.log('Success to add data to stage ✅');
  
      await ex(`git commit -m "${obj.message}"`);
      console.log(`Success to commit changes as \n'${ obj.message }' ✅`);
  
      console.log('---------Mogi------------');
    }
  } catch (err) {
    console.log(err.message);
  }
}

// Function to pull changes if detected
async function pullChangesIfDetected(mainBranch) {
  await new Promise((res, rej) => {
    git.fetch(async (err) => {
      if (err) rej(err);
  
      const data = await git.diff(['HEAD', `origin/${ mainBranch }`]);
      if (data) {
        console.log('Changes detected. Pull is possible.');
  
        await ex(`git pull --no-ff origin ${ mainBranch }`);
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
  }).catch(err => console.error(err.message));
}

// Function to merge a branch and push changes to the origin
async function mergeAndPushBranch(obj, mainBranch) {
  try {
    const status = await git.status();
    if (!status.conflicted.length) {
      console.log(`Not exist conflict ✅`);

      if (pushOrNot) {
        await ex(`git checkout ${ mainBranch }`);
        console.log(`Success to checkout to '${ mainBranch }' branch ✅`);

        await ex(`git merge ${ obj.branch }`);
        console.log('Success to merge Data ✅');

        await ex(`git push -f origin ${ mainBranch }`);
        console.log('Success to push data ✅');
      }
    }

    if (obj.delete) {
      await ex(`git branch -d ${ obj.branch }`);
      console.log('Success to delete branch ✅');
    } else console.log("We don't delete a new branch created");
  } catch (err) {
    console.error('Wrong Happen!', err.message);
  }
}

export { handleFilesChangeAndCommit };
export { pullChangesIfDetected };
export { mergeAndPushBranch };