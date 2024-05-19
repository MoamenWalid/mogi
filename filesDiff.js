import simpleGit from 'simple-git';
import { getCurrentTime } from './getCurrentTime.js';

const repoPath = process.cwd();
const git = simpleGit(repoPath);

// Function to return files Diff need to commit
const filesDiff = async () => {
  try {
    const diff = await git.diffSummary();
    return diff.files.map(obj => obj.file);
  } catch (err) { 
    console.error('Error: ❌', err.message);
  }
};

// Function to return message to commit
const messageToCommit = async(obj) => {
  try {
    const changes = await filesDiff();
    if (changes.length) obj.message = `files which need to commit: [${changes.join(', ')}], <${obj.branch}> branch, ${ getCurrentTime() }`;
    else obj.message = `Not found any file change!`;
    console.log(obj.message);
  } catch (err) {
    console.error('Error: ❌', err.message);
  }
};

export { messageToCommit };