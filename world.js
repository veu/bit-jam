'use strict';

var World = function () {
    this.map = Maps.maps[0];
};

World.prototype.get = function (pos) {
    var entity = this.map.rows[pos.y][pos.x];
    if (entity == 'D' && this.hasEnemies()) {
        return '#';
    }
    return entity;
};

World.prototype.getStartPosition = function () {
    return Maps.start.position;
};

World.prototype.getStartDirection = function () {
    return Maps.start.direction;
};

World.prototype.getRows = function () {
    return this.map.rows;
};

World.prototype.getEnemyPositions = function () {
    var positions = [];
    for (var y in this.map.rows) {
        for (var x in this.map.rows[y]) {
            if (this.map.rows[y][x] == 'E') {
                positions.push(new Vector(x, y));
            }
        }
    }
    return positions;
};

World.prototype.removeEnemy = function (pos) {
    var row = this.map.rows[pos.y].split('');
    row.splice(pos.x, 1, ' ');
    this.map.rows[pos.y] = row.join('');
};

World.prototype.hasEnemies = function () {
   return /E/.test(this.map.rows.join(''));
};

World.prototype.warp = function (from) {
    var warpTarget = this.map.warps[from.x + ',' + from.y];
    if (!warpTarget) return;
    this.map = Maps.maps[warpTarget.map];
    return warpTarget;
};

World.prototype.reset = function () {
    var warpTarget = this.map.reset;
    this.map = Maps.maps[warpTarget.map];
    return warpTarget;
}
