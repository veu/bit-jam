'use strict';

var Game = function () {
    this.screen = new Screen();
    this.speaker = new Speaker();
    this.input = new Input();
    this.world = new World();
    this.patternMap = {
        '#': WallPattern,
        ' ': PassagePattern,
        'D': DoorPattern,
        'E': EnemyPattern
    };

    this.player = new Player(this.world.getStartPosition(), this.world.getStartDirection());

    this.patternQueue = new PatternQueue();
    var facingEntity = this.getObject(this.player.getFacingPosition());
    this.patternQueue.add(this.getPattern(facingEntity));

    setInterval(this.update.bind(this), 1000 / 24);

    this.input.on('look', this.onlook.bind(this));
    this.input.on('move', this.onmove.bind(this));
};

Game.prototype.update = function () {
    this.patternQueue.update();
    requestAnimationFrame((function () {
        var black = this.patternQueue.getColor();
        if (Math.random() > (2 + this.player.sanity) / 3) {
            black = !black;
        }
        this.speaker.setColor(black);
        this.screen.setColor(black);
    }).bind(this));
}

Game.prototype.getObject = function (pos) {
    return this.world.get(pos);
}

Game.prototype.getPattern = function (entity) {
    if (entity == 'D' && this.world.hasEnemies()) {
        entity = '#';
    }
    return Object.create(this.patternMap[entity]);
}

Game.prototype.updateEnemies = function () {
    var trace = this.player.trace;
    if (trace.length != 8) {
        return;
    }

    this.world.getEnemyPositions().forEach(function (pos) {
        if (!this.player.pos.equals(trace[0])) {
            return;
        }
        var traced = {};
        trace.forEach(function (step) {
            if (step.distance(pos) < 2) {
                traced[step.x+','+step.y] = 1;
            }
        });
        if (Object.keys(traced).length == 8) {
            this.world.removeEnemy(pos);
        }
    }, this);
}

Game.prototype.onlook = function (details) {
    if (this.player.isDead) {
        return;
    }

    this.player.dir = details.direction;

    this.updateContext();
    this.printDebugInfo();
}

Game.prototype.onmove = function () {
    if (this.player.isDead) {
        this.player.isDead = false;
        this.player.pos = this.world.reset().position;
        this.player.dir = this.world.reset().direction;
    } else if (this.getObject(this.player.getFacingPosition()) != '#') {
        this.player.move();
        this.updateEnemies();
    }

    var warpTarget = this.world.warp(this.player.pos);
    if (warpTarget) {
        this.player.pos = warpTarget.position;
        this.player.dir = warpTarget.direction;
    }

    this.updateContext();
    this.printDebugInfo();
}

Game.prototype.updateContext = function () {
    var facingEntity = this.getObject(this.player.getFacingPosition());
    if (facingEntity == 'E') {
        this.player.isDead = true;
    }

    this.patternQueue.reset();
    this.patternQueue.add(Object.create(FlickerPattern));
    this.patternQueue.add(this.getPattern(facingEntity));
}

Game.prototype.printDebugInfo = function () {
    return;
    this.world.getRows().forEach(function (row, y) {
        if (this.player.pos.y == y) {
            row = row.split('');
            row.splice(this.player.pos.x, 1, '>v<^'[this.player.dir]);
            row = row.join('');
        }
        console.log(row);
    }, this);
}

Game.prototype.toggleAudio = function () {
  this.speaker.toggle();
}

var game = new Game();
