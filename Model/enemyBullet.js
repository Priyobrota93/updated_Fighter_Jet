function enemyBullet() {
  (this.ctx = canvas.getCanvasCtx("canvasEnemy")),
    (this.enemyBulletoptions = {
      srcX: 141,
      srcY: 526,
      width: 5,
      height: 5,
      drawX: Enemy.drawX,
      drawY: Enemy.drawY,
      drawWidth: 8, // bullet size
      drawHeight: 4, //bullet size
      explosion: new Explosion(),
    });
  console.log(this.enemyBulletoptions.srcX);
  this.speed = 150; //bullet speed
  this.visiable = true; //new
}
enemyBullet.prototype.drawBulletCanvas = function () {
  // console.log(5);
  this.enemyBulletoptions.drawX -= this.speed;
  canvas.draw(this.ctx, this.enemyBulletoptions);
  // this.checkHitJet();
  this.recycleBullet();
  // this.fire();
};

enemyBullet.prototype.recycleBullet = function () {
  // console.log(4);
  if (
    this.enemyBulletoptions.drawX > canvas.gameWidth ||
    this.enemyBulletoptions.explosion.hasHit
  )
    this.enemyBulletoptions.drawX = -20;
};

enemyBullet.prototype.fire = function (drawX, drawY) {
  console.log(1);
  //fire draw when shooting
  this.enemyBulletoptions.drawX = drawX;
  this.enemyBulletoptions.drawY = drawY;
};

// enemyBullet.prototype.checkHitJet = function () {
//   for (var i = 0; i < canvas.Jet.length; i++) {
//     if (
//       this.enemyBulletoptions.drawX > canvas.Jet[i].Jet.options.drawX &&
//       this.enemyBulletoptions.drawX < canvas.Jet[i].Jet.options.drawX + 100 &&
//       this.enemyBulletoptions.drawY > canvas.Jet[i].Jet.options.drawY + 10 &&
//       this.enemyBulletoptions.drawY < canvas.Jet[i].Jet.options.drawY + 30
//     ) {
//       // debugger;
//       //fighterJet.score.updateScoreForKill(); //new [test kill]
//       this.enemyBulletoptions.explosion.Explosionoptions.drawX =
//         canvas.Jet[i].Jet.options.drawX +
//         this.enemyBulletoptions.explosion.Explosionoptions.width / 2;
//       this.enemyBulletoptions.explosion.Explosionoptions.drawY =
//         canvas.Jet[i].Jet.options.drawY -
//         this.enemyBulletoptions.explosion.Explosionoptions.height / 3;
//       this.enemyBulletoptions.explosion.hasHit = true;
//       // this.recycleBullet();
//       // canvas.Jet[i].recycleEnemy();
//     }
//   }
// };

//Bullet part end
