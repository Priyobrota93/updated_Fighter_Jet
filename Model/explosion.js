function Explosion() {
  this.ctx = canvas.getCanvasCtx("canvasJet");
  this.Explosionoptions = {
    srcX: 602,
    srcY: 512,
    width: 100,
    height: 100,
    drawX: 0,
    drawY: 0,
    hasHit: false,
    currentFrame: 0,
    totalFrame: 30,
    drawWidth: 100,
    drawHeight: 100,
  };
  // this.speed = 0.2;
}

Explosion.prototype.drawExplosionCanvas = function () {
  if (this.Explosionoptions.currentFrame < this.Explosionoptions.totalFrame) {
    canvas.draw(this.ctx, this.Explosionoptions);
    this.Explosionoptions.currentFrame++;
  } else {
    this.hasHit = false;
    this.currentFrame = 0;
  }
};
