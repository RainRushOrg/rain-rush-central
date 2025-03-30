import sequelize from "../config/sequelize";
import UserModel from "../models/UserModel";
import RunModel from "../models/RunModel";


const init = async () => {
  UserModel.hasMany(RunModel, {foreignKey: 'userId', as: 'runs'});
  RunModel.belongsTo(UserModel, {foreignKey: 'userId', as: 'user'});
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      return sequelize.sync({force: false, alter: true});
    })
    .then(() => {
      console.log("All models were synchronized successfully.");
    })
    .catch((err: Error) => {
      console.error("Unable to connect to the database:", err as Error);
    });
}

export const sequelizeConnection = {
  init,
  UserModel,
  RunModel,
}
