
var Monster = ccui.Widget.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        zOrder = zOrder || 0;
        scaleRate = scaleRate || 0.831;
        this._img = new cc.Sprite(this.getFileName());
        this._img.setScale(scaleRate);
        this._img.attr({ x: xPos, y: yPos });
        this._img.setLocalZOrder(zOrder);

        this._flyable = null;
    },

    getFileName: function() {
        return "";
    }
});

var WalkingMonster = Monster.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._flyable = false;
    },
});

var Assassin = WalkingMonster.extend({
    getFileName: function() {
        return battle_res.monster_assassin_run_0000;
    }
});
var DarkGiant = WalkingMonster.extend({
    getFileName: function() {
        return battle_res.monster_dark_giant_run_0000;
    }
});
var Iceman = WalkingMonster.extend({
    getFileName: function() {
        return battle_res.monster_iceman_run_0000;
    }
});


var FlyingMonster = Monster.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._flyable = true;
    },
});

var Bat = FlyingMonster.extend({
    getFileName: function() {
        return battle_res.monster_bat_run_0000;
    }
});