import express from 'express';
import { AppDataSource } from './database/data-source';
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected');
    app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
  })
  .catch((err) => console.error('❌ Error on Data Source:', err));
