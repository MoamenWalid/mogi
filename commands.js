
// func to return all comands we want to git, github
const gitCommand = (mainBranch, obj) => {
  return [
    `git checkout -b "${obj.branch}"`,
    `git add .`,
    `git commit -m "${obj.message}"`,
    `git pull --no-ff origin ${mainBranch}`,
    `rm -fr ".git/rebase-merge"`,
    `git add .`,
    `git commit -m "${obj.message}"`,
    `git checkout ${mainBranch}`,
    `git merge "${obj.branch}"`,
    `git push -f origin ${mainBranch}`
  ]
}

export { gitCommand };