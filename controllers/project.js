const { project, Sequelize : { Op } } = require('../models/index');

const baseController = require('./base')

class projectController extends baseController{
  constructor() {
    super();
  }

  async createProject(req, res){
    let { name = "", status = "", body = "", userId} = req.body;
    let toBeSentData = {name, status, body, userId}
    let instance = await project.create(toBeSentData)
    return super.sendSuccess(res, instance, "Project Created", 201)
  }

  async getAllProjects(req, res){
    let projects = await project.findAll()
    return super.sendSuccess(res, projects, "Projects Gotten", 200)
  }

}

module.exports = new projectController();
