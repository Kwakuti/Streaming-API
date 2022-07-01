const busboy = require('busboy');
const { ReasonPhrases, StatusCodes }  = require('http-status-codes');

const Video = require('./../models/videoModel');


exports.uploadLargeVideo = (request, response, next) => {
}

exports.createVideo =  (request, response, next) => {
    const myBusboy = busboy({ headers: request.headers });
    // myBusboy.on('file', (name, stream, info) => {
    //     console.log('here 1');
    //     console.log(name);
    // });
    // myBusboy.on('field', (name, stream, info) => {
    //     console.log('here 2');
    // })

    myBusboy.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info;
        console.log(filename,encoding,mimeType);
      });
    myBusboy.on('field', (name, val, info) => {
        console.log(`Field [${name}]: value: %j`, val);
      });

    response.end();
}
    

// exports.createVideo =  (request, response, next) => {
//     if(request.busboy) {
//         request.busboy.on('file', () => {
//             console.log('Busboy can see the file...')
//         });
//         request.busboy.on('field', () => {
//             console.log('Busboy can see the field...')
//         });
//     }
//     console.log(request.busboy)
//     response.end();
// }

exports.getVideo = async (request, response, next) => {
    const videos = await Video.find();
    try {
        response.status(StatusCodes.OK).json({
            status: ReasonPhrases.OK,
            videos
        });        
    } catch (error) {
        response.status(StatusCodes.NOT_FOUND).json({
            status: ReasonPhrases.INTERNAL_SERVER_ERROR,
            error
        })
    }
}

exports.getOneVideo = (request, response, next) => {
    console.log('downloading...')
}

exports.updateVideo = (request, response, next) => {
    console.log('downloading...')
}

exports.softDeleteVideo = (request, response, next) => {
    console.log('downloading...')
}

exports.deleteVideo = (request, response, next) => {
    console.log('downloading...')
}

exports.watchVideo = (request, response, next) => {
    console.log('downloading...')
}


/*
var http = require('http'),
    express = require('express'),
    Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs');
 
var app = express();
 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'file-upload.html'));
});

app.post('/file-upload', function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
 
      var saveTo = path.join(__dirname, 'uploads/' + filename);
      file.pipe(fs.createWriteStream(saveTo));
    });
 
    busboy.on('finish', function() {
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
 
    return req.pipe(busboy);    
});
 
app.listen(3000);
*/



/*
const express = require('express');         // Express Web Server
const busboy = require('connect-busboy');   // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const path = require('path');               // Used for manipulation with path
const fs = require('fs-extra');             // Classic fs
 
const app = express(); // Initialize the express web server
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware
 
const uploadPath = path.join(__dirname, 'fu/'); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits
 
 
/**
 * Create route /upload which handles the post request
 app.route('/upload').post((req, res, next) => {
 
    req.pipe(req.busboy); // Pipe it trough busboy
 
    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);
 
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(uploadPath, filename));
        // Pipe it trough
        file.pipe(fstream);
 
        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);
            res.redirect('back');
        });
    });
});
 
 
app.route('/').get((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});
 
const server = app.listen(3200, function () {
    console.log(`Listening on port ${server.address().port}`);
});
*/