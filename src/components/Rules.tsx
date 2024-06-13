import React from 'react';
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import Divider from '@mui/material/Divider';

import '../App.css';

const Rules: React.FC = () => {
  return (
    <div className="rules-container">
    <h2 style={{textAlign:'center', color: 'white'}}>RULES AND INFO</h2>
    <ul className="text-center" style={{ color: 'white' }}>
        <li>You can also use the shortcuts 'W', 'A','D','Space' instead of arrow keys to play.</li>
        <Divider aria-hidden="true" />
        <li>You can play the game without connecting a wallet. However, you must connect a wallet to upload your score for the leaderboards.</li>
        <Divider aria-hidden="true" />
        <li>Top 25 players every week will receive tokens as a reward. CA: ...............................</li>
        <Divider aria-hidden="true" />
        <li>Any cheating or exploiting will result in your score being wiped from the leaderboards.</li>
        <Divider aria-hidden="true" />
        <li>Check out our Socials below.</li>
      </ul>
    <div className="social-icons" style={{textAlign:'center'}}>
    <IconButton href="https://peperunner.gitbook.io/peperunner" target="_blank">
          <GitHubIcon htmlColor='#1345bb'/>
        </IconButton>
        <IconButton href="https://x.com/PEPE_Runner_exe?mx=2" target="_blank">
          <XIcon htmlColor='#1345bb' />
        </IconButton>
        <IconButton href=" https://t.me/PEPE_RUNNER" target="_blank">
          <TelegramIcon htmlColor='#1345bb' />
        </IconButton>
      </div>
    </div>
  );
};

export default Rules;
