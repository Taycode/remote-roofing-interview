const { user, Sequelize : { Op } } = require('../models/index');

const baseController = require('./base')


class userController extends baseController{
  constructor() {
    super();
  }

  async getUsers(req, res){
    let {name, surname, pagesize, page} = req.query
    let query = {}

    if (name){
      query.name = {
        [Op.substring]: name
      }
    }

    if (surname){
      query.surname = {
        [Op.substring]: surname
      }
    }

    let users = await user.findAll({
      limit: pagesize || null,
      offset: page * pagesize || null,
      where: query
    })

    let toBeSentData = {
      users,
      page,
      pagesize
    }

    return super.sendSuccess(res, toBeSentData, 'Users Gotten', 200)
  }

  async createUser(req, res){
    let { name = "", email = "", surname = ""} = req.body;
    let toBeSentData = {name, email, surname}
    let instance = await user.create(toBeSentData)
    return super.sendSuccess(res, instance, "User Created", 201)
  }
}

module.exports = new userController();
