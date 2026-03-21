import express from 'express';
import cors from 'cors';
import pool from './db.js';
import router from './routes/taskRoute.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})