const express = require('express');
const path = require('path');
var fs = require('fs');
// const bodyParser = require('body-parser');

//const root = './public';
//const public = process.env.PUBLIC || `${root}`;
const app = express();
var port = process.env.PORT || 4200;

app.get('/ping', function (req, res, next) {
    console.log(req.body);
    res.send('pong');
  });

var staticRoot = __dirname + '/';

app.use(express.static(staticRoot));

app.use(function (req, res, next) {
    
      // if the request is not html then move along
      var accept = req.accepts('html', 'json', 'xml');
      if (accept !== 'html') {
        return next();
      }
    
      // // if the request has a '.' assume that it's for a file, move along
      // var ext = path.extname(req.path);
      // if (ext !== '') {
      //   return next();
      // }
    
      fs.createReadStream(staticRoot + 'index.html').pipe(res);
    });
    
    app.listen(port, function () {
      console.log('Express server listening on port ' + port);
      console.log(
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
    });