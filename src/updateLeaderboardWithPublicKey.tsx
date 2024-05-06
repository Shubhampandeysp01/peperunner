import React, { useContext, useEffect } from 'react';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import pool from 'db';
import axios from 'axios';

let wallet_address = "";

export const updateLeaderboardWithPublicKey = async (score: number) => {
  try {
    const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    await axios.post(`${baseURL}/update-leaderboard`, { wallet_address, score });
    console.log('Leaderboard updated successfully');
} catch (error) {
    console.error('Error updating leaderboard:', error);
}
};

const MyComponent = () => {
  const {publicKey} = useWallet();

  useEffect(() => {
    if (publicKey) {
      wallet_address = publicKey.toBase58(); // Convert publicKey to string
    }
  }, [publicKey]);

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
