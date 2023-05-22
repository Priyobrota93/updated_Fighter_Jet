function Enemy() {
  this.ctx = canvas.getCanvasCtx("canvasEnemy");

  this.enemyBullet = new enemyBullet();

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
  this.checkHitJet();
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

Enemy.prototype.checkHitJet = function () {
  for (var i = 0; i < canvas.jet.length; i++) {
    if (
      this.enemyBullet.enemyBulletoptions.drawX <
        canvas.jet[i].jetOptions.drawX &&
      this.enemyBullet.enemyBulletoptions.drawX <
        canvas.jet[i].jetOptions.drawX + 95 &&
      this.enemyBullet.enemyBulletoptions.drawY <
        canvas.jet[i].jetOptionss.drawY + 10 &&
      this.enemyBullet.enemyBulletoptions.drawY <
        canvas.jet[i].jetOptions.drawY + 35
    ) {
      document.getElementById("jetKill").cloneNode(true).play();

      this.life--;

      this.showLife();

      if (this.life <= 0) {
        document.getElementById("gameOver").cloneNode(true).play();

        const finalScore = fighterJet.score.score;

        const finalLevel = level.currentLevel;

        const xhttp = new XMLHttpRequest();
        const tokens = localStorage.getItem("jwt");

        xhttp.open("POST", "http://localhost:3000/v1/data/achievement", true);
        xhttp.setRequestHeader("Authorization", "Bearer " + tokens);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send(
          JSON.stringify({
            user: localStorage.getItem("userData"),
            name: localStorage.getItem("Name"),
            maximumScore: finalScore,
            level: finalLevel,
          })
        );

        $("#resume")
          .text("Your Score: " + fighterJet.score.score)
          .attr("disabled", "disabled");

        pauseGame();
      }

      this.enemyOptions.explosion.Explosionoptions.drawX =
        canvas.enemies[i].Jetoptions.drawX +
        this.enemyOptions.explosion.Explosionoptions.width / 2;
      this.enemyOptions.explosion.Explosionoptions.drawY =
        canvas.enemies[i].Jetoptions.drawY -
        this.enemyOptions.explosion.Explosionoptions.height / 3;
      this.enemyOptions.explosion.hasHit = true;
      this.enemyOptions.explosion.drawExplosionCanvas();
      this.recycleBullet();
    }
  }
};
