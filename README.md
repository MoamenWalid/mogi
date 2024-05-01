
mogi up -b <branch|random_branch> -m <comment|files_change><br>
using:
1) **`mogi up -> branch = master | commit = 'commit'`**
2) **`mogi up -b ref -> branch = ref | commit = 'ref'`**
3) **`mogi up -b ref -m 'first-commit'`**

````
how it work:
  if <branch> {
    git checkout -b <branch>
  }

  else {
    git checkout -b <random_branch>
  }

  git add .

  if <comment> {
    git commit -m <comment>
  }

  else {
    git commit -m 'We have change in <files_change>'
  }

  git pull --no-ff origin <base_brach>
  rm -fr ".git/rebase-merge"
  git add .
  git commit -m 'solve'
  git checkout <base_branch>
  git merge <branch_name>
  git push origin <base_branch>
````
