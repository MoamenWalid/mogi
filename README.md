mogi up -b <branch|random_branch> -m <message|files_change><br>
using:
1) **`mogi up -> branch = <random_branch> && commit = <files_change>`**
2) **`mogi up -b ref -> branch = ref && commit = <files_change>`**
3) **`mogi up -b ref -m 'first commit' -> branch = ref && commit = 'first commit'`**

## **mogi up**
````
Mogi Up is a command-line tool designed to streamline the process of pushing changes to a Git repository. With its simple syntax and powerful functionality, Mogi Up simplifies the steps involved in committing and pushing changes, saving you time and effort.
````

<hr>

### **Usage:**
````
mogi up: This command automatically creates a new branch and commits the changes with a randomly generated branch name and a message indicating the files changed.

mogi up -b <ref>: Specify a branch name <ref> to create and commit changes to. The commit message will indicate the files changed.

mogi up -b <ref> -m <message>: Create a branch named <ref> and commit changes with a custom message <message>.

mogi up -d: This option '-d' mean delete a created branch

mogi up enhances your workflow by providing a convenient way to manage your Git branches and commits, making collaboration and version control more efficient.
````

// likes in new branch as like in
// created a new branch and delete it in now is created in how it work right now is liked now align devs
