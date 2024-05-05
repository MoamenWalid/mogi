import random from 'random-string-generator';
import { simpleGit } from 'simple-git';
import child_process from 'node:child_process';
import { promisify  } from 'util';
import { program } from 'commander';
import { getFilesToCommit } from './fileChanges.js';
import { gitCommand } from './commands.js';

// إنشاء كائن simple-git
const git = simpleGit();

// فحص حالة المستودع المحلي
git.status((err, statusSummary) => {
  if (err) {
    console.error('Wrong:', err);
    return;
  }

  // تحقق من وجود تعديلات محلية غير مؤكدة
  if (statusSummary.files.length > 0) {
    console.log('Local need to commit');
    // يمكنك تنفيذ pull هنا إذا كان ذلك ضروريًا
  } else {
    console.log('Don"t want to commit');

    // تحقق من الفروع البعيدة للمستودع
    git.branch(['-r'], (err, branches) => {
      if (err) {
        console.error('wrong:', err);
        return;
      }

      // تحقق من وجود تعديلات في المسار البعيد (remote)
      if (branches.all.some(branch => branch.includes('/main'))) {
        console.log('Make pull');
      } else {
        console.log('Don"t make pull');
      }
    });
  }
});
