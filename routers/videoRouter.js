const multer = require('multer');
const express = require('express');

const videoController = require('./../controllers/videoController');

const videoRouter = express.Router();


const imageStorageSetting = multer.diskStorage({
    destination: function (request, file, cb) {
        console.log(file);
        cb(null, '/public/images/movie-covers');
    },
    filename: function (request, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.mimetype.split('/')[1];
      cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    }
});
  

const uploadVideoCover = multer({ storage: imageStorageSetting })


videoRouter.route('/').get(videoController.getVideo)
                    .post(videoController.createVideo)
                    // .post(uploadVideoCover.fields([{  name: 'imageCover', maxCount: 3 }]), videoController.createVideo)
                    
videoRouter.route('/:videoId').get(videoController.getOneVideo)
                            .patch(videoController.updateVideo)
                            .delete(videoController.softDeleteVideo);

videoRouter.route('/:videoId').get(videoController.getOneVideo)
                            .patch(videoController.updateVideo)
                            .delete(videoController.softDeleteVideo);

module.exports = videoRouter;