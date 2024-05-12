import  {  useEffect } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import axios from 'axios';

let wallet_address = "";
const baseURL = process.env.REACT_APP_BACKEND_URL;
// const token = process.env.MY_TOKEN;
const token = 'f5fe1eb260830b9550e155c9fde4f088c3e893d4133b717d17f41274769369950c307053c4b9d28746be6889e307cb63da9c87f314a73d2284f359ad26c34f21';
// const baseURL = 'http://localhost:9001';

export const updateLeaderboardWithPublicKey = async (score: number) => {
  try {
    await axios.post(`${baseURL}/update-leaderboard`, { wallet_address, score }, {
      headers: {
        Authorization: token
      }
    });
    console.log('Leaderboard updated successfully');
} catch (error) {
    console.error('Error updating leaderboard: ', error);
}
};

export const getleaderboard = async() => {
  try{
    const response = await axios.get(`${baseURL}/leaderboard`, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error){
    console.error('Error in getLeaderboard: ',error );
  }
}

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
