
import simpleGit from 'simple-git';

const repoPath = process.cwd();
const git = simpleGit(repoPath);

const fileChnages = async () => {
  try {
    const diff = await git.diffSummary();
    return diff.files.map(obj => obj.file);
  } catch (err) { 
    console.error('Error', err);
  }
};

const getFilesToCommit = async(obj) => {
  try {
    const changes = await fileChnages();
    obj.message = `Changed files which need to commit: [${changes.join(', ')}] in ${obj.branch} branch`;
  } catch (err) {
    console.error('Error:', err);
  }
};

export { getFilesToCommit };