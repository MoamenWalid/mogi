
mogi up -b <branch|random_branch> -m <comment|files_change><br>
using:
1) **`mogi up -> branch = master | commit = 'commit'`**
2) **`mogi up -b ref -> branch = ref | commit = 'ref'`**
3) **`mogi up -b ref -m 'first-commit'`**

````
make:
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

  git pull origin base_branch
  git merge branch_name
  git add .

  if <comment> {
    git commit -m <comment>
  }

  else {
    git commit -m 'We have change in <files_change>'
  }

  git pull --no-ff origin <base_brach>
  git checkout <base_branch>
  git merge <branch_name>

  if has_conflict {
    exit_project()
  }

  else {
    git push origin base_branch
  }
````