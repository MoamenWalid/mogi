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
    console.error('حدث خطأ:', err);
    return;
  }

  // تحقق من وجود تعديلات محلية غير مؤكدة
  if (statusSummary.files.length > 0) {
    console.log('يوجد تعديلات محلية غير مؤكدة.');
    // يمكنك تنفيذ pull هنا إذا كان ذلك ضروريًا
  } else {
    console.log('لا يوجد تعديلات محلية غير مؤكدة.');

    // تحقق من الفروع البعيدة للمستودع
    git.branch(['-r'], (err, branches) => {
      if (err) {
        console.error('حدث خطأ:', err);
        return;
      }

      // تحقق من وجود تعديلات في المسار البعيد (remote)
      if (branches.all.some(branch => branch.includes('/main'))) {
        console.log('يوجد تعديلات في المسار البعيد (remote). يُنصح بالقيام ب pull.');
      } else {
        console.log('لا يوجد تعديلات في المسار البعيد (remote).');
      }
    });
  }
});
