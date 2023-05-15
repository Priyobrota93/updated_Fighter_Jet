var shootInterval = 0;

function detectCollision(jet, enemy) {
  let bottomOfJet = jet.Jetoptions.drawY + jet.Jetoptions.height;
  let topOfJet = jet.Jetoptions.drawY;
  let leftOfJet = jet.Jetoptions.drawX;
  let rightOfJet = jet.Jetoptions.drawX + jet.Jetoptions.width;

  let topOfEnemy = enemy.enemyOptions.drawY;
  let leftSideOfEnemy = enemy.enemyOptions.drawX;
  let rightSideOfEnemy = enemy.enemyOptions.drawX + enemy.enemyOptions.width;
  let bottomOfEnemy = enemy.enemyOptions.drawY + enemy.enemyOptions.height;

  if (
    rightOfJet >= leftSideOfEnemy &&
    rightOfJet <= rightOfJet &&
    leftOfJet <= rightSideOfEnemy &&
    bottomOfJet >= topOfEnemy &&
    topOfJet <= bottomOfEnemy
  ) {
    return true;
  } else {
    return false;
  }
}

function Jet() {
  (this.ctx = canvas.getCanvasCtx("canvasJet")),
    (this.Jetoptions = {
      srcX: -5,
      srcY: 500,
      drawX: 100,
      drawY: 300,
      width: 100, // JET canvas position
      height: 30, // JET canvas position
      explosion: new Explosion(),
    });

  this.stear = {
    up: false,
    forward: false,
    down: false,
    backword: false,
  };

  this.jetWarOptions = {
    bullets: [],
    currentBullet: 0,
    fireBtn: false,
    isShooting: false,
  };

  for (var i = 0; i <= 50; i++) {
    this.jetWarOptions.bullets[this.jetWarOptions.bullets.length] =
      new Bullet();
  }

  this.score = new Score();
  this.score.update();
  this.speed = 15;
  this.life = 3;
  this.totalLife = 3;
}

Jet.prototype.showLife = function () {
  for (var lifeNumber = 1; lifeNumber <= this.totalLife; lifeNumber++) {
    var id = "life" + lifeNumber;

    if (lifeNumber > this.life) {
      $("#" + id).attr("src", "images/lifeGone.png");
    } else {
      $("#" + id).attr("src", "images/jet.png");
    }
  }
};

Jet.prototype.checkShooting = function () {
  if (this.jetWarOptions.fireBtn && shootInterval > 5) {
    this.jetWarOptions.isShooting = true;
    this.jetWarOptions.bullets[this.jetWarOptions.currentBullet++].fire(
      this.Jetoptions.drawX + 100,
      this.Jetoptions.drawY + 30
    );
    if (this.jetWarOptions.currentBullet >= this.jetWarOptions.bullets.length) {
      this.jetWarOptions.currentBullet = 0;
    }
    shootInterval = 0;
  } else if (!this.jetWarOptions.fireBtn) {
    this.jetWarOptions.isShooting = false;
  }
};

Jet.prototype.drawAllBullets = function () {
  for (var i = 0; i < this.jetWarOptions.bullets.length; i++) {
    if (this.jetWarOptions.bullets[i].Bulletoptions.drawX >= 0)
      this.jetWarOptions.bullets[i].drawBulletCanvas();
    if (this.jetWarOptions.bullets[i].Bulletoptions.explosion.hasHit) {
      this.jetWarOptions.bullets[
        i
      ].Bulletoptions.explosion.drawExplosionCanvas();
    }
  }
};

Jet.prototype.jetDirection = function () {
  if (this.stear.up) this.Jetoptions.drawY -= this.speed;
  if (this.stear.forward) this.Jetoptions.drawX += this.speed;
  if (this.stear.down) this.Jetoptions.drawY += this.speed;
  if (this.stear.backword) this.Jetoptions.drawX -= this.speed;
};

Jet.prototype.updateScore = function (points) {
  this.score += points;
  canvas.gameScore.update();
};

Jet.prototype.drawJetCanvas = function () {
  canvas.clear(this.ctx);
  this.jetDirection();
  this.checkShooting();
  this.drawAllBullets();
  this.checkHitEnemy();
  this.checkHitWall();
  this.showLife();
  canvas.draw(this.ctx, this.Jetoptions);
};

Jet.prototype.checkHitWall = function () {
  console.log("Screen size: " + window.innerWidth);
  if (this.Jetoptions.drawX + this.Jetoptions.width >= window.innerWidth)
    this.Jetoptions.drawX = window.innerWidth - this.Jetoptions.width;
  if (this.Jetoptions.drawX <= 0) this.Jetoptions.drawX = 0;
  if (this.Jetoptions.drawY <= 0) this.Jetoptions.drawY = 0;
  if (
    this.Jetoptions.drawY + this.Jetoptions.height >=
    window.innerHeight - 250
  )
    this.Jetoptions.drawY = window.innerHeight - 250 - this.Jetoptions.height;
};

Jet.prototype.checkHitEnemy = function () {
  const name = localStorage.getItem("Name");
  const nameElement = document.getElementById("name");
  nameElement.textContent = name.toUpperCase();
  for (var i = 0; i < canvas.enemies.length; i++) {
    console.log("value of canvas.enemies.length here:", canvas.enemies.length);
    console.log("value of i here:", i);
    console.log("value of canvas.enemies[i] here:", canvas.enemies[i]);
    if (detectCollision(this, canvas.enemies[i])) {
      document.getElementById("collideEnemy").cloneNode(true).play();
      // debugger;
      this.life--;
      console.log("value of this.life here:", this.life);

      this.showLife();
      // debugger;
      if (this.life <= 0) {
        document.getElementById("gameOver").cloneNode(true).play();
        console.log("gameOver");
        const finalScore = fighterJet.score.score;
        console.log(finalScore);
        const finalLevel = level.currentLevel;
        console.log(finalLevel);
        const xhttp = new XMLHttpRequest();
        const tokens = localStorage.getItem("jwt");
        console.log(tokens);

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
        console.log("text");

        // xhttp.open("GET", "http://localhost:3000/v1/data/achievement");
        // xhttp.send();
        // console.log("t");
        // onreadystatechange = function () {
        //   if (xhttp.readyState === XMLHttpRequest.DONE) {
        //     const final_score = JSON.parse(xhttp.responseText);
        //     console.log(final_score);
        //   }
        // };
        $("#resume")
          .text("Your Score: " + fighterJet.score.score)
          .attr("disabled", "disabled");

        pauseGame();
      }

      this.Jetoptions.explosion.Explosionoptions.drawX =
        canvas.enemies[i].enemyOptions.drawX +
        this.Jetoptions.explosion.Explosionoptions.width / 2;
      this.Jetoptions.explosion.Explosionoptions.drawY =
        canvas.enemies[i].enemyOptions.drawY -
        this.Jetoptions.explosion.Explosionoptions.height / 3;
      this.Jetoptions.explosion.hasHit = true;
      this.Jetoptions.explosion.drawExplosionCanvas();

      canvas.enemies[i].recycleEnemy();
    }
  }
};
