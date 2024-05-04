
// func to return all comands we want to git, github
const gitCommand = (mainBranch, obj) => {
  return [
    `git checkout -b "${obj.branch}"`,
    `git add .`,
    `git commit -m "${obj.message}"`,
    `git push origin ${mainBranch}`
  ]
}

export { gitCommand };