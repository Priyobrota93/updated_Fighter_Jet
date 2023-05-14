var Level1 = function () {
  this.currentLevel = 0;
  this.levelDetails = {
    level1: {
      level: 1,
      numberOfEnemies: 6,
      speed: 7,
      spawn: 4,
      levelScoreFactor: 1,
    },
    level2: {
      level: 2,
      numberOfEnemies: 10,
      speed: 14,
      spawn: 7,
      levelScoreFactor: 2,
    },
    level3: {
      level: 3,
      numberOfEnemies: 14,
      speed: 21,
      spawn: 12,
      levelScoreFactor: 3,
    },
    level4: {
      level: 4,
      numberOfEnemies: 18,
      speed: 28,
      spawn: 17,
      levelScoreFactor: 4,
    },
    level5: {
      level: 5,
      numberOfEnemies: 22,
      speed: 35,
      spawn: 22,
      levelScoreFactor: 5,
    },
    level6: {
      level: 6,
      numberOfEnemies: 26,
      speed: 42,
      spawn: 27,
      levelScoreFactor: 6,
    },
    level7: {
      level: 7,
      numberOfEnemies: 30,
      speed: 49,
      spawn: 35,
      levelScoreFactor: 7,
    },
  };
};

Level1.prototype.getCurrentLevel = function () {
  if (this.currentLevel === 1) {
    return this.levelDetails.level1;
  } else if (this.currentLevel === 2) {
    return this.levelDetails.level2;
  } else if (this.currentLevel === 3) {
    return this.levelDetails.level2;
  } else if (this.currentLevel === 4) {
    return this.levelDetails.level2;
  } else if (this.currentLevel === 5) {
    return this.levelDetails.level2;
  } else if (this.currentLevel === 6) {
    return this.levelDetails.level2;
  } else {
    return this.levelDetails.level7;
  }
};
