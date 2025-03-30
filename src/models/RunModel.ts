import {Model, DataTypes, Optional } from 'sequelize'; 
import sequelize from '../config/sequelize';
import UserModel from './UserModel';

export interface RunAttributes {
  id: number;
  userId: number;
  survivor: string;
  survivors: string[];
  difficulty: string;
  artifacts : string[];
  duration: number;
  stageCount: number;
  items: string[];
  equipment: string[];
  kills: number;
  deaths: number;
  damageDealt: number;
  damageTaken: number;
  results: "win" | "loss" | "fateUnknown";
  deathReason?: string;
  seed: string;
  createdAt?: Date; 
}


export interface RunCreationAttributes extends Optional<RunAttributes,'id' | 'createdAt'> {}

class RunModel extends Model<RunAttributes, RunCreationAttributes> implements RunAttributes {

  declare id: number;
  declare userId: number;
  declare survivor: string;
  declare survivors: string[];
  declare difficulty: string;
  declare artifacts: string[];
  declare duration: number;
  declare stageCount: number;
  declare items: string[];
  declare equipment: string[];
  declare kills: number;
  declare deaths: number;
  declare damageDealt: number;
  declare damageTaken: number;
  declare results: "win" | "loss" | "fateUnknown";
  declare deathReason: string | undefined;
  declare seed: string;


}

RunModel.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  survivor: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  survivors: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  difficulty: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  artifacts : {
    type: DataTypes.JSON,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  stageCount: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  items : {
    type: DataTypes.JSON,
    allowNull: true,
  },
  equipment : {
    type: DataTypes.JSON,
    allowNull: true,
  },
  kills : {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  deaths : {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  }, 
  damageDealt : {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  damageTaken : {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  }, 
  results : {
    type: new DataTypes.STRING(128),
    allowNull: false
  }, 
  deathReason : {
      type : new DataTypes.STRING(128),
      allowNull : true 
  }, 
  seed : {
      type : new DataTypes.STRING(128),
      allowNull : false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'runs',
  modelName: 'RunModel',
  timestamps: true,
  sequelize
});

export default RunModel; 
