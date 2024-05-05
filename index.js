import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import { exec } from 'node:child_process';
import { program } from 'commander';
import { fileChanges, getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';

const git = simpleGit();

// Function if branch isn't exist
const randBranch = (obj) => obj.branch = random(8, 'lowernumeric');

// Function to write commands
function writeCommand(arr) {
  arr.forEach(command => {
    exec(command, (err, stdout) => {
      if (err) {
        console.error('Error Happen ❌:', err);
        return;
      }

      if (stdout) console.log('Success ✅', stdout);
    });
  })
}

// Function if files changes
async function inFileChanges(obj) {
  try {
    const fChanges = await fileChanges();

    if (fChanges) {
      const cInfchnages = [`git checkout -b "${obj.branch}"`, `git add .`, `git commit -m "${obj.message}"`];
      if (!obj.branch) randBranch(obj);
      if (!obj.message) await getFilesToCommit(obj);
      writeCommand(cInfchnages);
    }

  } catch (err) {
    console.error(err);
  }
}

// Function if files to pull
async function filesToPull() {
  try {
    git.fetch((err) => {
      if (err) {
        console.error('Error to fetch', err);
        return;
      }
    
      git.diff(['HEAD', 'origin/main'], (err, changes) => {
        if (err) {
          console.error('Error to pull or not', err);
          return;
        }
        if (changes) {

        } else {
          console.log('Not pull');
        }
      })
    });
    
  } catch (error) {
    
  }
}

program.name('mogi')
  .description('GitHub Desktop simplifies Git and GitHub tasks by offering an intuitive interface, making it easy to upload all data without the need for manual upload commands.')
  .version('1.0.0'); 

program.command('up') 
  .description('This base command to mogi start')
  .option('-b, --branch <branch>', 'name of branch')
  .option('-m, --message <message>', 'message when commit')
  .option('-d, --delete', 'delete branch will make')
  .action(async (obj) => {
    inFileChanges(obj);


    // git.branch((err, { all: branches }) => {
    //   if (err) {
    //     console.log('Error ', err);
    //     return;
    //   }

    //   const mainBranch = branches.find(branch => branch === 'main' || branch === 'master');
    //   const commands = gitCommand(mainBranch, obj);

    //   commands.forEach(command => {
    //     exec(command, (err, stdout) => {
    //       if (err) {
    //         console.error('Error Happen ❌:', err);
    //         return;
    //       }

    //       if (stdout) console.log('Success ✅', stdout);
    //     });
    //   })

    //   if (obj.delete) exec(`git branch -d ${obj.branch}`);
    // })
  });

program.parse();