module.exports = (sequelize, DataTypes)=>{
  const task = sequelize.define('task', {
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
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    score: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    projectId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: 'project',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true
  })

  task.associate = (model)=>{
    task.belongsTo(model.user, {
      foreignKey: 'userId',
      targetKey: 'id'
    })
    task.belongsTo(model.project, {
      foreignKey: 'projectId',
      targetKey: 'id'
    })
  }
  return task
}
