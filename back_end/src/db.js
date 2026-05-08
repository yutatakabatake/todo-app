import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // 環境変数から読み込む
    ssl: {
        rejectUnauthorized: false // RenderのDB接続には通常これが必要です
    }
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

const query = async (text, params) => await pool.query(text, params);
export default query;