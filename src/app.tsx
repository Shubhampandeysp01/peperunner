/* eslint-env client */
'use client';

import { Canvas } from 'canvas';
import { DEFAULT_STATE, GlobalContext } from 'contexts/global';
import {Game} from 'game';
import React, { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import MyApp from 'updateLeaderboardWithPublicKey';
import LeaderboardTable from 'LeaderboardTable';
import StartPage from 'components/StartPage';
import { motion } from 'framer-motion';
import Rules from 'components/Rules';
import './App.css';


export const App: React.FC = () => {
  const [state, setState] = useState(DEFAULT_STATE.state);
  const [showStartPage, setShowStartPage] = useState(true);

  const handleStart = () => {
    // Handle start button click
    console.log('Start button clicked');
    setShowStartPage(false); // Hide the StartPage
  };


  function reducer(partial: Record<any, any>) {
    setState({ ...state, ...partial });
  }



  return (
    <>
    
      {showStartPage && <StartPage onStart={handleStart} />}
      { !showStartPage && (
      <>
      <motion.div
  className={`app-page`}
  initial={{ scale: 0, opacity: 0 }} // Start from scaled down and invisible
  animate={{ scale: 1, opacity: 1 }} // Pop-out and fade in
  exit={{ scale: 0, opacity: 0 }} // Scale down and fade out
  transition={{ duration: 0.5, ease: "easeInOut" }} // Shorter animation duration
> 

  <div className="absolute top-0 right-0 p-10">
          <WalletMultiButton />
        </div>
        
        <div className="flex justify-center items-center h-screen " style={{ marginTop: '20px', backgroundColor:'red' }}>
        
            <GlobalContext.Provider value={{ state, setState: reducer }}>
              <MyApp />
                <>
                  <Canvas />
                  <Game />
                </>
            </GlobalContext.Provider>
          </div>
          <div className="leaderboard-and-rules-container">
          
    <div className="leaderboard-container" style={{border:'5px solid white', borderRadius:'10px'}}>
      <div className="inner-container">
        <LeaderboardTable />
      </div>
    </div>
    <div className="rules-container">
    
      <div className="inner-container">
      
        <Rules />
      </div>
    </div>
  </div>
          
          </motion.div></>
        )}
    </>
  );
};