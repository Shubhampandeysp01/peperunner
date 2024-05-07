/* eslint-env client */
'use client';

import { Canvas } from 'canvas';
import { DEFAULT_STATE, GlobalContext } from 'contexts/global';
import {Game} from 'game';
import React, { useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import MyApp from 'updateLeaderboardWithPublicKey';
import LeaderboardTable from 'LeaderboardTable';
import './App.css';


export const App: React.FC = () => {
  const [state, setState] = useState(DEFAULT_STATE.state);
  const {connected} = useWallet();

  


  function reducer(partial: Record<any, any>) {
    setState({ ...state, ...partial });
  }



  return (
    <>
      {/* Wallet button at top right */}
      <div className="absolute top-0 right-0 p-10">
        <WalletMultiButton/>
      </div>

      {/* Centered content */}
      <div className="flex justify-center items-center h-screen " style={{ marginTop: '20px' }}>
        <GlobalContext.Provider value={{ state, setState: reducer }}>
          <MyApp />
          {/* Render canvas and game if connected */}
          {connected && (
            <>
              <Canvas />
              <Game />
            </>
          )}
        </GlobalContext.Provider>
      </div>

      {/* Leaderboard table */}
      <LeaderboardTable />
    </>
  );
};
