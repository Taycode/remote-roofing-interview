const { project, task, user, Sequelize : { Op } } = require('../models/index');

const baseController = require('./base')

class projectController extends baseController{
  constructor() {
    super();
  }

  async createProject(req, res){

    let { name = "", status = "", body = "", userId} = req.body;

    if (!super.checkIfStatusValueIsValid(status)){
      return super.sendError(res, null, "Status is either active, inactive, declined or completed")
    }

    let toBeSentData = {name, status, body, userId}
    return await project.create(toBeSentData)
      .then(instance=>{
        return super.sendSuccess(res, instance, "Project Created", 201)
      })
      .catch(
        err=>{
          return super.sendError(res, err, null, 400)
        }
      )

  }

  async getAllProjects(req, res){
    let tasks = await task.findAll();
    let {score, assignees, status, name, assignees_field, description, pagesize, page} = req.query;
    let query = {}

    if (name){
      query.name = {
        [Op.substring]: name
      }
    }

    if (description){
      query.description = {
        [Op.substring]: description
      }
    }

    if (status){

      if (!super.checkIfStatusValueIsValid(status)){
        return super.sendError(res, null, "Status is either active, inactive, declined or completed")
      }

      query.status = {
        [Op.or]: status.split(",")
      }
    }

    if (score){
      let projectToTask = {}
      let necessaryProjectIds = []
      tasks.forEach(element=>{
        if (projectToTask[element.projectId]){
          projectToTask[element.projectId].push(element)
        }
        else {
          projectToTask[element.projectId] = [element.score]
        }
      })
      Object.keys(projectToTask).forEach(key=>{
        if (Math.min(...projectToTask[key]) >= score){
          necessaryProjectIds.push(key)
        }
      })

      if (necessaryProjectIds.length){
        query.id = {
          [Op.or]: necessaryProjectIds
        }
      }
      else {
        query.id = {
          [Op.or]: [null]
        }
      }

    }

    if (assignees){
      assignees = assignees.split(",")

      let users, listOfUsersId = [];

      if (assignees_field === "surname"){
        users = await user.findAll({where:{surname : {[Op.or]: assignees}}})
      }
      else if (assignees_field === "name"){
        users = await user.findAll({where: {name: {[Op.or]: assignees}}})
      }
      else if (assignees_field === "id"){
        users = await user.findAll({where: {id: {[Op.or]: assignees}}})
      }

      if (users.length){
        users.forEach(element=>{
          listOfUsersId.push(element.id)
        })
        assignees = listOfUsersId
        query.userId = {
          [Op.or]: assignees
        }
      }

      else {
        query.userId = {
          [Op.or]: [null]
        }
      }

    }

    let projects = await project.findAll({
      where: query,
      limit: pagesize || null,
      offset: pagesize * (page - 1) || null,
    })
    let toBeSentData = {
      projects,
      page,
      pagesize
    }
  if (!projects.length){
    return super.sendError(res, null, "No Projects Returned", 200)
  }
    return super.sendSuccess(res, toBeSentData, "Projects Gotten", 200)
  }

}

module.exports = new projectController();
