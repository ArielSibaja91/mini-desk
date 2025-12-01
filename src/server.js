import { createServer } from "node:http";
import { query } from "./db/db.js";

const PORT = 3000;

const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify('Hello world'));
    } else if (req.url === '/users' && req.method === 'GET') {
        try {
            const result = await query('SELECT * FROM users');
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } catch (error) {
            console.error(error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Database error' }));
        }
    } else if (req.url === '/tickets' && req.method === 'GET') {
        try {
            const result = await query('SELECT * FROM tickets');
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } catch (error) {
            console.error(error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Database error' }));
        }
    } else if (req.url === '/comments' && req.method === 'GET') {
        try {
            const result = await query('SELECT * FROM comments');
            res.writeHead(200);
            res.end(JSON.stringify(result.rows));
        } catch (error) {
            console.error(error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Database error' }));
        }
    }
});

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});