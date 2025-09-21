import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'api',
    process.env.DB_USER || 'admin',
    process.env.DB_PASSWORD || 'Password123',
    {
        host: process.env.DB_HOST || 'db',
        dialect: 'mysql',
        logging: false,
    }
);

export default sequelize;