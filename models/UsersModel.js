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
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        }
      }
    );
  
    return Users;
  };
