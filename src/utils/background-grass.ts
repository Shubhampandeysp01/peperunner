import { Layers } from 'game';
import { KaboomCtx } from 'kaboom';

export class BackgroundGrass {
  public static Sprite = 'background';

  private readonly k: KaboomCtx;

  constructor(params: { k: KaboomCtx }) {
    this.k = params.k;
    this.spawn();
  }

  private spawn() {
    const canvasWidth = this.k.width();
    const canvasHeight = this.k.height();

    this.k.add([
      this.k.sprite(BackgroundGrass.Sprite, {
        width: canvasWidth,
        height: canvasHeight,
      }),
      this.k.layer(Layers.Background),
      this.k.pos(canvasWidth / 2, canvasHeight / 2),
      this.k.origin('center'),
    ]);
  }
}
