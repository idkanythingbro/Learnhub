const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Comment" || "Reply"
    },
    replies: {
        type: Number,
        default: 0
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
const Reply=mongoose.model("Reply", replySchema);
module.exports = Reply;