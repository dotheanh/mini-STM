// generate random
function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function calDistance(x1, y1, x2, y2) {
    var deltaX = x1 - x2;
    var deltaY = y1 - y2;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
}
function checkClickButton(touch, button) {
    // button area
    var x1 = button.getPositionX() - button.getBoundingBox().width/2;
    var x2 = button.getPositionX() + button.getBoundingBox().width/2;
    var y1 = button.getPositionY() - button.getBoundingBox().height/2;
    var y2 = button.getPositionY() + button.getBoundingBox().height/2;
    // check if touched in button area
    return (x1 < touch.getLocation().x && touch.getLocation().x < x2 && y1 < touch.getLocation().y && touch.getLocation().y < y2)
}

var ScreenBattle = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,
    _levelManager:null,

    ctor:function() {
        //this._levelManager = new LevelManager(this);
        this.sound = true;
        this._super();
        this.scrSize = cc.director.getVisibleSize();
        // add background
        this.background = cc.Sprite.create(battle_res.map_background_0000);
        // SCALE RATE
        this.SCALE_RATE = this.scrSize.width/(this.background.getContentSize().width*2);
        this.background.setScale(this.SCALE_RATE*2);
        this.background.attr({ x: this.scrSize.width/2, y: this.scrSize.height/2 });
        this.background.setLocalZOrder(0);
        this.addChild(this.background);
        this.cellsInARow = 7;
        this.cellsInACol = 7;
        this.totalCells = this.cellsInARow*this.cellsInACol;

        this.initTheGame();

        this.schedule(this.update);
    },
    initTheGame: function() {   // init các giá trị, hiển thị hình ảnh trước khi vào game
        this.drawBackgroundMap();
        this.generateTopographic();

        cc.eventManager.removeAllListeners();
        // add click listener to start game
        this.addClickListener();
        // init values for level


    },
    onEnter:function(){
        this._super();
    },
    onRemoved:function()
    {
        fr.unloadAllAnimationData(this);
    },
    update: function (dt){
        // mỗi khi màn hình được vẽ lại thì hàm này được gọi => tính toán vị trí, tọa độ
        // Todo: check collition

    },
    drawBackgroundMap:function()
    {
        // draw cells
        this.cells = [];
        this.mapStartX = this.scrSize.width*0.27;
        this.mapStartY = this.scrSize.height*0.7;
        this.standartCell = this.addSprite(battle_res.map_cell_0002, this.mapStartX, this.mapStartY, -12);
        this.cellSize = this.standartCell.getContentSize().width*0.83; //(width 77, height 91)
        for (var i = 0; i < this.cellsInACol; i++) {
            for (var j = 0; j < this.cellsInARow; j++) {
                var x = this.mapStartX + this.cellSize*j;
                var y = this.mapStartY - this.cellSize*i;
                var cell = this.addSprite(battle_res.map_cell_0002, x, y);
                this.cells.push(cell);
            }
        }
        // draw decoration
        this.addSprite(battle_res.map_river_0000, this.scrSize.width/2, this.scrSize.height, 0, this.SCALE_RATE*1.65);
        this.addSprite(battle_res.map_decoration_0001, this.scrSize.width*0.03, this.mapStartY);
        this.addSprite(battle_res.map_decoration_tree_0001, this.scrSize.width*0.05, this.mapStartY*0.8);
        this.addSprite(battle_res.map_decoration_0001, this.scrSize.width*0.03, this.mapStartY*0.5);
        this.addSprite(battle_res.map_decoration_tree_0002, this.scrSize.width*0.05, this.mapStartY*0.3);
        this.addSprite(battle_res.map_decoration_tree_0001, this.scrSize.width*0.05, this.mapStartY*0.2);
        this.addSprite(battle_res.map_decoration_0002, this.scrSize.width, this.scrSize.height*0.9);
        this.addSprite(battle_res.map_decoration_tree_0003, this.scrSize.width*0.05, this.mapStartY*0.1);
        this.addSprite(battle_res.map_decoration_tree_0001, this.scrSize.width*0.95, this.mapStartY*1.1);
        this.addSprite(battle_res.map_decoration_tree_0002, this.scrSize.width*0.95, this.mapStartY*0.95);
        this.addSprite(battle_res.map_decoration_tree_0003, this.scrSize.width*0.95, this.mapStartY*0.85);
        this.addSprite(battle_res.map_decoration_tree_0001, this.scrSize.width*0.95, this.mapStartY*0.7);
        this.addSprite(battle_res.map_decoration_tree_0002, this.scrSize.width*0.95, this.mapStartY*0.6);
        this.addSprite(battle_res.map_decoration_tree_0001, this.scrSize.width*0.95, this.mapStartY*0.5);
        this.addSprite(battle_res.map_decoration_tree_0003, this.scrSize.width*0.95, this.mapStartY*0.4);
        this.addSprite(battle_res.map_decoration_tree_0002, this.scrSize.width*0.95, this.mapStartY*0.3);
        this.addSprite(battle_res.map_decoration_tree_0001, this.scrSize.width*0.95, this.mapStartY*0.2);
        this.addSprite(battle_res.map_decoration_tree_0003, this.scrSize.width*0.95, this.mapStartY*0.1);
        // house & monster_gate
        this.monsterGate = this.addSprite(battle_res.map_monster_gate_player, this.mapStartX*1.15, this.mapStartY*1.25, 0, this.SCALE_RATE*1.3);
        this.house = this.addSprite(battle_res.map_house, this.scrSize.width*0.8, this.mapStartY*0.25, 0, this.SCALE_RATE*1.5);
    },
    generateTopographic:function()
    {
        this.obstacleCount = randomInt(5,7);
        this.obstaclePos = this.getObstaclePos(this.obstacleCount);
        const cThis = this;
        for (var i = 0; i < this.obstacleCount; i++) {
            var obst;
            var obstacleType = randomInt(2,3);
            switch (obstacleType) {
                case 2: 
                    obst = new Tree(this.obstaclePos[i].x, this.obstaclePos[i].y, 1, cThis.SCALE_RATE);
                    break;
                case 3: 
                    obst = new Rock(this.obstaclePos[i].x, this.obstaclePos[i].y, 1, cThis.SCALE_RATE);
                    break;
            }
            cThis.addChild(obst._img);
        }
    },
    getObstaclePos: function(obstacleCount) {
        const cThis = this;
        var posArray = [];
        for (var i = 0; i < obstacleCount; i++) {
            var cellIndex = randomInt(0, cThis.totalCells - 1);
            // Todo: check valid index
            posArray.push(cThis.convertCellIndexToCoord(cellIndex));
        }
        return posArray;

    },
    checkSideBySideCell: function(cellIndex1, cellIndex2) {
        return (cellIndex2 === cellIndex1 + 1 || cellIndex2 === cellIndex1 - 1 || cellIndex2 === cellIndex1 + this.cellsInARow || cellIndex2 === cellIndex1 - this.cellsInARow);
    },   
    convertCellIndexToCoord: function(index) {
        var xIndex = index%this.cellsInARow;
        var yIndex = Math.floor(index/this.cellsInARow);
        var xCoord = this.mapStartX + this.cellSize*xIndex;
        var yCoord = this.mapStartY - this.cellSize*yIndex + this.scrSize.height*0.02;
        return { x: xCoord, y: yCoord }
    },
    onStartGame:function()
    {
        // this.initTheClaw();
        // this.generateItem();
        // this.startCountDown();
        this.gameState = 1;
    },
    addClickListener:function() {
        // add event listener for layer
        const cThis = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                
                return true;
            },
        }, this);
        
    },
    // checkSystemAndPlaySound: function(soundName, isLoop = false) {
    //     var soundFile_ogg = "assests/game/golddigger/media/" + soundName + ".ogg";
    //     var soundFile_mp3 = "assests/game/golddigger/media/" + soundName + ".mp3";
    //     if (this.sound)
    //         cc.audioEngine.playMusic(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? soundFile_ogg : soundFile_mp3, isLoop);
    // },
    addSprite: function(resource, xPos, yPos, zOrder, scaleRate) {
        zOrder = zOrder || 0;
        scaleRate = scaleRate || this.SCALE_RATE;
        sprite = cc.Sprite.create(resource);
        sprite.setScale(scaleRate);
        sprite.attr({ x: xPos, y: yPos });
        sprite.setLocalZOrder(zOrder);
        this.addChild(sprite);
        return sprite;
    }

});