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
import Logo from 'components/logo.png';
import Popup from 'components/Popup';
import './App.css';
import Button from 'react-bootstrap/Button';

const isNotPC = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Check for mobile devices
  if (/android/i.test(userAgent)) {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return true;
  }

  // Check for other non-PC devices (optional)
  if (/mobile/i.test(userAgent)) {
    return true;
  }

  return false;
};


export const App: React.FC = () => {
  const [state, setState] = useState(DEFAULT_STATE.state);
  const [showStartPage, setShowStartPage] = useState(true);
  const [showPopup, setShowPopup] = useState(isNotPC());

  const handleStart = () => {
    // Handle start button click
    console.log('Start button clicked');
    setShowStartPage(false); // Hide the StartPage
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  function reducer(partial: Record<any, any>) {
    setState({ ...state, ...partial });
  }

  const handlerefresh = () => {
    window.location.reload();
  };

  return (
    <>
    
      {showStartPage && <StartPage onStart={handleStart} />}
      { !showStartPage && (
      <>
      {showPopup && (
            <Popup
              message="Please use a PC to play the game."
              onClose={handleClosePopup}
            />
          )}
      <motion.div
  className={`app-page`}
  initial={{ scale: 0, opacity: 0 }} // Start from scaled down and invisible
  animate={{ scale: 1, opacity: 1 }} // Pop-out and fade in
  exit={{ scale: 0, opacity: 0 }} // Scale down and fade out
  transition={{ duration: 0.5, ease: "easeInOut" }} // Shorter animation duration
> 
<div className="logo-container">
              <img src={Logo} alt="Logo" className="logo" />
            </div>

  <div className="absolute top-0 right-0 p-10">
          <WalletMultiButton />
        </div>
        
        <div className="flex justify-center items-center h-screen " style={{ marginTop: '20px', backgroundColor:'black' }}>
        
            <GlobalContext.Provider value={{ state, setState: reducer }}>
              <MyApp />
                <>
                  <Canvas />
                  <Game />
                </>
            </GlobalContext.Provider>
          </div>
          <Button variant="primary" size="lg" style={{marginLeft:'8px' , backgroundColor: '#28a9c8', }} onClick={handlerefresh}>
          Home
        </Button>{' '}
    <div className="leaderboard-container" style={{border:'5px solid white', borderRadius:'10px'}}>
      <div className="inner-container">
        <LeaderboardTable />
      </div>
    </div>
          
          </motion.div></>
        )}
    </>
  );
};