import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

import authrouter from './routes/auth.routes.js';

app.use('/users', authrouter);

export default app;