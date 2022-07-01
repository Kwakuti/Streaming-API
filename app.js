const fileSystem = require('fs');

const morgan = require('morgan');
const express = require('express')
const busboy = require('connect-busboy');
const Busboy = require('busboy');

const app = express();

const videoRouter = require('./routers/videoRouter');

app.use(morgan('dev'));

app.use(express.json());

// app.use(busboy());

app.get('/', function (req, res) {
    res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  res.end();
});


// accept POST request on the homepage
app.post('*', function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log(fieldname);
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);

});


app.use(express.static('/public'));

app.use('/api/v1/videos', videoRouter);

app.all('*', (error, request, response, next) => {
    console.log('Error Middleware', error);
});

module.exports = app;




