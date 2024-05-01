
// import { simpleGit } from 'simple-git';


// const git = simpleGit();
// git.branch((err, branches) => {
//   const mainBranch = branches.all.find(branch => branch === 'main' || branch === 'master');
//   console.log(mainBranch);
// })

const gitCommand = (branch, message) => {
  return `git checkout -b "${branch}" && git add . && git commit -m "${message}" && git pull --no-ff origin main && rm -fr ".git/rebase-merge" && git add . && git commit -m "${message}" && git checkout main && git merge "${branch}" && git add . && git commit -m "${message}" && git push -f origin main`;
}

export { gitCommand };