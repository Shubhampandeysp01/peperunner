/* eslint-env client */
'use client';

import { Canvas } from 'canvas';
import { DEFAULT_STATE, GlobalContext } from 'contexts/global';
import {Game} from 'game';
import React, { useState } from 'react';
import { AppWalletProvider } from 'components/AppWalletProvider';
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const App: React.FC = () => {
  const [state, setState] = useState(DEFAULT_STATE.state);
  const {publicKey, connected} = useWallet();
  console.log(connected);
  function reducer(partial: Record<any, any>) {
    setState({ ...state, ...partial });
  }

  return (
    <React.StrictMode>
      <div className="absolute w-fit h-fit top-0 right-0 p-10">
        <WalletMultiButton/>
      </div>
      <GlobalContext.Provider value={{ state, setState: reducer }}>
      {connected && (
        <>
        <Canvas />
        <Game />
        </>
      )}
      </GlobalContext.Provider>
    </React.StrictMode>
  );
};
