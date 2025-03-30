import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  
// Create a new instance of sequelize
if (!process.env.DB || !process.env.DB_PASSWORD) {
  throw new Error('Missing DB environment variable');
}

const sequelize = new Sequelize( process.env.DB , 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    charset: 'utf8mb4',
  }
});

export default sequelize;

