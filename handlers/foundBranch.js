
import { simpleGit } from "simple-git";

const git = simpleGit();
const branches = await git.branch();

const foundBranch = (...names) => {
  const branch = branches.all.find(branch => names.includes(branch));
  return branch;
}

export { foundBranch };