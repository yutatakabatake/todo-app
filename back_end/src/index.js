import express from 'express';
import cors from 'cors';
import taskRouter from './routes/taskRoute.js';
import projectRouter from './routes/projectRoute.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', taskRouter);
app.use('/api', projectRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})