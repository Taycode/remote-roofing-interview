const { user, Sequelize : { Op } } = require('../models/index');

const baseController = require('./base')


class userController extends baseController{
  constructor() {
    super();
  }

  async getUsers(req, res){
    let {name, surname, pagesize, page} = req.params
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
      limit: pagesize || 0,
      offset: page * pagesize || 0,
      where: query
    })

    let toBeSentData = {
      users,
      page,
      pagesize
    }

    return super.sendSuccess(res, toBeSentData, 'Users Gotten', 200)

  }
}

module.exports = new userController();
