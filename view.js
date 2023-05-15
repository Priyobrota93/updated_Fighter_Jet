const FRAME_WIDTH = 1500;
const FRAME_HEIGHT = 450;
var isFirstLoaded = 1;
var drawInterval;
var requestAnimFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var level = new Level1();
var canvas = {
  gameWidth: window.innerWidth,
  gameHeight: window.innerHeight,
  isPlaying: false,
  enemies: [],
  spawnAmount: 7,
  currentSpawnAmount: 7,
  gameScore: {},
  currentTotalEnemies: 0,
  init: function () {
    // this.drawbackground();
    this.updateLevel();
    this.spawnEnemy(this.spawnAmount);
    this.startPlaying();
    if (isFirstLoaded == 1) {
      this.stopPlaying();
      isFirstLoaded = 0;
    }

    //this.gameScore = new Score();
    //this.gameScore.drawScoreCanvas();

    document.addEventListener("keydown", this.utilityOfKeydown, false);
    document.addEventListener("keyup", this.utilityOfKeyup, false);
  },
  updateLevel: function () {
    this.currentTotalEnemies = 0;
    let currentSpawn = level.getCurrentLevel().spawn;
    level.currentLevel++;
    this.spawnAmount = level.getCurrentLevel().spawn;
    let spawnIncrease = this.spawnAmount - this.currentSpawnAmount;
    for (let index = 0; index < spawnIncrease; index++) {
      let enemy = new Enemy();
      if (Math.random() < 0.5) {
        enemy.movement = true;
      }
      if (Math.random() < 0.5) {
      }
      this.enemies.push(enemy);
    }
    this.currentSpawnAmount = this.spawnAmount;
    for (let index = 0; index < this.enemies.length; index++) {
      this.enemies[index].speed = level.getCurrentLevel().speed;
    }
    console.log("Update level");
    $("#level").text("Level- " + level.currentLevel);
  },
  getCanvasCtx: function (id) {
    return document.getElementById(id).getContext("2d");
  },

  recursiveDrawAllJets: function () {
    fighterJet.drawJetCanvas();
    this.drawAllEnemies();
    shootInterval++;
  },
  recursivedrawAllBullets: function () {
    enemyJet.drawBulletCanvas();

    // if (this.isPlaying)
  },
  spawnEnemy: function (num) {
    for (var i = 0; i < num; i++) {
      this.enemies[this.enemies.length] = new Enemy();
    }
  },
  drawAllEnemies: function () {
    this.clear(this.enemies[0].ctx);

    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].drawEnemyCanvas();
    }
  },
  startPlaying: function () {
    var that = this;
    this.stopPlaying();
    drawInterval = setInterval(function () {
      that.recursiveDrawAllJets.call(that);
    }, 10);
  },
  stopPlaying: function () {
    clearInterval(drawInterval);
  },
  draw: function (ctx, cusOptions) {
    var Options = {
      srcX: 0,
      srcY: 0,
      width: 100,
      height: 40,
      drawX: 0,
      drawY: 0,
      drawWidth: 100,
      drawHeight: 40,
    };

    var settings = Object.assign({}, Options, cusOptions);

    ctx.drawImage(
      imageSprite,
      settings.srcX,
      settings.srcY,
      settings.width,
      settings.height,
      settings.drawX,
      settings.drawY,
      settings.drawWidth,
      settings.drawHeight
    );
  },
  clear: function (ctx) {
    ctx.clearRect(0, 0, 1600, 600);
  },

  drawbackground: function () {
    var ctxBg = this.getCanvasCtx("canvasBg");
    var bgOptions = {
      width: window.innerWidth,
      height: window.innerHeight,
      drawWidth: window.innerWidth,
      drawHeight: window.innerHeight,
    };

    this.draw(ctxBg, bgOptions);
  },
  drawEnemybackground: function () {
    var ctxBg = this.getEnemyBulletCanvasCtx("canvasBg");
    var bgOptions = {
      width: window.innerWidth,
      height: window.innerHeight,
      drawWidth: window.innerWidth,
      drawHeight: window.innerHeight,
    };

    this.draw(ctxBg, bgOptions);
  },
  utilityOfKeyup: function (e) {
    e.preventDefault();

    keyId = e.keyCode ? e.keyCode : e.which;

    if (keyId === 38 || keyId === 87) fighterJet.stear.up = false; // w
    if (keyId === 39 || keyId === 68) fighterJet.stear.forward = false; // D
    if (keyId === 40 || keyId === 83) fighterJet.stear.down = false; // Z
    if (keyId === 37 || keyId === 65) fighterJet.stear.backword = false; // A
    if (keyId === 32) fighterJet.jetWarOptions.fireBtn = false; // Spacebar
  },
  utilityOfKeydown: function (e) {
    e.preventDefault();

    keyId = e.keyCode ? e.keyCode : e.which;

    if (keyId === 38 || keyId === 87) fighterJet.stear.up = true; // w
    if (keyId === 39 || keyId === 68) fighterJet.stear.forward = true; // D
    if (keyId === 40 || keyId === 83) fighterJet.stear.down = true; // Z
    if (keyId === 37 || keyId === 65) fighterJet.stear.backword = true; // A
    if (keyId === 32) fighterJet.jetWarOptions.fireBtn = true; // Spacebar
  },
};

function removeBullet() {
  for (let bullet of fighterJet.jetWarOptions.bullets) {
    bullet.options.drawX = 0;
  }
}

function setCanvasSize() {
  $("#canvasEnemy")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight - 250);
  $("#canvasJet")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);
  $("#canvasScore")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);
}

setCanvasSize();
$(window).on("resize", setCanvasSize);
