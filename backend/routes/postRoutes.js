const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = new express.Router({ mergeParams: true });

// POST /groups/632456jkh3456/posts
// POST /posts
router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    authController.protectRoutes,
    authController.restrictTo('user', 'admin'),
    postController.createPost
  );

router.route('/:id').get(postController.getPost);

module.exports = router;
