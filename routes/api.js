const { Router } = require('express');

const userController = require('../controllers/user');
const projectController = require('../controllers/project');
const taskController = require('../controllers/task');


const router = Router();

router.get('/user', userController.getUsers);
router.post('/user', userController.createUser);

router.post('/project', projectController.createProject);
router.get('/project', projectController.getAllProjects)

router.post('/task', taskController.createTask);
router.get('/task', taskController.getAllTasks)

module.exports = router
