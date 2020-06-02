const { Router } = require('express');
const userController = require('../controllers/user');
const projectController = require('../controllers/project')


const router = Router();

router.get('/user/getall', userController.getUsers);
router.post('/user/create', userController.createUser);

router.post('/project/create', projectController.createProject);
router.get('/project/getall', projectController.getAllProjects)

module.exports = router
