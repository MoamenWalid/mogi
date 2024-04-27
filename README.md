
mogi up -b <branch|master> -m <branch|'commit'><br>
using:
  - ##### **`mogi up -> branch = master | commit = 'commit'`**
  - ##### **`mogi up -b ref -> branch = ref | commit = 'ref'`**
  - ##### **`mogi up -b ref -m 'first-commit'`**

````
make:
  git add .

  if <branch> {
    git commit -m <branch>
    git checkout -b <branch>
  }

  else {
    git commit -m 'commit'
  }

  git checkout base_branch
  git pull origin base_branch
  git merge branch_name

  if has_conflict {
    exit_project()
  }

  else {
    git push origin base_branch
  }
````