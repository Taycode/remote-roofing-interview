const { user, Sequelize : { Op } } = require('../models/index');

const baseController = require('./base')


class userController extends baseController{
  constructor() {
    super();
  }

  async getUsers(req, res){
    let {name, surname} = req.params
    let query = {}
    if (name){
      query.name = {
        [Op.substring]: name || ""
      }
    }
    if (surname){
      query.surname = {
        [Op.substring]: surname || ""
      }
    }
    let users = await user.findAll({
      where: query
    })

    return super.sendSuccess(res, users, 'Users Gotten', 200)

  }
}

module.exports = new userController();
