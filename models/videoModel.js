
const slugify = require('slugify');

const { Schema, model } = require('mongoose');

const videoSchema = new Schema({
    imageCover: { type: String },
});

videoSchema.pre('save', function(next) {
    this.slug =  slugify(this.name);
    next();
});

module.exports = model('Video', videoSchema)


/*
const videoSchema = new Schema({
    name: { type: String },
    slug: { type: String, default: this.name },
    description: { type: String },
    videoAddress: { type: String },
    display: { type: Boolean, default: false, select: false  },
    comment: { type: [String] }
});
*/