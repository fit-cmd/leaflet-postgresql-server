const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gisdb',
    password: 'lau356',
    port: 5432,
});

// Endpoint to get spatial data
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, ST_AsGeoJSON(geom) AS geom FROM your_table');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
