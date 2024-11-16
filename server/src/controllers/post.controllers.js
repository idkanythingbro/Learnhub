const User = require("../models/user.model");
const Post = require("../models/post.models");
const { uploadFileToCloudinary, deleteFromCloudinary } = require("../service/cloudinary.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const fs = require('fs');
const path = require("path");
const ApiError = require("../utils/ApiErrors");
const Comment = require("../models/comment.model");

const deleteFiles = (files = []) => {
    files.forEach(file => {
        fs.unlinkSync(path.join(file.destination, file.filename));
    })
}

const handelUploadImages = async (files) => {
    const uploadPromises = files.map(async (file) => {
        let localPath = file.path;
        const url = await uploadFileToCloudinary(localPath, "auto", "Social Media");
        return { url };
    });

    // Wait for all promises to resolve
    images = await Promise.all(uploadPromises);
    return images;
}

const handelDeleteImagesFromCloudinary = async (images) => {
    if (images) {
        // Create an array of promises
        const deletePromises = images.map(async (image) => {
            await deleteFromCloudinary(image.url);
        });

        // Wait for all promises to resolve
        await Promise.all(deletePromises);
    }
    return true;
};


const handelCommentDelete = async (commentId = null) => {
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new ApiError(404, "Comment not found")
        }
        if (comment.commentId) {
            const parentComment = await Comment.findById(comment.commentId);
            if (parentComment) {
                parentComment.replies -= 1;
                await parentComment.save({ validateModifiedOnly: true });
            }
        } else {
            const post = await Post.findById(comment.postId);
            if (post) {
                post.comments -= 1;
                await post.save({ validateModifiedOnly: true });
            }
        }
        const replays = await Comment.find({ commentId });
        if (replays.length > 0) {
            for (const replay of replays) {
                await handelCommentDelete(replay._id);
            }
        }
        await Comment.deleteOne({ _id: commentId });

    } catch (error) {
        console.log(error);
        new ApiError(500)

    }
}

const handelDeletePost = async (postId = null) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new ApiError(404, "Post not found")
        }
        if (post.images && post.images.length > 0) {
            await handelDeleteImagesFromCloudinary(post.images);
        }
        const comments = await Comment.find({ postId });
        if (comments && comments.length > 0) {
            for (const comment of comments) {
                await handelCommentDelete(comment._id);
            }
        }
        await Post.deleteOne({ _id: postId });
    } catch (error) {
        console.log(error);
        new ApiError(500)
    }
}


//SECTION - Controllers

const createPost = asyncHandler(async (req, res) => {
    const { caption } = req.body;
    const files = req.files;

    const userId = req.user._id;
    if (!userId) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(401, "Unauthorized")
    }
    const user = await User.findById(userId);
    if (!user) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(404, "User not found")
    }

    if (!caption && (files && files.length === 0)) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(400, "Caption or images required")
    }
    if (files.length > 5) {
        deleteFiles(files);
        throw new ApiError(400, "Maximum 5 images allowed")
    }

    let images = [];
    if (files) {
        images = await handelUploadImages(files);
    }

    const post = await Post.create(
        {
            owner: userId,
            caption,
            images
        }
    )

    res.status(201).json(
        new ApiResponse(
            201,
            {
                post
            },
            "Post created successfully"
        )
    )

})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const files = req.files;
    const { caption } = req.body;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(404, "Post not found")
    }
    if (!userId) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(401, "Unauthorized")

    }
    if (post.owner.toString() !== userId.toString()) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(403, "Forbidden")
    }
    if (!caption && (files && files.length === 0)) {
        if (files) {
            deleteFiles(files);
        }
        throw new ApiError(400, "Caption or images required")
    }
    if (files.length > 5) {
        deleteFiles(files);
        new ApiError(400, "Maximum 5 images allowed")
    }
    let images = post.images;
    if (files) {
        if (images && images.length > 0) {
            await handelDeleteImagesFromCloudinary(images);
        }

        images = await handelUploadImages(files);
        post.images = images;
    }
    if (caption) {
        post.caption = caption;
    }
    await post.save({ validateModifiedOnly: true });

    res.status(200).json(new ApiResponse(
        200,
        {
            post
        },
        "Post updated successfully"
    ))
})

const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId).populate({
        path: 'owner',
        select: 'name userName avatar', // Selecting the fields you need
        model: 'User'
    });
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    let msg = "Post liked successfully";
    if (post.likes.includes(userId)) {
        post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        msg = "Post unlike successfully"
    } else {
        post.likes.push(userId);
    }
    await post.save({ validateModifiedOnly: true });
    res.status(200).json(new ApiResponse(
        200,
        { post },
        msg
    ))
})

const sharePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    // if (post.owner.toString() === userId.toString()) {
    //     throw new ApiError(403, "Forbidden")
    // }
    if (!post.share.includes(userId)) {
        // post.share=post.share.filter(id=>id.toString()!==userId.toString());
        post.share.push(userId);
        await post.save({ validateModifiedOnly: true });
    }
    res.json(new ApiResponse(
        200,
        {},
        "Post shared successfully"
    ))
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    if (post.owner.toString() !== userId.toString()) {
        throw new ApiError(401, "Unauthorized")
    }
    // if (post.images && post.images.length > 0) {
    //     await handelDeleteImagesFromCloudinary(post.images);
    // }
    // await Post.deleteOne({ _id: postId });
    await handelDeletePost(post._id)
    res.json(new ApiResponse(
        200,
        {},
        "Post deleted successfully"
    ))
})

const commentOnPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;
    const post = await Post.findById(postId).populate({
        path: 'owner',
        select: 'name userName avatar', // Selecting the fields you need
        model: 'User'
    });
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    if (!comment) {
        throw new ApiError(400, "Comment required")
    }
    await Comment.create({
        owner: userId,
        postId: post._id,
        comment
    })
    post.comments += 1;
    await post.save({ validateModifiedOnly: true });
    res.json(new ApiResponse(
        200,
        { post },
        "Comment added successfully"
    ))
})

//Fetch post in batches
const gatePosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    //NOTE - Pagination  

    // const posts = await Post.find()
    //     .limit(limit)
    //     .skip((page - 1) * limit)
    //     .populate({
    //         path: 'owner',
    //         select: 'name userName avatar', // Selecting the fields you need
    //         model: 'User'
    //     })
    //     .exec();



    //NOTE - Select randomly 
    const posts = await Post.aggregate([
        { $sample: { size: parseInt(limit, 10) } },
    ])

    // Populate the owner with selected fields from User
    const populatedPosts = await Post.populate(posts, {
        path: 'owner',
        select: 'name userName avatar', // Selecting the fields you need
        model: 'User'
    });

    res.json(new ApiResponse(
        200,
        {
            // posts
            post: populatedPosts
        },
        "Posts fetched successfully"
    ))
})
//Gate post by id
const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId)
        .populate({
            path: 'owner',
            select: 'name userName avatar', // Selecting the fields you need
            model: 'User'
        })
        .exec();
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    res.json(new ApiResponse(
        200,
        {
            post
        },
        "Post fetched successfully"
    ))
})
//Gate post by user id
const getPostByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const posts = await Post.find({ owner: userId });
    res.status(200).json(new ApiResponse(
        200,
        {
            posts
        },
        "Posts fetched successfully"
    ))
})



//TODO - gate post like uer details
const gatePostLikeUserDetails = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    let likes = post.likes;
    let likesUserDetails = [];
    if (likes && likes.length > 0) {
        likesUserDetails = await Promise.all(likes.map(async like => {
            const user = await User.findById(like)
                .select('_id name userName avatar');
            return user;
        }));
    }

    res.status(201).json(new ApiResponse(
        201,
        {
            likes: likesUserDetails
        },
        "Likes fetched successfully"
    ));
});

//TODO - gate post share user details
const gatePostShareUserDetails = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    let shares = post.share;
    let sharesUserDetails = [];
    if (shares && shares.length > 0) {
        sharesUserDetails = await Promise.all(shares.map(async share => {
            const user = await User.findById(share)
                .select('_id name userName avatar');
            return user;
        }));
    }
    res.status(201).json(new ApiResponse(
        201,
        {
            shares: sharesUserDetails
        },
        "Shares fetched successfully"
    ));
});


//gte comment
const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    }
    // const comments = await Comment.find({ postId }).populate("owner");
    const comments = await Comment.find({ postId })
        .populate({
            path: 'owner',
            select: 'name userName avatar', // Selecting the fields you need
            model: 'User'
        })
        .exec();


    res.status(201).json(new ApiResponse(
        201,
        {
            comments
        },
        "Comments fetched successfully"
    ))
})

//like comment
const likeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    let msg = "Comment liked successfully";
    if (comment.likes.includes(userId)) {
        comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
        msg = "Comment unlike successfully"
    } else {
        comment.likes.push(userId);
    }
    await comment.save({ validateModifiedOnly: true });
    res.status(200).json(new ApiResponse(
        200,
        { comment },
        msg
    ))
})

//Replay Comment
const replyComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { replay } = req.body;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    if (!replay) {
        throw new ApiError(400, "Replay required")
    }
    let newReplay = await Comment.create({
        owner: userId,
        commentId: comment._id,
        comment: replay
    })
    newReplay = await Comment
        .findById(newReplay._id)
        .populate({
            path: 'owner',
            select: 'name userName avatar', // Selecting the fields you need
            model: 'User'
        })
    comment.replies += 1;
    await comment.save({ validateModifiedOnly: true });
    res.json(new ApiResponse(
        200,
        { newReplay },
        "Reply added successfully"
    ))
})

//gate Replays
const gateReplies = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    const replies = await Comment
        .find
        ({
            commentId
        })
        .populate({
            path: 'owner',
            select: 'name userName avatar', // Selecting the fields you need
            model: 'User'
        })
        .exec();

    res.json(new ApiResponse(
        200,
        {
            replies
        },
        "Replies fetched successfully"
    ))

})


const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }
    if (!userId) {
        throw new ApiError(401, "Unauthorized")
    }
    if (comment.owner.toString() !== userId.toString()) {
        throw new ApiError(403, "Forbidden")
    }
    await handelCommentDelete(commentId);
    res.json(new ApiResponse(
        200,
        {},
        "Comment deleted successfully"
    ))
})


module.exports = {
    createPost,
    updatePost,
    likePost,
    sharePost,
    deletePost,
    commentOnPost,
    gatePosts,
    getComments,
    likeComment,
    replyComment,
    gateReplies,
    deleteComment,
    gatePostLikeUserDetails,
    gatePostShareUserDetails,
    getPostById,
    getPostByUserId
}