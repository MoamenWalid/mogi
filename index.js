#!/usr/bin/env node
import random from 'random-string-generator';
import { program } from 'commander';
import { messageToCommit } from './filesDiff.js';
import { handleFilesChangeAndCommit, mergeAndPushBranch, pullChangesIfDetected } from './handlers/handlersFunctions.js';
import { foundBranch } from './handlers/foundBranch.js';

const description = `
  The "mogi" npm package appears to be a utility tool designed to streamline and automate common Git operations.
  This package includes functions to handle file changes, commit them, pull changes from a remote branch,
  and merge and push changes to the origin branch. Here's a detailed description of each function provided by the "mogi" package:`

program
  .name('mogi')
  .description(description)
  .version('1.8.0'); 

program.command('up')
  .description('This base command to mogi start')
  .option('-b, --branch <branch>', 'name of branch')
  .option('-m, --message <message>', 'message when commit')
  .option('-d, --delete', 'delete branch will make')
  .action(async (obj) => {
    if (!obj.branch) obj.branch = random(8, 'lowernumeric');
    if (!obj.message) await messageToCommit(obj);

    await handleFilesChangeAndCommit(obj);
    await pullChangesIfDetected(foundBranch('main', 'master'));
    await mergeAndPushBranch(obj, foundBranch('main', 'master'));
  });

program.parse();