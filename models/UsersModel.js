module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
      "user",
      {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        username: {
          type: DataTypes.STRING,
        }
      }
    );
  
    return Users;
  };