import React, { useEffect, useState } from 'react';
import '../App.css';
import pepeposter from './pepeposter.jpg';


interface StartPageProps {
  onStart: () => void; // Callback function to handle start button click
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transitionClass, setTransitionClass] = useState('');

  useEffect(() => {
    const handleClick = () => {
        setTransitionClass('transition-effect');
      onStart();
      
    };

    // Attach click event listener to the document
    document.addEventListener('click', handleClick);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onStart]);

  return (
    <div className={`start-page`}>
      {/* Replace the text with the image */}
      <img 
        src={pepeposter} 
        alt="Poster" 
        onClick={onStart} 
        style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default  StartPage;
