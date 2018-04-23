import * as path from 'path';
import * as fsExtra from 'fs-extra';
// tslint:disable-next-line:no-var-requires
const copy = require('copy');

fsExtra.readJson('./tsconfig.json')
  .then(opt => {
    copy(path.join(opt.compilerOptions.rootDir || '.', '**', '*.html'), opt.compilerOptions.outDir,
      (err: any) => { if (err) throw err; });
  })
  .catch(err => {
    // tslint:disable-next-line:no-console
    console.log(err);
    process.exit(1);
  });
