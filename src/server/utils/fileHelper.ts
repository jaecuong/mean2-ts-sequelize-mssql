import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';

// http://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
function flatten(lists) {
  return lists.reduce(function (a, b) {
    return a.concat(b);
  }, []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

export const getDirRecursive = (srcpath) => {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirRecursive))];
}
