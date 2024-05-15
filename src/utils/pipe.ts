import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class Pipe {
  public static Sprite = 'pipe';

  private readonly k: KaboomCtx;
  private readonly baseLine: number;
  private readonly initialSize: number;
  private speed: number;
  private speedIncreaseInterval: number; 
  private speedIncreaseAmount: number;


  constructor(params: { k: KaboomCtx; baseLine: number }) {
    this.k = params.k;
    this.baseLine = params.baseLine;
    this.initialSize = 2;
    this.speed = 240; // Initial speed of the pipes
    this.speedIncreaseInterval = 5000; // Interval for speed increase in milliseconds (e.g., every 5 seconds)
    this.speedIncreaseAmount = 10; 
    this.spawn();
    this.startSpeedIncrease();
  }

  private spawn() {
    // const scaleFactor = this.k.rand(0.8, 2); 
    const scaleYfactor = this.k.rand(2.5,4);
    // const scaledSize = this.initialSize * scaleFactor;
    const randomGap = this.k.rand(250, 500);
    const spawnDelay = randomGap / this.speed;
    this.k.add([
      this.k.sprite(Pipe.Sprite),
      this.k.layer(Layers.Pipe),
      // this.k.scale(scaledSize),
      this.k.scale(2,scaleYfactor),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.baseLine),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, this.speed),
      'pipe',
    ]);
    this.k.wait(spawnDelay, () => this.spawn());
  }
  private startSpeedIncrease() {
    setInterval(() => {
      this.speed += this.speedIncreaseAmount; // Increase speed
    }, this.speedIncreaseInterval);
  }
}
