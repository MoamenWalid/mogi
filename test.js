import fs from 'node:fs';

if (fs.existsSync('.git/rebase-merge"')) {
  await ex(`rm -fr ".git/rebase-merge"`);
  console.log('Success to Delete ".git/rebase-merge" file ✅');
} else {
  console.log('not found');
}