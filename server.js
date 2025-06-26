// server.js

// Change these lines from require() to import
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const FREE_TO_GAME_API = 'https://www.freetogame.com/api/games';

// Use CORS middleware to allow requests from your frontend
app.use(cors());

app.get('/api/games', async (req, res) => {
    // Construct the URL for the FreeToGame API based on query parameters
    let apiUrl = FREE_TO_GAME_API;
    const params = [];

    // Note: req.query automatically parses query parameters
    if (req.query.category) params.push(`category=${encodeURIComponent(req.query.category)}`);
    if (req.query.platform) params.push(`platform=${req.query.platform}`);
    if (req.query['sort-by']) params.push(`sort-by=${req.query['sort-by']}`);

    if (params.length > 0) {
        apiUrl += '?' + params.join('&');
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from FreeToGame API:', error);
        res.status(500).json({ message: 'Failed to fetch games from external API.' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});