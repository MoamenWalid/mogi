
import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import child_process from 'node:child_process';
import { promisify  } from 'util';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

// const options = program.opts();
// if (options.debug) console.log(options);
// console.log('pizza details:');
// if (options.small) console.log('- small pizza size');
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);