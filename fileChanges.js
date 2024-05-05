
import simpleGit from 'simple-git';

const repoPath = process.cwd();
const git = simpleGit(repoPath);

const fileChanges = async () => {
  try {
    const diff = await git.diffSummary();
    return diff.files.map(obj => obj.file);
  } catch (err) { 
    console.error('Error', err);
  }
};

const getFilesToCommit = async(obj) => {
  try {
    const changes = await fileChanges();
    obj.message = `Changed files need to commit: [${changes.join(', ')}] in ${obj.branch} branch`;
  } catch (err) {
    console.error('Error:', err);
  }
};

export { fileChanges, getFilesToCommit };