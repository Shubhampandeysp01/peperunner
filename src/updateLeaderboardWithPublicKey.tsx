import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import axios from 'axios';

const API_URL = 'https://expressserver-kappa.vercel.app';
let wallet_address = "";
let tokenStored: string | null = null;
let tokenExpiryTime: number | null = null;
const username = "itsSecretGuessWhat7712";

const issueToken = async (username: string) => {
    try {
        const response = await axios.post(`${API_URL}/issue-token`, { username });
        const token = response.data.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        tokenExpiryTime = decodedToken.exp * 1000; // Store expiration time in milliseconds
        tokenStored = token;
        return token;
    } catch (error) {
        console.error('Error issuing token:', error);
        return null;
    }
};

const isTokenExpired = () => {
    if (!tokenExpiryTime) return true;
    return Date.now() >= tokenExpiryTime;
};

const getValidToken = async (username: string) => {
    if (!tokenStored || isTokenExpired()) {
        return await issueToken(username);
    }
    return tokenStored;
};

export const updateLeaderboardWithPublicKey = async ( score: number) => {
    try {
        if (!wallet_address) {
            console.log("Wallet not found:", wallet_address);
            return;
        }
        const token = await getValidToken(username);
        if (!token) {
            console.error('Token not available.');
            return;
        }
        await axios.post(`${API_URL}/update-leaderboard`, { wallet_address, score }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Leaderboard updated successfully');
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
};

export const getLeaderboard = async () => {
    try {
        const token = await getValidToken(username);
        if (!token) {
            console.error('Token not available.');
            return;
        }
        const response = await axios.get(`${API_URL}/leaderboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in getLeaderboard:', error);
    }
};

const MyComponent = () => {
    const { publicKey } = useWallet();
    // eslint-disable-next-line
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        if (publicKey) {
            wallet_address = publicKey.toBase58();
        }
    }, [publicKey]);

    const fetchLeaderboard = useCallback(async () => {
        const leaderboardData = await getLeaderboard();
        setLeaderboard(leaderboardData);
    }, []);

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
