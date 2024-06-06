// import  {  useEffect } from 'react';
// import { useWallet } from "@solana/wallet-adapter-react";
// import axios from 'axios';

// let wallet_address = "";
// // const API_URL = process.env.REACT_APP_BACKEND_URL;
// const API_URL = 'https://expressserver-tau.vercel.app';

// export const updateLeaderboardWithPublicKey = async (score: number) => {
//   try {
//     if (!wallet_address) 
//       {
//         console.log("Wallet not found: " + wallet_address)
//         return;
//       }
//     await axios.post(`${API_URL}/update-leaderboard`, { wallet_address, score }, {
//       headers: {
//         Authorization: token
//       }
//     });
//     console.log('Leaderboard updated successfully');
// } catch (error) {
//     console.error('Error updating leaderboard: ', error);
// }
// };

// export const getleaderboard = async() => {
//   try{
//     const response = await axios.get(`${API_URL}/leaderboard`, {
//       headers: {
//         Authorization: token
//       }
//     });
//     return response.data;
//   } catch (error){
//     console.error('Error in getLeaderboard: ',error );
//   }
// }

// const MyComponent = () => {
//   const {publicKey} = useWallet();

//   useEffect(() => {
//     if (publicKey) {
//       wallet_address = publicKey.toBase58(); 
//     }
//   }, [publicKey]);

//   return null; 
// };

// const MyApp = () => {
//   return (
//     <div>
//       <MyComponent />
//     </div>
//   );
// };

// export default MyApp;
