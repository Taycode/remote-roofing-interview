const { Router } = require('express');
const userController = require('../controllers/user')


const router = Router();

router.get('/user/getall', userController.getUsers);
router.post('/user/create', userController.createUser);


module.exports = router
