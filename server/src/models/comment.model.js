const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    owner: {
        //
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default:null
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment" ,
        default: null
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        default: []
    },
    replies: {
        type: Number,
        default: 0
    }
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;