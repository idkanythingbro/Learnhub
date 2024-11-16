const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    caption: {
        type: String,
        default: "",
    },
    images: [
        {
            url: {
                type: String,
                required: true,
            },
        },
    ],
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        default: [],
    },
    comments: {
        type: Number,
        default: 0,
    },
    share: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    }
});
// postSchema.virtual('ownerDetails', {
//     ref: 'User',
//     localField: 'owner',
//     foreignField: '_id',
//     justOne: true // Only return one document
// });
const Post=mongoose.model("Post", postSchema);
module.exports = Post