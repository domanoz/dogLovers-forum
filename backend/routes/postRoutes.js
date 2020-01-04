const express = require('express');
const postController = require('./../controllers/postController');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = new express.Router({ mergeParams: true });

// POST /groups/632456jkh3456/posts
// POST /posts
router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authController.protectRoutes, postController.createPost);

router
  .route('/me')
  .get(
    authController.protectRoutes,
    userController.getMe,
    postController.userPosts
  );

router
  .route('/:id')
  .get(postController.getPost)
  .post(authController.protectRoutes, postController.createPost)
  .delete(authController.protectRoutes, postController.deletePost);

router
  .route('/like/:id')
  .post(authController.protectRoutes, postController.likePost);

router
  .route('/unlike/:id')
  .post(authController.protectRoutes, postController.unlikePost);

router
  .route('/update/:id')
  .patch(authController.protectRoutes, postController.updatePost);

module.exports = router;
