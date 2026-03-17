const express = require('express');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/tasks', (req, res) => {
    pool.query('SELECT task_id, task_name, done FROM tasks', (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})