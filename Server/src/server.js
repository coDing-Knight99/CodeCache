import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(cors(
{    origin: 'https://code-cache-3w7tf1otk-dhruv-kanojias-projects.vercel.app',
    credentials: true,
}));
app.use(express.json());
app.use(urlencoded({ extended: true }));

import authrouter from './routes/auth.routes.js';

app.use('/users', authrouter);

import snippetrouter from './routes/snippet.routes.js';

app.use('/user/snippets', snippetrouter);

export default app;