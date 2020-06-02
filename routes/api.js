const { Router } = require('express');
const userController = require('../controllers/users')


const router = Router();

router.get('/users', userController.getUsers);


module.exports = router
