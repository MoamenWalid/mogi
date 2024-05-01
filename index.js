import * as fs from 'node:fs';
import inquirer from 'inquirer';
import { getFiles } from './fileChanges.js';
import { program } from 'commander';
import { exec } from 'node:child_process';
import { gitCommand } from './commands.js';

// 1) **`mogi up -> branch = <random_branch> | commit = <files_change>`**
// 2) **`mogi up -b ref -> branch = ref | commit = <files_change>`**
// 3) **`mogi up -b ref -m 'first commit' -> branch = ref | commit = 'first commit'`**

// Function if branch is typed
const whenHasBranch = (obj) => {
  const uniqueCode = Math.abs(Date.now() ^ (Math.random() * 0x100000000));
  obj.branch = uniqueCode;
}

program.name('mogi')
  .description('GitHub Desktop simplifies Git and GitHub tasks by offering an intuitive interface, making it easy to upload all data without the need for manual upload commands.')
  .version('1.0.0');

program.command('up') 
  .description('This base command to mogi start')
  .option('-b, --branch <branch>', 'name of branch')
  .option('-m, --message <message>', 'message when commit')
  .action(async (obj) => {
    if (!obj.hasOwnProperty('branch')) whenHasBranch(obj);
    if (!obj.hasOwnProperty('message')) await getFiles(obj);

    const command = gitCommand(obj.branch, obj.message);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }

      console.log(`data: ${stdout}`);
    });
  });

program.parse();