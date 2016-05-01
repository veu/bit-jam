'use strict';

var Input = function () {
    this.events = {};

    self.onkeydown = (function (e) {
        if (e.keyCode == 32) {
            this.trigger('move', {});
        }
        if (37 <= e.keyCode && e.keyCode <= 40) {
            this.trigger('look', {direction: (e.keyCode + 1) % 4});
        }
        return false;
    }).bind(this);

    var mc = new Hammer(document.body);
    mc.on('press', this.trigger.bind(this, 'move', {}));
    mc.get('swipe').set({direction: Hammer.DIRECTION_ALL});
    mc.on('swiperight',  this.trigger.bind(this, 'look', {direction: 0}));
    mc.on('swipedown', this.trigger.bind(this, 'look', {direction: 1}));
    mc.on('swipeleft', this.trigger.bind(this, 'look', {direction: 2}));
    mc.on('swipeup', this.trigger.bind(this, 'look', {direction: 3}));
};

Input.prototype.on = function (name, callback) {
    this.events[name] = callback;
}

Input.prototype.trigger = function (name, details) {
    if (name in this.events) {
        this.events[name](details);
    }
}
