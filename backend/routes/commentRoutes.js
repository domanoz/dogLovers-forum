const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');

const router = new express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protectRoutes,
    authController.restrictTo('user', 'admin'),
    commentController.createComment
  );

module.exports = router;
