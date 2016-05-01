'use strict';

var Screen = function () {
    this.style = document.body.style;
};

Screen.prototype.setColor = function (black) {
    this.style.backgroundColor = black ? '#333' : '#666'; 
}


var PatternQueue = function () {
    this.patterns = [];
};

PatternQueue.prototype.add = function (pattern) {
    this.patterns.push(pattern);
};

PatternQueue.prototype.update = function () {
    if (this.patterns.length === 0) {
        return;
    }
    if (this.patterns[0].hasEnded()) {
        this.patterns.shift();
    }
};

PatternQueue.prototype.getColor = function () {
    return this.patterns.length > 0 && this.patterns[0].getColor();
};

PatternQueue.prototype.reset = function () {
    this.patterns = [];
};


var Pattern = Object.create(null);

Pattern.hasEnded = function () {
    return false;
};


var WallPattern = Object.create(Pattern);

WallPattern.getColor = function () {
    return false;
};


var PassagePattern = Object.create(Pattern);

PassagePattern.getColor = function () {
    return true;
};


var DoorPattern = Object.create(Pattern);

DoorPattern.step = 0;

DoorPattern.getColor = function () {
    var color = this.step < 15;
    this.step = (this.step + 1) % 30;
    return color;
};


var EnemyPattern = Object.create(Pattern);

EnemyPattern.step = 0;
    
EnemyPattern.getColor = function () {
    this.step++;
    return this.step % 2;
};


var FlickerPattern = Object.create(Pattern);

FlickerPattern.ttl = 2;

FlickerPattern.getColor = function () {
    this.ttl--;
    return this.ttl % 2 == 0;
}

FlickerPattern.hasEnded = function () {
    return this.ttl <= 0;
}
