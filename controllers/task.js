const { task, user, Sequelize : { Op } } = require('../models/index');

const baseController = require('./base')

class taskController extends baseController{
  constructor() {
    super();

  }

  async getAllTasks(req, res){

    let {score, assignees, status, name, assignees_field} = req.query;
    let query = {}

    if (score){
      query.score = {
        [Op.gte]: Number(score) || 0
      }
    }

    if (name){
      query.name = {
        [Op.substring]: name
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

    let response = await task.findAll({
      where: query
    })

    if (!response.length){
      return super.sendSuccess(res, [], "No task was gotten")
    }

    return super.sendSuccess(res, response, "Tasks Gotten")
  }

  async createTask(req, res){
    let { name = "", description = "", score = 0, status = "", userId, projectId} = req.body;

    if (!super.checkIfStatusValueIsValid(status)){
      return super.sendError(res, null, "Status is either active, inactive, declined or completed")
    }

    let toBeSentData = {name, status, description, userId, score, projectId}
    let instance = await task.create(toBeSentData)
    return super.sendSuccess(res, instance, "Task Created", 201)
  }

}

module.exports = new taskController();

