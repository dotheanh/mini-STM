
var Topographic = ccui.Widget.extend({
    ctor: function(xPos, yPos, zOrder, scaleRate) {
        //this._super();
        zOrder = zOrder || 0;
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
    getFileName: function() {
        return battle_res.map_forest_obstacle_2;
    }
});
var Rock = Obstacle.extend({
    getFileName: function() {
        return battle_res.map_forest_obstacle_3;
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