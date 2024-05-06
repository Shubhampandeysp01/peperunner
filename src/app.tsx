/* eslint-env client */
'use client';

import { Canvas } from 'canvas';
import { DEFAULT_STATE, GlobalContext } from 'contexts/global';
import {Game} from 'game';
import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import MyApp from 'updateLeaderboardWithPublicKey';

export const App: React.FC = () => {
  const [state, setState] = useState(DEFAULT_STATE.state);
  const {connected} = useWallet();

  


  function reducer(partial: Record<any, any>) {
    setState({ ...state, ...partial });
  }



  return (
    <>
      <div className="absolute w-fit h-fit top-0 right-0 p-10">
        <WalletMultiButton/>
      </div>
      <GlobalContext.Provider value={{ state, setState: reducer }}>
      <MyApp/>
      {connected && (
        <>
        <Canvas />
        <Game />
        </>
      )}
      </GlobalContext.Provider>
    </>
  );
};
