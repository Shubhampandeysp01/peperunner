// UpdateLeaderboardWithPublicKey.tsx

import { useWallet } from '@solana/wallet-adapter-react';

export const updateLeaderboardWithPublicKey = (score: number) => {
  const { publicKey } = useWallet();

  console.log("Score:", score);

  if (publicKey) {
    const publicKeyString = publicKey.toBase58();
    console.log('Public Key:', publicKeyString);
  }
};