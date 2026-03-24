import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import userRouter from './routes/userRoutes.js';
import paperRouter from './routes/paperRoutes.js';

const app = express();

app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/papers', paperRouter);

export default app;
