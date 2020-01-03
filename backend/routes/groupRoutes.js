const express = require('express');
const groupController = require('./../controllers/groupController');
const authController = require('./../controllers/authController');
const postRouter = require('./postRoutes');

const router = new express.Router();

router.use('/:groupId/posts', postRouter);

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(
    authController.protectRoutes,
    authController.restrictTo('admin'),
    groupController.createGroup
  );

router.route('/members').get(groupController.getMembers);
router.route('/:id').get(groupController.getGroup);

module.exports = router;
