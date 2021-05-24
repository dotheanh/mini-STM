
var Monster = ccui.Widget.extend({
    ctor: function(xPos, yPos, scaleRate, zOrder) {
        zOrder = zOrder || 2;
        scaleRate = scaleRate || 0.831;
        this._img = new cc.Sprite(this.getFileName());
        this._img.setScale(scaleRate);
        this._img.attr({ x: xPos, y: yPos });
        this._img.setLocalZOrder(zOrder);

        this._flyable = null;
        this._speed = 10;
        this._move_right_animation = null;
        this._move_left_animation = null;
        this._move_up_animation = null;
        this._move_down_animation = null;
    },

    getFileName: function() {
        return "";
    },

    moveDown: function() {
        this._img.runAction(cc.moveBy(1, 0, -this._speed*1));
    },

    moveRight: function() {
        this._img.runAction(cc.moveBy(1, this._speed*1, 0));
    }
});

var WalkingMonster = Monster.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._flyable = false;
    }
});

var Assassin = WalkingMonster.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._speed = 20;

        cc.spriteFrameCache.addSpriteFrames(monster_res.assassin_plist, monster_res.assassin_png);
        cc.animationCache.addAnimations(monster_res.assassin_anim_plist);

		this._move_down_animation = cc.animationCache.getAnimation("move_down");
        this._move_down_animation.setLoops(-1);
		this._move_down_action = cc.animate(this._move_down_animation);
        this._move_down_action.retain();

        this._move_right_animation = cc.animationCache.getAnimation("move_right");
        this._move_right_animation.setLoops(-1);
		this._move_right_action = cc.animate(this._move_right_animation);
        this._move_right_action.retain();
    },
    getFileName: function() {
        return battle_res.monster_assassin_run_0000;
    },
    moveDown: function() {
        this._super();
        this._img.stopAction(this._move_down_action);
        this._img.runAction(this._move_down_action);
    },

    moveRight: function() {
        this._super();
        this._img.stopAction(this._move_down_action);
        this._img.stopAction(this._move_right_action);
        this._img.runAction(this._move_right_action);
    }
});
var DarkGiant = WalkingMonster.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._speed = 10;
    },
    getFileName: function() {
        return battle_res.monster_dark_giant_run_0000;
    }
});
var Iceman = WalkingMonster.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._speed = 14;
    },
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