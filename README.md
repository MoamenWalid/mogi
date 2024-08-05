# Mogi

![npm](https://img.shields.io/npm/v/mogi) ![license](https://img.shields.io/npm/l/mogi) ![downloads](https://img.shields.io/npm/dw/mogi)

Mogi is a powerful command-line tool designed to streamline your Git workflow by simplifying the process of pushing changes to a repository. With its intuitive syntax and versatile options, Mogi saves you time and effort, making version control and collaboration more efficient.

<hr>

## Features

- Automatically create branches with randomly generated names.
- Customizable branch names and commit messages.
- Convenient options for branch management and commit messages.
- Enhance your workflow with easy branch creation, commits, and push actions.

<ht>

## Installation
Install Mogi globally using npm:

```bash
npm install -g mogi
```

<hr>

## Usage
### Basic Commands
##### Create a Branch and Commit Changes
```bash
mogi up
```

This command creates a new branch with a randomly generated name and commits the changes with a message indicating the files changed.

##### Specify a Branch Name
```bash
mogi up -b 'branch_name'
```

Create and commit changes to a branch named branch_name. The commit message will indicate the files changed.

##### Custom Commit Message
```bash
mogi up -m 'message'
```

Commit changes with a custom message message.

##### Delete a Branch
```bash
mogi up -d
```

##### Options for mogi up
<li> -b -> Create a new branch or switch to the same branch if found: mogi up -b 'branch_name'.
<li> -m -> Create a new commit message: mogi up -m 'message'.
<li> -d -> Delete the branch after pushing changes: mogi up -d.
