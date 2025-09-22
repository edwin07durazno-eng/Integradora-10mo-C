import express, { json } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employee';
import sequelize from './config/database';
import User from './models/User';
import Employee from './models/employee';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(json());
app.use('/api/auth', authRoutes);
app.use('/api', employeeRoutes);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');
        await User.sync({ force: false });
        console.log('Modelo de usuario sincronizado.');
        await Employee.sync({ force: false });
        console.log('Modelo Employee sincronizado.');

        // Opcional: crea un usuario si no existe
        const existingUser = await User.findOne({ where: { username: 'admin' } });
        if (!existingUser) {
            await User.create({ username: 'admin', password: '123456' });
            console.log('Usuario de prueba "admin" creado.');
        }

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

connectDB();