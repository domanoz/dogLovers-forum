const express = require('express');
const groupController = require('./../controllers/groupController');
const authController = require('./../controllers/authController');

const router = new express.Router();

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(
    authController.protectRoutes,
    authController.restrictTo('admin'),
    groupController.createGroup
  );

router.route('/:id').get(groupController.getGroup);

module.exports = router;
