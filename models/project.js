module.exports = (sequelize, DataTypes)=>{
  const project = sequelize.define('project', {
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
    body: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  })

  project.associate = (model)=>{
    project.belongsTo(model.user, {
      foreignKey: 'userId', targetKey: 'id'
    })
    project.hasMany(model.task, {
      foreignKey: 'projectId', as: 'Projects'
    })
  }
  return project
}
