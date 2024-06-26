import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import Navbar from './Navbar';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chrono } from 'react-chrono';
import gameinitial from './gameinit.png';
import gamebg from './gamebg.png';
import pepeicon from './pepeicon.png';
import enemies from './enemies.png'
 import score from './score.png';


interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {

  const roadmapItems = [
    {
      title: "June 2024",
      cardTitle: "Initial Release",
      cardSubtitle: "Launch of the game",
      cardDetailedText: "Initial release of the game with basic features and functionalities. Step into the wild world of Pepe Runner, where every hop, skip, and jump is a meme-filled adventure!",
      media: {
        type: "IMAGE",
        source: {
          url: gameinitial,
        },
      },
    },
    {
      title: "July 2024",
      cardTitle: "New Levels",
      cardSubtitle: "Expansion of game content",
      cardDetailedText: "Add new levels and challenges to keep the gameplay engaging. We are diligently working on introducing new enemies and levels to elevate the gaming experience.",
      media: {
        type: "IMAGE",
        source: {
          url: enemies,
        },
      },
    },
    {
      title: "August 2024",
      cardTitle: "Multiplayer Mode",
      cardSubtitle: "Enhancement of game features",
      cardDetailedText: "Introduce multiplayer mode to allow players to compete against each other in real-time. This update will bring a thrilling new dimension to the game by enabling real-time player competition.",
      media: {
        type: "IMAGE",
        source: {
          url: score,
        },
      },
    }
  ];
  

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transitionClass, setTransitionClass] = useState('');
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    tokenomics: useRef<HTMLDivElement>(null),
    howto: useRef<HTMLDivElement>(null),
    roadmap: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClick = () => {
      setTransitionClass('transition-effect');
      onStart();
    };

    return () => {
    };
  }, [onStart]);

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      
    }
  };

  

  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % roadmapItems.length);
    }, 10000);
  
    return () => clearInterval(interval);
  }, [roadmapItems.length]); 
  

  
  

  return (
    <div className='start-page'>
      <Navbar scrollToRef={scrollToRef} homeRef={sectionRefs.home} tokenomicsRef={sectionRefs.tokenomics} howtoRef={sectionRefs.howto} roadmapRef={sectionRefs.roadmap} />
      
      <div ref={sectionRefs.home} className='section home-section' style={{backgroundImage: `url(${gamebg})`}}>
      <div className='home-content'>
          <div className='text pepe-text'>Pepe</div>
          <img src={pepeicon} alt="Pepe Icon" className='pepe-icon' />
          <div className='text runner-text'>Runner</div>
        </div>
        <button className='home-button' onClick={onStart}>Play Game</button>
      </div>
      <div ref={sectionRefs.tokenomics} className='section tokenomics-section'>
  <h1>Tokenomics</h1>

  <Carousel indicators={false} interval={null}>
          <Carousel.Item>
            <div className="d-flex justify-content-around carousel-item-container">
              <div className="carousel-item-content">
                <div className="percentage">5%</div>
                <div className="label">Game, Airdrops, Giveaways</div>
              </div>
              <div className="carousel-item-content">
                <div className="percentage">80%</div>
                <div className="label">Liquidity Pool</div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-around carousel-item-container">
              <div className="carousel-item-content">
                <div className="percentage">5%</div>
                <div className="label">Team</div>
              </div>
              <div className="carousel-item-content">
                <div className="percentage">10%</div>
                <div className="label">Liquidity Providers</div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
 
</div>
<div ref={sectionRefs.howto} className={`section howto-section`}>
        <h1>How to Play</h1>
        <ul>
          <li>You can also use the shortcuts 'W', 'A','D','Space' instead of arrow keys to play.</li>
          <li>You can play the game without connecting a wallet. However, you must connect a wallet to upload your score for the leaderboards.</li>
          <li>Top 25 players every week will receive tokens as a reward. CA: 4X9bwAkoHQL3ftD4iYsarMACKvU2r8jpZjWzoS75pCYj </li>
          <li>Any cheating or exploiting will result in your score being wiped from the leaderboards.</li>
        </ul>
      </div>

      <div style={{ width: "100%", height: "95vh",  }} ref={sectionRefs.roadmap} className="section roadmap-section">
      <h1>Roadmap</h1>
      <Chrono
        items={roadmapItems}
        enableBreakPoint
        verticalBreakPoint={500}
        mode="VERTICAL_ALTERNATING"
        activeItemIndex={activeItem}
        scrollable={{ scrollbar: true }}
        mediaSettings={{ align: 'right', fit: 'contain'}}
      />
 </div>
    </div>
  );
};

export default StartPage;