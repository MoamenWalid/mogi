
import simpleGit from 'simple-git';

const repoPath = process.cwd();
const git = simpleGit(repoPath);

const fileChanges = async () => {
  try {
    const diff = await git.diffSummary();
    const arrFilesChanges = diff.files.map(obj => `'${obj.file}'`);
    return `Changed files in last commit: [${arrFilesChanges.join(', ')}]`;
  } catch (err) { 
    console.error('Error', err);
  }
};

const getFilesToCommit = async(obj) => {
  try {
    const changes = await fileChanges();
    obj.message = `${changes} in ${obj.branch} branch`;
  } catch (err) {
    console.error('Error:', err);
  }
};

export { getFilesToCommit };
// Abdo