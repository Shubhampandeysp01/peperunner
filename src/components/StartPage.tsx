import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import Navbar from './Navbar';
import pepeposter from './pepeposter.jpg';

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [transitionClass, setTransitionClass] = useState('');
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    tokenomics: useRef<HTMLDivElement>(null),
    howto: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleClick = () => {
      setTransitionClass('transition-effect');
      onStart();
    };


    return () => {
    };
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = sectionRefs.tokenomics.current;
    if (container) {
      const scrollAmount = 300; // Adjust as needed
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className='start-page'>
      <Navbar scrollToRef={scrollToRef} homeRef={sectionRefs.home} tokenomicsRef={sectionRefs.tokenomics} howtoRef={sectionRefs.howto} />
      <div ref={sectionRefs.home} className='section home-section' style={{ marginTop: '100px' }}>
        <img src={pepeposter} alt="Home" className='home-image' />
        <button className='home-button' onClick={onStart}>Play Game</button>
      </div>
      <div ref={sectionRefs.tokenomics} className='section tokenomics-section'>
        <h1>Presale</h1>
        <h2>Instructions</h2>
        <p>To join the presale, connect your wallet by clicking the "Connect" button on the top right

Then click the deposit button below to deposit 0.05 ETH to our presale contract

When the claim phase is announced, click the claim button below to get your PEPEGAME tokens

The game launches after the presale ends</p> 
<div className='tokenomics-carousel'>
          <div className='tokenomics-item'>35% Presale</div>
          <div className='tokenomics-item'>35% Liquidity Pool</div>
          <div className='tokenomics-item'>20% Game</div>
          <div className='tokenomics-item'>2.5% Team</div>
          <div className='tokenomics-item'>2.5% Advisors</div>
          <div className='tokenomics-item'>5% Marketing, Giveaways, Exchange Listing</div>
        </div>
        <div className='carousel-controls'>
          <button onClick={() => handleScroll('left')}>Left</button>
          <button onClick={() => handleScroll('right')}>Right</button>
        </div>
      </div>
      <div ref={sectionRefs.howto} className='section howto-section'>
        <h1>How to Play</h1>
        <ul>
          <li>Step 1: Do this</li>
          <li>Step 2: Do that</li>
          <li>Step 3: Win!</li>
        </ul>
      </div>
    </div>
  );
};

export default StartPage;