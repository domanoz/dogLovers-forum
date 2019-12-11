const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');

const router = new express.Router();

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
