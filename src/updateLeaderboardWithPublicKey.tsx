import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_URL = 'https://expressserver-kappa.vercel.app';
let wallet_address = "";
let tokenStored: string | null = null;
let tokenExpiryTime: number | null = null;
const username = "itsSecretGuessWhat7712";
const ENCRYPTION_KEY = '2e97978113af177038fe1bee8aa6db17b710cf3fe43ea287033c1b8ff059b6fe';

const IV_LENGTH = 16; // For AES, this is always 16 bytes

// const encryptToken = (token: string) => {
//     let iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
//     let encrypted = CryptoJS.AES.encrypt(token, CryptoJS.enc.Hex.parse(ENCRYPTION_KEY), {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return iv.toString() + ':' + encrypted.toString();
// };

const decryptToken = (encryptedToken: string) => {
    let parts = encryptedToken.split(':');
    let ivPart = parts.shift(); // This could be undefined
    if (!ivPart) {
        throw new Error("Invalid encrypted token format");
    }
    let iv = CryptoJS.enc.Hex.parse(ivPart);
    let encrypted = parts.join(':');
    let decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Hex.parse(ENCRYPTION_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

const issueToken = async (username: string) => {
    try {
        const response = await axios.post(`${API_URL}/issue-token`, { username });
        const encryptedToken = response.data.encryptedToken;
        const decryptedToken = decryptToken(encryptedToken);
        const decodedToken = JSON.parse(atob(decryptedToken.split('.')[1]));
        tokenExpiryTime = decodedToken.exp * 1000;
        tokenStored = encryptedToken;
        return decryptedToken; // Return the decrypted token
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
    return decryptToken(tokenStored);
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
