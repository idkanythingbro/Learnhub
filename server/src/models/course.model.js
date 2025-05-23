const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const topicSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }, // Reference to Course
    topicNo:{
        type: Number,
        required: true
    },
    topicName: {
        type: String,
        required: true,
        min: 3,
        max: 3000,
    },
    file: {
        type: String, //Cloudinary URL
        required: true
    },

}, {
    timestamps: true
});

const Topic = mongoose.model('Topic', topicSchema);

const courseSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'ownerModel',
        required: true
    },
    ownerModel: {
        type: String,
        required: true,
        enum: ['User', 'OauthUser'] // List all possible models here
    },
    courseName: {
        type: String,
        required: true,
        min: 3,
        max: 3000,
    },
    description: {
        type: String,
        required: true,
        min: 5,
    },
    introVideo: {
        type: String,
        // required: true
    },
    poster: {
        type: String,
        required: true
    },
    prerequsite: {
        type: String,
        default: 'None'
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },

}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = { Topic, Course };