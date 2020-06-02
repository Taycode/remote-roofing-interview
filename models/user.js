module.exports = (sequelize, DataTypes)=>{
  const user = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    surname: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  })

  user.associate = (model)=>{
    user.hasMany(model.project, {
      as: 'Projects',
      foreignKey: 'userId'
    })
    user.hasMany(model.task, {
      as: 'Tasks',
      foreignKey: 'userId'
    })
  }
  return user
}
