function Bullet() {
  (this.ctx = canvas.getCanvasCtx("canvasJet")),
    (this.Bulletoptions = {
      srcX: 142.5,
      srcY: 557.5,
      width: 5, //Jet Bullet canvas position
      height: 5, //Jet Bullet canvas position
      drawX: -200,
      drawY: 200,
      drawWidth: 10,
      drawHeight: 4,
      explosion: new Explosion(),
    });
  this.speed = 10;
  this.visible = true;
}

Bullet.prototype.drawBulletCanvas = function () {
  this.Bulletoptions.drawX += this.speed;
  canvas.draw(this.ctx, this.Bulletoptions);
  this.checkHitEnemy();
  this.recycleBullet();
};

Bullet.prototype.recycleBullet = function () {
  if (
    this.Bulletoptions.drawX > window.innerWidth ||
    this.Bulletoptions.explosion.hasHit
  )
    this.Bulletoptions.drawX = -20;
};

Bullet.prototype.fire = function (drawX, drawY) {
  this.Bulletoptions.drawX = drawX;
  this.Bulletoptions.drawY = drawY;
  document.getElementById("fire").cloneNode(true).play();
};

Bullet.prototype.checkHitEnemy = function () {
  for (var i = 0; i < canvas.enemies.length; i++) {
    if (
      this.Bulletoptions.drawX > canvas.enemies[i].enemyOptions.drawX &&
      this.Bulletoptions.drawX < canvas.enemies[i].enemyOptions.drawX + 95 &&
      this.Bulletoptions.drawY > canvas.enemies[i].enemyOptions.drawY + 10 &&
      this.Bulletoptions.drawY < canvas.enemies[i].enemyOptions.drawY + 35
    ) {
      document.getElementById("enemyKill").cloneNode(true).play();

      fighterJet.score.updateScoreForKill();
      this.Bulletoptions.explosion.Explosionoptions.drawX =
        canvas.enemies[i].enemyOptions.drawX +
        this.Bulletoptions.explosion.Explosionoptions.width / 2;
      this.Bulletoptions.explosion.Explosionoptions.drawY =
        canvas.enemies[i].enemyOptions.drawY -
        this.Bulletoptions.explosion.Explosionoptions.height / 3;
      this.Bulletoptions.explosion.hasHit = true;
      this.recycleBullet();
      canvas.enemies[i].recycleEnemy();
    }
  }
};

Bullet.prototype.removeBullet = function () {
  this.Bulletoptions.drawX = -20;
};
