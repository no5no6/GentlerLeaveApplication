var exec       = require('child_process').exec;
var nodemailer = require('nodemailer');
var cronJob    = require('cron').CronJob;
var reasons    = require('./reasons').reasons;

var job = new cronJob('00 50 09 * * 0-6', function(){
  exec("who -q", function(error, stdout, stderr){
    if(stdout.indexOf('yy') !== -1) return;

    var transporter = nodemailer.createTransport('smtps://username%40kuyun.com:password@smtp.exmail.qq.com');

    transporter.sendMail({
      from: 'username@kuyun.com',
      to: 'leader-name@kuyun.com',
      bcc: 'CC-name@163.com',
      subject: '请假申请',
      text: reasons[Math.floor(Math.random() * reasons.length)]
    },function(err){
      console.log(err, 'err');
    });
  });
}, null, true);

job.start();
