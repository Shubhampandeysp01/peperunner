import React, { useContext, useEffect } from 'react';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

let storedPublicKey = "";

export const updateLeaderboardWithPublicKey = (score: number) => {
  if (storedPublicKey) {
    console.log("Public Key:", storedPublicKey);
    console.log("Score:", score);
  } 
};

const MyComponent = () => {
  const {publicKey} = useWallet();

  useEffect(() => {
    if (publicKey) {
      storedPublicKey = publicKey.toBase58(); // Convert publicKey to string
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
