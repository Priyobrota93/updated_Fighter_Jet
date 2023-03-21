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
  for (var j = 0; j <= getRandomNumber(400, 999); j++) {
    this.EnemyWarOptions.bullets[this.EnemyWarOptions.bullets.length] =
      new enemyBullet();
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // for (var j = 0; j <= 400; j++) {
  //   this.EnemyWarOptions.bullets[this.EnemyWarOptions.bullets.length] =
  //     new enemyBullet();
  // }
  this.movement = false;
  // this.rewardPoints = 0;
  this.goUp = true;
  this.speed = 10;
  this.canShoot = false;
  this.warOptions = [];
}
Enemy.prototype.verticalMovement = 0.5;

Enemy.prototype.drawEnemyCanvas = function () {
  this.enemyOptions.drawX -= this.speed; //negetive x axis(enemy movement)
  this.enemyOptions.drawX -= this.speed;
  this.EnemydrawAllBullets();
  // this.checkHitWall();
  //console.log(7);
  this.checkShooting();
  if (this.movement) {
    if (this.goUp) {
      this.enemyOptions.drawY -= this.verticalMovement;
    } else {
      this.enemyOptions.drawY += this.verticalMovement;
    }
    if (this.enemyOptions.drawY === 0) {
      this.goUp = false;
    } else if (this.enemyOptions.drawY === 500) {
      this.goUp = true;
    }
    // if (this.canShoot) {
    //   //enemy.warOptions.isShooting = true;
    //   // enemy.checkShooting();
    //   // enemy.drawAllBullets();
    // }
    // console.log(this.enemyOptions.drawY);
  }

  canvas.draw(this.ctx, this.enemyOptions);
  this.escaped();
};
Enemy.prototype.checkShooting = function () {
  console.log(this.EnemyWarOptions.fireBtn, this.EnemyWarOptions.isShooting);
  // console.log(23);
  if (this.EnemyWarOptions.fireBtn && this.EnemyWarOptions.isShooting) {
    console.log(22);
    this.EnemyWarOptions.bullets[this.EnemyWarOptions.currentBullet++]?.fire(
      this.enemyOptions.drawX + 100, // draw fire drawX=200+100
      this.enemyOptions.drawY + 30 // draw fire drawY=300+30
    );
    // if (
    //   this.EnemyWarOptions.currentBullet >= this.EnemyWarOptions.bullets.length
    // )
    // {
    //   this.EnemyWarOptions.currentBullet = 0; //don't fire
    // }
  } else if (!this.EnemyWarOptions.fireBtn) {
    this.EnemyWarOptions.isShooting = true;
  }
};
Enemy.prototype.EnemydrawAllBullets = function () {
  console.log(8);
  console.log(this.EnemyWarOptions?.bullets);
  for (var i = 0; i < this.EnemyWarOptions.bullets.length; i++) {
    console.log(9);
    console.log(this.EnemyWarOptions.bullets[i]);
    if (this.EnemyWarOptions.bullets[i].enemyBulletoptions.drawX >= 0)
      this.EnemyWarOptions.bullets[i].drawBulletCanvas();
    console.log(6);
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
  // console.log("enemy drawn");
  // console.log("Speed: " + this.speed);
  this.enemyOptions.drawX =
    Math.floor(Math.random() * 1000) + window.innerWidth;
  this.drawY = Math.floor(Math.random() * 390);
  canvas.currentTotalEnemies++;
  // console.log("Current level total: " + canvas.currentTotalEnemies);
  // console.log("Number of enemies: " + level.getCurrentLevel().numberOfEnemies);
  // canvas.currentSpawnAmount--;
  // if(canvas.currentSpawnAmount === 0){

  // }
  if (canvas.currentTotalEnemies > level.getCurrentLevel().numberOfEnemies) {
    // console.log(canvas.enemies);
    // console.log("update");
    canvas.updateLevel();
  }
};

//Enemy.prototype.checkShooting = Jet.prototype.checkShooting;
//Enemy.prototype.drawAllBullets = Jet.prototype.drawAllBullets;

// Enemy.prototype.checkHitWall = function () {
//   console.log("Screen size: " + window.innerWidth);
//   if (this.enemyOptions.drawX + this.enemyOptions.width >= window.innerWidth)
//     this.enemyOptions.drawX = window.innerWidth - this.enemyOptions.width;
//   if (this.enemyOptions.drawX <= 0) this.enemyOptions.drawX = 0;
//   if (this.enemyOptions.drawY <= 0) this.enemyOptions.drawY = 0;
//   if (
//     this.enemyOptions.drawY + this.enemyOptions.height >=
//     window.innerHeight - 250
//   )
//     this.enemyOptions.drawY =
//       window.innerHeight - 250 - this.enemyOptions.height;
// };

// Jet.prototype.checkHitJet = function () {
//   for (var i = 0; i < canvas.enemies.length; i++) {
//     if (detectCollision(this, canvas.enemies[i])) {
//       document.getElementById("collideEnemy").cloneNode(true).play();
//       // debugger;
//       this.life--;
//       this.showLife();
//       // debugger;
//       if (this.life <= 0) {
//         document.getElementById("gameOver").cloneNode(true).play();
//         $("#resume")
//           .text("Your Score: " + fighterJet.score.score)
//           .attr("disabled", "disabled");
//         removeBullet();
//         pauseGame();
//       }
//       this.options.explosion.options.drawX =
//         canvas.enemies[i].enemyOptions.drawX +
//         this.options.explosion.options.width / 2;
//       this.options.explosion.options.drawY =
//         canvas.enemies[i].enemyOptions.drawY -
//         this.options.explosion.options.height / 3;
//       this.options.explosion.hasHit = true;
//       this.options.explosion.drawExplosionCanvas();
//       // $('#collideEnemy').play();
//       //this.recycleBullet();
//       canvas.enemies[i].recycleEnemy();
//     }
//   }
// };
