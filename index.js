import { getFilesToCommit } from './fileChanges.js';
import { program } from 'commander';
import { exec } from 'node:child_process';
import { gitCommand } from './commands.js';
import { simpleGit } from 'simple-git';

const git = simpleGit();

// Function if branch isn't exist
const randBranch = (obj) => obj.branch = Math.abs(Date.now() ^ (Math.random() * 0x100000000));

program.name('mogi')
  .description('GitHub Desktop simplifies Git and GitHub tasks by offering an intuitive interface, making it easy to upload all data without the need for manual upload commands.')
  .version('1.0.0'); 

program.command('up') 
  .description('This base command to mogi start')
  .option('-b, --branch <branch>', 'name of branch')
  .option('-m, --message <message>', 'message when commit')
  .action(async (obj) => {
    if (!obj.branch) randBranch(obj);
    if (!obj.message) await getFilesToCommit(obj);

    git.branch((err, { all: branches }) => {
      if (err) {
        console.log('Error ', err);
        return;
      }

      const mainBranch = branches.find(branch => branch === 'main' || branch === 'master');
      const commands = gitCommand(mainBranch, obj.branch, obj.message);

      commands.forEach(command => {
        exec(command, (err, stdout) => {
          if (err) {
            console.error('Error Happen ❌:', err);
            return;
          }

          console.log('Success ✅', stdout);
        });
      })
    })
  });

program.parse();