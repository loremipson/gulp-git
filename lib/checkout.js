var gutil = require('gulp-util');
var exec = require('child_process').exec;
var escape = require('any-shell-escape');

module.exports = function (branch, opt, cb) {
  if (!cb && typeof opt === 'function') {
    // optional options
    cb = opt;
    opt = {};
  }
  if(!opt) opt = {};
  if(!branch) throw new Error('gulp-git: Branch name is require git.checkout("name")');
  if(!opt.args) opt.args = ' ';
  if(!opt.cwd) opt.cwd = process.cwd();

  var cmd = "git checkout " + opt.args + " " + escape([branch]);
  exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
    if(err) return cb(err);
    gutil.log(stdout, stderr);
    cb(null);
  });
};
