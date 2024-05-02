
// func to return all comands we want to git, github
const gitCommand = (mainBranch, branch, message) => {
  return [
    `git checkout -b "${branch}"`,
    `git add .`,
    `git commit -m "${message}"`,
    `git checkout ${mainBranch}`,
    `git merge "${branch}"`,
    `git pull --no-ff origin ${mainBranch}`,
    `rm -fr ".git/rebase-merge"`,
    `git add .`,
    `git commit -m "${message}"`,
    `git push -f origin ${mainBranch}`
  ]
}

export { gitCommand };