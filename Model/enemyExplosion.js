// //enemy Explosion
// function enemyExplosion() {
//   this.ctx = canvas.getCanvasCtx("canvasEnemy");

//   this.enemyExplosionoptions = {
//     srcX: 750,
//     srcY: 500,
//     width: 20,
//     height: 20,
//     drawX: 0,
//     drawY: 0,
//     hasHit: false,
//     currentFrame: 0,
//     totalFrame: 30,
//     drawWidth: 20,
//     drawHeight: 20,
//   };

//   this.speed = 2;
// }

// enemyExplosion.prototype.drawExplosionCanvas = function () {
//   if (
//     this.enemyExplosionoptions.currentFrame <
//     this.enemyExplosionoptions.totalFrame
//   ) {
//     canvas.draw(this.ctx, this.enemyExplosionoptions);
//     this.enemyExplosionoptions.currentFrame++;
//   } else {
//     this.hasHit = false;
//     this.currentFrame = 0;
//   }
// };
