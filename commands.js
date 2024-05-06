const gitCommand = (mainBranch, obj) => {
  const objCommands = {
    inFilesChange: [
      `git checkout -b "${obj.branch}"`,
      `git add .`,
      `git commit -m "${obj.message}"`,
    ], 

    inNeedPull: [
      `git pull --no-ff --no-commit origin ${mainBranch}`,
      `rm -fr ".git/rebase-merge"`,
      `git add .`,
      `git commit -m 'success'`
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
