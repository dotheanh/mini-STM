
var Topographic = ccui.Widget.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        //this._super();
        zOrder = zOrder || 15;
        scaleRate = scaleRate || 0.831;
        this._img = new cc.Sprite(this.getFileName());
        this._img.setScale(scaleRate);
        this._img.attr({ x: xPos, y: yPos });
        this._img.setLocalZOrder(zOrder);

        this._isBlock = null;
    },

    getFileName: function() {
        return "";
    }
});

var Obstacle = Topographic.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._isBlock = true;
    },
});

// var Bush = Obstacle.extend({
//     getFileName: function() {
//         return battle_res.map_forest_obstacle_1;
//     }
// });
var Tree = Obstacle.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._isActacker = false;
    },
    getFileName: function() {
        return battle_res.map_forest_obstacle_2;
    }
});
var Rock = Obstacle.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._isActacker = false;
    },
    getFileName: function() {
        return battle_res.map_forest_obstacle_3;
    }
});
var Tower = Obstacle.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        this._super(xPos, yPos, zOrder, scaleRate);
        this._isActacker = true;
    },
    getFileName: function() {
        return battle_res.tower_ice_gun_idle_0_0023;
    },
    fire: function(x, y) {
        // do animation
        var spine_tower_ice = new sp.SkeletonAnimation(tower_res.tower_ice_fx_json, tower_res.tower_ice_fx_atlas);
        spine_tower_ice.setAnimation(0, 'attack_5', false);
        spine_tower_ice.setScale(0.5);
		spine_tower_ice.setPosition(cc.p(x, y));
        return spine_tower_ice;
    }
});


// var Flat = Topographic.extend({
//     ctor: function() {
//         this._super();
//         this._isBlock = false;
//     },
// });

// var Ground = Flat.extend({
//     getFileName: function() {
//         return battle_res.map_decoration_grass_0000;
//     }
// });