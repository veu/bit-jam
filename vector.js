'use strict';

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.add = function (vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
};

Vector.prototype.equals = function (vector) {
    return this.x == vector.x && this.y == vector.y;
};

Vector.prototype.distance = function (vector) {
    return Math.hypot(this.x - vector.x, this.y - vector.y);
};

Vector.fromDirection = function (dir) {
    return new Vector(Math.cos(dir / 2 * Math.PI) | 0, Math.sin(dir / 2 * Math.PI) | 0);
};
