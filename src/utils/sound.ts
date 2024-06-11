import { KaboomCtx } from 'kaboom';

export enum Sounds {
  Jump = 'jump',
  MusicTheme = 'music-theme',
  Coin = 'coin',
  Death = 'death',
}

export class Sound {
  private readonly k: KaboomCtx;

  constructor(k: KaboomCtx) {
    this.k = k;
  }

  loadSounds(): void {
    this.k.loadSound(Sounds.Jump, './sounds/jump.ogg');
    this.k.loadSound(Sounds.MusicTheme, './sounds/theme-music.ogg');
    this.k.loadSound(Sounds.Coin, './sounds/coin.ogg');
    this.k.loadSound(Sounds.Death, './sounds/death.ogg');
  }
}
