'use strict';

var Player = function (pos, dir) {
    this.pos = pos;
    this.trace = [];
    this.dir = dir;
    this.isDead = false;
    this.sanity = 1;
};

Player.prototype.getFacingPosition = function () {
    return this.pos.add(Vector.fromDirection(this.dir));
};

Player.prototype.move = function () {
    this.trace.push(this.pos);
    if (this.trace.length > 8) {
        this.trace.shift();
    }
    this.pos = this.getFacingPosition();
};
