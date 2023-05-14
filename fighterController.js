var imageSprite = new Image();
imageSprite.src = "images/sprite copy05.png";
imageSprite.addEventListener("load", canvas.init.bind(canvas), false);
var fighterJet = new Jet();
var enemyJet = new Enemy();

function pauseGame() {
  console.log("Entering Pause game method");
  canvas.stopPlaying();
  $("#afterPause").fadeIn(1000);

  //$("#afterPause").removeClass('d-none');
  //afterPause
}

function resumeGame() {
  $("#afterPause").fadeOut(1000);
  startGame();
}

function startGame() {
  canvas.startPlaying();
}

function initGameState() {
  fighterJet.score.score = 0;
  fighterJet.score.update();
  fighterJet.life = 3;
  level.currentLevel = 0;
}

function restart() {
  initGameState();
  fighterJet.Jetoptions.drawX = 200;
  fighterJet.Jetoptions.drawY = 300;
  canvas.enemies = [];
  canvas.init();
  resumeGame();
  $("#resume").text("Resume Game").attr("disabled", false);
}

function menu() {
  restart();
  canvas.stopPlaying();
  //pauseGame();
  $("#afterPause").fadeOut(1000);
  $("#startGame").fadeIn(1000);
  //play();
}

function play() {
  //document.getElementById("startGame").style.display = "none";
  $("#startGame").fadeOut(1000);
  $("#pause").removeClass("d-none");
  startGame();
}
