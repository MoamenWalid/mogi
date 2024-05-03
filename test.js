import { program } from 'commander';

program
  .option('--first')
  .option('-s, --se <char>')
  .action(() => {
    console.log('hello Action');
  })

program.parse();
const options = program.opts();

console.log(options);