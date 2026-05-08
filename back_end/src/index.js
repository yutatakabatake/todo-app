import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import taskRouter from './routes/taskRoute.js';
import projectRouter from './routes/projectRoute.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use('/api', taskRouter);
app.use('/api', projectRouter)

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})