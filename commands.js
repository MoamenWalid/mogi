
// import { simpleGit } from 'simple-git';


// const git = simpleGit();
// git.branch((err, branches) => {
//   const mainBranch = branches.all.find(branch => branch === 'main' || branch === 'master');
//   console.log(mainBranch);
// })

const gitCommand = (branch, message) => {
  return 'git add . && git status && git commit -m "new"';
    
}

export { gitCommand };