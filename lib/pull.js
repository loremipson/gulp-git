var gutil = require('gulp-util');
var exec = require('child_process').exec;
var escape = require('any-shell-escape');

module.exports = function (remote, branch, opt, cb) {
  if (!cb && typeof opt === 'function') {
    // optional options
    cb = opt;
    opt = {};
  }
  if(!branch) branch = 'master';
  if(!remote) remote = 'origin';
  if(!opt) opt = {};
  if(!opt.cwd) opt.cwd = process.cwd();
  if(!opt.args) opt.args = ' ';

  var cmd = "git pull " + opt.args + " " + escape([remote, branch]);
  return exec(cmd, {cwd: opt.cwd}, function(err, stdout, stderr){
    if(err) return cb(err);
    gutil.log(stdout, stderr);
    cb();
  });
};
