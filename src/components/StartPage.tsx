import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import Navbar from './Navbar';
import pepeposter from './pepe.png';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chrono } from 'react-chrono';

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
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

  const [howToVisible, setHowToVisible] = useState(false);

  useEffect(() => {
    const howToSection = sectionRefs.howto.current;
    if (howToSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHowToVisible(true);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(howToSection);

      return () => {
        observer.unobserve(howToSection);
      };
    }
  }, [sectionRefs.howto]);

  const roadmapItems = [
    {
      title: "Q1 2024",
      cardTitle: "Initial Release",
      cardSubtitle: "Launch of the game",
      cardDetailedText: "Initial release of the game with basic features and functionalities.",
      media: {
        type: "IMAGE",
        source: {
          url: "https://picsum.photos/id/1018/1000",
        },
      },
    },
    {
      title: "Q2 2024",
      cardTitle: "Leaderboard Feature",
      cardSubtitle: "Integration of leaderboards",
      cardDetailedText: "Introduce leaderboards to track top players and reward them accordingly.",
      media: {
        type: "IMAGE",
        source: {
          url: "https://picsum.photos/id/1018/1000",
        },
      },
    },
    {
      title: "Q3 2024",
      cardTitle: "New Levels",
      cardSubtitle: "Expansion of game content",
      cardDetailedText: "Add new levels and challenges to keep the gameplay engaging.",
      media: {
        type: "IMAGE",
        source: {
          url: "https://picsum.photos/id/1018/1000",
        },
      },
    },
    {
      title: "Q4 2024",
      cardTitle: "Multiplayer Mode",
      cardSubtitle: "Enhancement of game features",
      cardDetailedText: "Introduce multiplayer mode to allow players to compete against each other in real-time.",
      media: {
        type: "IMAGE",
        source: {
          url: "https://picsum.photos/id/1018/1000",
        },
      },
    }
  ];
  

  return (
    <div className='start-page'>
      <Navbar scrollToRef={scrollToRef} homeRef={sectionRefs.home} tokenomicsRef={sectionRefs.tokenomics} howtoRef={sectionRefs.howto} roadmapRef={sectionRefs.roadmap} />
      <div ref={sectionRefs.home} className='section home-section' style={{ marginTop: '100px' }}>
        <img src={pepeposter} alt="Home" className='home-image' />
        <button className='home-button' onClick={onStart}>Play Game</button>
      </div>
      <div ref={sectionRefs.tokenomics} className='section tokenomics-section'>
  <h1>Presale</h1>
  <h2>Instructions</h2>
  <p>
    To join the presale, connect your wallet by clicking the "Connect"
    button on the top right Then click the deposit button below to deposit
    0.05 ETH to our presale contract When the claim phase is announced,
    click the claim button below to get your PEPEGAME tokens The game
    launches after the presale ends
  </p>

  <Carousel indicators={false} interval={null}>
          <Carousel.Item>
            <div className="d-flex justify-content-around carousel-item-container">
              <div className="carousel-item-content">
                <div className="percentage">35%</div>
                <div className="label">Presale</div>
              </div>
              <div className="carousel-item-content">
                <div className="percentage">35%</div>
                <div className="label">Liquidity Pool</div>
              </div>
              <div className="carousel-item-content">
                <div className="percentage">20%</div>
                <div className="label">Game</div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-around carousel-item-container">
              <div className="carousel-item-content">
                <div className="percentage">2.5%</div>
                <div className="label">Team</div>
              </div>
              <div className="carousel-item-content">
                <div className="percentage">2.5%</div>
                <div className="label">Advisors</div>
              </div>
              <div className="carousel-item-content">
                <div className="percentage">5%</div>
                <div className="label">Marketing, Giveaways, Exchange Listing</div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
 
</div>
<div ref={sectionRefs.howto} className={`section howto-section ${howToVisible ? 'fade-in show' : 'fade-in'}`}>
        <h1>How to Play</h1>
        <ul>
          <li>You can also use the shortcuts 'W', 'A','D','Space' instead of arrow keys to play.</li>
          <li>You can play the game without connecting a wallet. However, you must connect a wallet to upload your score for the leaderboards.</li>
          <li>Top 25 players every week will receive tokens as a reward. CA: FLAPi65LhuToCpUkg26dzmrDrNcpHuQhxCqJWsHxUpyq</li>
          <li>Any cheating or exploiting will result in your score being wiped from the leaderboards.</li>
        </ul>
      </div>

      <div ref={sectionRefs.roadmap} className="section roadmap-section">
        <h1>Roadmap</h1>
        <Chrono items={roadmapItems} mode="VERTICAL_ALTERNATING"    slideItemDuration={4500} slideShowType="slide_from_sides" slideshow   />
      </div>
    </div>
  );
};

export default StartPage;