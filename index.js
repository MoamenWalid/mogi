import * as fs from 'node:fs';
import inquirer from 'inquirer';
import { program } from 'commander';

const uniqueCode = Date.now() ^ (Math.random() * 0x100000000);