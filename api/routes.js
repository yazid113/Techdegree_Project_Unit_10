'use strict';

const express = require('express');
const httpError = require('http-errors');
const { asyncHandler } = require('./middleware/async-handler');
const { User } = require('./models');
const { Course } = require('./models');
const { authenticateUser } = require('./middleware/auth-user');

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users',authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    });
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// Route that returns a list of courses with users taking it.
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include: [{model: User,attributes: ['firstName', 'lastName', 'emailAddress']}
        ]
    });
    res.status(200).json(courses);
  }));

// Route that returns a course.
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{model: User,attributes: ['firstName', 'lastName', 'emailAddress']}
        ]
    });

    if (course) {
        res.status(200).json({course})
    } else {
        res.status(404).json({ message: "Course Not Found" });
    }
  }));

// Route that creates a new course.
router.post('/courses',authenticateUser, asyncHandler(async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).location(`/api/courses/${course.id}`).end();
    } catch (error) {
        console.log('ERROR: ', error.name);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
  }));


// Route that update a specific course.
router.put('/courses/:id',authenticateUser, asyncHandler(async (req, res,next) => {
    try{
        const user = req.currentUser;
        const course = await Course.findByPk(req.params.id);
        if (course && course.userId === user.id) {
            await course.update(req.body);
            res.status(204).end();
        } else {
            res.status(403).json({ message: "Access Denied this course is not yours." });
            next(err);
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        } 
    }
  }));

// Route that delete the selected course.
router.delete('/courses/:id', authenticateUser, asyncHandler( async(req, res, next) => {
    const user = req.currentUser;
    const course = await Course.findByPk(req.params.id);
        if (course && course.userId === user.id) {
            await course.destroy();
            res.status(204).end();
        } else {
            const err = httpError(403, "Access Denied this course is not yours.");
            next(err);
        }
}));

module.exports = router;