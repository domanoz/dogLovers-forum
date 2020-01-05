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

router
  .route('/:id')
  .delete(
    authController.protectRoutes,
    authController.restrictTo('admin', 'moderator'),
    commentController.deleteComment
  )
  .get(commentController.getComment);

router
  .route('/update/:id')
  .patch(authController.protectRoutes, commentController.updateComment);

module.exports = router;
