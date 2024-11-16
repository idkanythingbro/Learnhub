const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const topicSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }, // Reference to Course
    topicName: {
        type: String,
        required: true,
        min: 3,
        max: 3000,
    },
    topicDescription: {
        type: String,
        required: true,
        min: 3,
    },
    learningObjectives: {
        type: String,
        min: 3,
    },
    prerequisites: {
        type: String,
        default: 'None'
    },
    contentType: {
        type: String,
        enum: ['pdf', 'video'],
        required: true
    },
    contentFile: {
        type: String, //Cloudinary URL
        required: true
    },

}, {
    timestamps: true
});

const Topic = mongoose.model('Topic', topicSchema);

const courseSchema = new Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    courseTitle: {
        type: String,
        required: true,
        min: 3,
        max: 3000,
    },
    courseSubtitle: {
        type: String,
        min: 3,
        max: 3000,

    },
    courseDescription: {
        type: String,
        required: true,
        min: 3,

    },
    targetAudience: {
        type: String,
        required: true

    },
    courseLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'expert'],
        required: true
    },
    learningObjectives: {
        type: String,
        required: true
    },
    courseRequirements: {
        type: String,
        required: true
    },
    courseLanguage: {
        type: String,
        required: true
    },
    instructorBio: {
        type: String
    },
    coursePoster: {
        type: String,//Cloudinary URL
        required: true

    },
    coursePrice: {
        type: Number,
        min: 0,
        default: 0

    },
    promotionalVideo: {
        type: String,//Cloudinary URL

    },
    courseCategory: {
        type: String,
        enum: ['development', 'business', 'finance', 'design', 'others'],
        required: true
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = { Topic, Course };