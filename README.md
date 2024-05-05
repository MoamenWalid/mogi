
mogi up -b <branch|random_branch> -m <comment|files_change><br>
using:
1) **`mogi up -> branch = <random_branch> | commit = <files_change>`**
2) **`mogi up -b ref -> branch = ref | commit = <files_change>`**
3) **`mogi up -b ref -m 'first commit' -> branch = ref | commit = 'first commit'`**

````
How it work:
  if <file_chnages> {
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
  }

  if <files_to_pull> {
    git pull --no-ff origin <base_brach>  
    rm -fr ".git/rebase-merge"
    if <conflict_happen> {
      (after_solve_it) {
        git add .
        git commit -m 'Greet jop to solve conflict ✅ <files_change>'
      }
    }
  }

  git checkout <base_branch>
  git merge <branch_name>
  git push -f origin <base_branch>
````
