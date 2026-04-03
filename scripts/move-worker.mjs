import fs from 'node:fs';
import path from 'node:path';

const workerPath = path.join(process.cwd(), '.open-next', 'worker.js');
const targetPath = path.join(process.cwd(), '.open-next', '_worker.js');

if (fs.existsSync(workerPath)) {
  fs.renameSync(workerPath, targetPath);
  console.log('✅ Successfully renamed worker.js to _worker.js for Cloudflare Pages.');
} else {
  console.error('❌ Could not find .open-next/worker.js');
}
