function Enemy() {
  this.ctx = canvas.getCanvasCtx("canvasEnemy");
  this.enemyOptions = {
    srcY: 540,
    drawX: Math.floor(Math.random() * 1150) + window.innerWidth,
    drawY: Math.floor(Math.random() * 390),
    width: 100, //enemy canvas position
    height: 30, //enemy canvas position
  };
  this.EnemyWarOptions = {
    bullets: [],
    currentBullet: 0,
    fireBtn: true,
    isShooting: true,
  };
  for (var j = 0; j <= getRandomNumber(500, 9999); j++) {
    this.EnemyWarOptions.bullets[this.EnemyWarOptions.bullets.length] =
      new enemyBullet();
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  this.movement = true;
  // this.rewardPoints = 0;
  this.goUp = true;
  this.speed = 10;
  this.canShoot = false;
  this.warOptions = [];
}
Enemy.prototype.verticalMovement = 2;

Enemy.prototype.drawEnemyCanvas = function () {
  this.enemyOptions.drawX -= this.speed; //negetive x axis(enemy movement)
  this.enemyOptions.drawX -= this.speed;
  this.EnemydrawAllBullets();

  this.checkShooting();
  if (this.movement) {
    if (this.goUp) {
      this.enemyOptions.drawY -= this.verticalMovement;
    } else {
      this.enemyOptions.drawY += this.verticalMovement;
    }
    if (this.enemyOptions.drawY === 0) {
      this.goUp = false;
    } else if (this.enemyOptions.drawY === 600) {
      this.goUp = true;
    }
  }

  canvas.draw(this.ctx, this.enemyOptions);
  this.escaped();
};
Enemy.prototype.checkShooting = function () {
  if (this.EnemyWarOptions.fireBtn && this.EnemyWarOptions.isShooting) {
    this.EnemyWarOptions.bullets[this.EnemyWarOptions.currentBullet++]?.fire(
      this.enemyOptions.drawX + 100, // draw fire drawX=200+100
      this.enemyOptions.drawY + 30 // draw fire drawY=300+30
    );
  } else if (!this.EnemyWarOptions.fireBtn) {
    this.EnemyWarOptions.isShooting = true;
  }
};
Enemy.prototype.EnemydrawAllBullets = function () {
  console.log(this.EnemyWarOptions?.bullets);
  for (var i = 0; i < this.EnemyWarOptions.bullets.length; i++) {
    console.log(this.EnemyWarOptions.bullets[i]);
    if (this.EnemyWarOptions.bullets[i].enemyBulletoptions.drawX >= 0)
      this.EnemyWarOptions.bullets[i].drawBulletCanvas();

    if (this.EnemyWarOptions.bullets[i].enemyBulletoptions.explosion.hasHit)
      this.EnemyWarOptions.bullets[
        i
      ].enemyBulletoptions.explosion.drawExplosionCanvas();
  }
};

Enemy.prototype.escaped = function () {
  if (this.enemyOptions.drawX <= 0) {
    this.recycleEnemy();
    this.EnemydrawAllBullets();
  }
};

Enemy.prototype.recycleEnemy = function () {
  this.enemyOptions.drawX =
    Math.floor(Math.random() * 1000) + window.innerWidth;
  this.drawY = Math.floor(Math.random() * 390);
  canvas.currentTotalEnemies++;

  if (canvas.currentTotalEnemies > level.getCurrentLevel().numberOfEnemies) {
    canvas.updateLevel();
  }
};
