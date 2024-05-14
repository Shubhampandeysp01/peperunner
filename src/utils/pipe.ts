import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class Pipe {
  public static Sprite = 'pipe';

  private readonly k: KaboomCtx;
  private readonly baseLine: number;
  private readonly initialSize: number;

  constructor(params: { k: KaboomCtx; baseLine: number }) {
    this.k = params.k;
    this.baseLine = params.baseLine;
    this.initialSize = 2;

    this.spawn();
  }

  private spawn() {
    const scaleFactor = this.k.rand(0.8, 1.5); // Random scale factor between 0.5 and 1.5
    const scaledSize = this.initialSize * scaleFactor;
    this.k.add([
      this.k.sprite(Pipe.Sprite),
      this.k.layer(Layers.Pipe),
      this.k.scale(scaledSize),
      this.k.area(),
      this.k.pos(this.k.width(), this.k.height() - this.baseLine),
      this.k.origin('botleft'),
      this.k.move(this.k.LEFT, 240),
      'pipe',
    ]);
    this.k.wait(this.k.rand(1, 2), () => this.spawn());
  }
}
