
// func to return all comands we want to git, github
const gitCommand = (mainBranch, obj) => {
  const objCommands = {
    inFilesChange: [
      `git checkout -b "${obj.branch}"`,
      `git add .`,
      `git commit -m "${obj.message}"`,
    ], 

    inNeedPull: [
      `git pull --no-ff --no-commit origin ${mainBranch}`,
      `rm -fr ".git/rebase-merge"`
    ],

    inAll: [
      `git checkout ${mainBranch}`,
      `git merge "${obj.branch}"`,
      `git push -f origin ${mainBranch}`
    ]
  }

  return objCommands;
}

export { gitCommand };  