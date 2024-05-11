const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());






app.use(cors());
const connectionString = process.env.CONNECTION_STRING;

// Create a pool
const pool = new Pool({
    connectionString: connectionString,
});



app.post('/update-leaderboard', async (req, res) => {
    try {
        console.log("sjs");
        console.log('Received request to update leaderboard:', req.body);
        const { wallet_address, score } = req.body;

        const query = `
            SELECT score FROM solana_wallets 
            ORDER BY score DESC
            LIMIT 25 OFFSET 24;
        `;

        const result = await pool.query(query);

        // Check if there are already 25 scores
        if (result.rows.length === 25) {
            const lowestScore = result.rows[0].score;

            // Check if the new score is higher than the lowest score
            if (score > lowestScore) {
                // Insert new score
                await pool.query(`
                    INSERT INTO solana_wallets (wallet_address, score) 
                    VALUES ($1, $2)
                    ON CONFLICT (wallet_address) DO UPDATE 
                    SET score = EXCLUDED.score
                    WHERE EXCLUDED.score > solana_wallets.score;
                `, [wallet_address, score]);

                // Remove lowest score
                await pool.query(`
                    DELETE FROM solana_wallets 
                    WHERE score = $1;
                `, [lowestScore]);

                res.status(200).json({ success: true });
            } else {
                res.status(200).json({ success: false, message: "Score is not higher than the lowest score in top 25. Score not updated." });
            }
        } else {
            // Insert new score if there are less than 25 scores
            await pool.query(`
                INSERT INTO solana_wallets (wallet_address, score) 
                VALUES ($1, $2)
                ON CONFLICT (wallet_address) DO UPDATE 
                SET score = EXCLUDED.score
                WHERE EXCLUDED.score > solana_wallets.score;
            `, [wallet_address, score]);

            res.status(200).json({ success: true });}
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/leaderboard', async (req, res) => {
    try {
        console.log("Connection: "+connectionString)
        onsole.log('Base URL:', req.baseUrl);
        
        // Log full request URL
        console.log('Full Request URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
        
        // Log query parameters if any
        console.log('Query Parameters:', req.query);

        // Log received request for leaderboard
        console.log('Received request for leaderboard');

        const query = `
            SELECT wallet_address, score FROM solana_wallets 
            ORDER BY score DESC
            LIMIT 25;
        `;
        
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



app.listen(3000, () => console.log("Server ready on port 3000."));


