import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DATABASE as string,
  username: 'postgres',
  password: process.env.PASSWORD as string,
  host: process.env.HOST as string,
  dialect: 'postgres',
  logging: false, // Disable logging altogether
});

export default sequelize;
