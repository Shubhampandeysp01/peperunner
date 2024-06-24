import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { createClient } from '@vercel/postgres';


let public_key = "";
const client = createClient({
    connectionString: process.env.POSTGRES_URL,
});

interface LeaderboardEntry {
    wallet_address: string;
    score: number;
}

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
    try {
        const queryString = `SELECT wallet_address, score FROM solana_wallets;`;
        const { rows } = await client.query(queryString);
        console.log('Wallets:', rows);
        return rows.map((row: any) => ({
            wallet_address: row.wallet_address,
            score: row.score,
        }));
    } catch (error) {
        console.error('Error fetching wallets:', error);
        throw error;
    }
};
export const updateLeaderboardWithPublicKey = async (score: number) => {
    try {
        const leaderboardQuery = await client.query(`SELECT id, wallet_address, score FROM solana_wallets ORDER BY score DESC LIMIT 25;`);
        const currentLeaderboard = leaderboardQuery.rows as any[];

        if (currentLeaderboard.length < 25 || score > (currentLeaderboard[currentLeaderboard.length - 1]?.score ?? -Infinity)) {
            
            const existingEntryIndex = currentLeaderboard.findIndex(entry => entry.wallet_address === public_key);
            
            if (existingEntryIndex !== -1) {
                if (score > currentLeaderboard[existingEntryIndex].score) {
                    await client.query(`UPDATE solana_wallets SET score = ${score} WHERE id = ${currentLeaderboard[existingEntryIndex].id};`);
                }
            } else {
                await client.query(`INSERT INTO solana_wallets (wallet_address, score) VALUES (${public_key}, ${score});`);
                if (currentLeaderboard.length >= 25) {
                    await client.query(`DELETE FROM solana_wallets WHERE id = ${currentLeaderboard[currentLeaderboard.length - 1].id};`);
                }
            }
        }
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        throw error;
    }
};


const MyComponent = () => {
    const { publicKey } = useWallet();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [leaderboard, setLeaderboard] = useState<{ wallet_address: string; score: number; }[]>([]);

    const fetchLeaderboard = useCallback(async () => {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
    }, []);

    useEffect(() => {
        if (publicKey) {
            public_key = publicKey.toBase58();
        }
    }, [publicKey]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard, publicKey]);

    return null;
};

const MyApp = () => {
    return (
        <div>
            <MyComponent />
        </div>
    );
};

export default MyApp;
