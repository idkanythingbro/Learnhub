const { Router } = require('express');
const router = Router();
const upload = require('../middleware/multer.middleware');
const { jwtVerify } = require('../middleware/auth.middleware');
const {
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
} = require('../controllers/post.controllers');

//Create post
router.post('/create', jwtVerify, upload.array('images', 20), createPost);

//Update post
router.put('/update/:postId', jwtVerify, upload.array('images', 20), updatePost);
//like post
router.put('/like/:postId', jwtVerify, likePost);
//Share post
router.put('/share/:postId', jwtVerify, sharePost);
//Delete post
router.delete('/delete/:postId', jwtVerify, deletePost);
//Comment on post
router.post('/comment/:postId', jwtVerify, commentOnPost);
//Fetch post in batches
router.get('/', gatePosts);
//Fetch post like user details
router.get('/like/:postId', gatePostLikeUserDetails);
//Fetch post share user details
router.get('/share/:postId', gatePostShareUserDetails);
//Get comment on a post by post Id
router.get('/comment/:postId', getComments);
router.get('/comment/like/:commentId', jwtVerify, likeComment);
router.post('/comment/reply/:commentId', jwtVerify, replyComment);
router.get('/comment/reply/:commentId', gateReplies);
router.delete('/comment/delete/:commentId', jwtVerify, deleteComment);
//Get post by user Id
router.get('/user/:userId', getPostByUserId);
//Get post by Id
router.get('/:postId', getPostById);

module.exports = router;