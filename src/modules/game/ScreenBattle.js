
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
        this.HP = 10;   // HP = 0 thì thua
        this.score = 0; // diệt quái tăng điểm
        this.gameState = 0;

        this.initTheGame();

        this.schedule(this.update);
    },
    initTheGame: function() {   // init các giá trị, hiển thị hình ảnh trước khi vào game
        cc.eventManager.removeAllListeners();
        this.drawBackgroundMap();
        this.generateTopographic();
        this.generateMonsters();
        this.onStartGame();

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
        this._utility = new Utility(this.cellsInARow, this.cellsInACol, this.cellSize, this.scrSize, this.mapStartX, this.mapStartY);
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
        // display HP
        this.HPBox = gv.commonText(this.HP, this.scrSize.width*0.8, this.mapStartY*0.4);
        this.HPBox.setLocalZOrder(20);
        this.HPBox.setFontSize(this.scrSize.width/30);
        this.addChild(this.HPBox);
        // display score
        this.addSprite(battle_res.common_icon_trophy, this.scrSize.width*0.05, this.scrSize.height*0.95, 1, this.SCALE_RATE*0.5);
        this.scoreBox = gv.commonText(this.score, this.scrSize.width*0.1, this.scrSize.height*0.95);
        this.scoreBox.setLocalZOrder(20);
        this.scoreBox.setFontSize(this.scrSize.width/30);
        this.addChild(this.scoreBox);
    },
    generateTopographic:function()
    {
        this.obstacleCount = this._utility.randomInt(5,7);
        this.obstaclePos = this.getObstaclePos(this.obstacleCount);
        const cThis = this;
        for (var i = 0; i < this.obstacleCount; i++) {
            var obst;
            var obstacleType = this._utility.randomInt(2,3);
            var xPos = this._utility.convertCellIndexToCoord(this.obstaclePos[i]).x;
            var yPos = this._utility.convertCellIndexToCoord(this.obstaclePos[i]).y;
            switch (obstacleType) {
                case 2: 
                    obst = new Tree(xPos, yPos, 1, cThis.SCALE_RATE);
                    break;
                case 3: 
                    obst = new Rock(xPos, yPos, 1, cThis.SCALE_RATE);
                    break;
            }
            cThis.addChild(obst._img);
        }
    },
    getObstaclePos: function(obstacleCount) {
        const cThis = this;
        var indexArray = [];
        var c = obstacleCount;
        while (c != 0) {
            var cellIndex = this._utility.randomInt(0, cThis.totalCells - 1);
            if (cThis.checkValidObstacleIndex(cellIndex, indexArray)) {
                indexArray.push(cellIndex);
                c--;
            }
        }
        return indexArray;
    },
    checkValidObstacleIndex: function(cellIndex, indexArray) {
        if (cellIndex === 0 || cellIndex === this.totalCells - 1) return false; // vị trí này sẽ chặn đường quái
        for (var i = 0; i < indexArray.length; i++) {
            if (indexArray[i] === cellIndex || this.checkSideBySideCell(cellIndex, indexArray[i]))
                return false;
            if (indexArray[i] === cellIndex - 6 || indexArray[i] === cellIndex + 6) // vị trí này sẽ chặn đường quái
                return false;
        }
        return true;
    },
    checkSideBySideCell: function(cellIndex1, cellIndex2) {
        return (cellIndex2 === cellIndex1 + 1 || cellIndex2 === cellIndex1 - 1 || cellIndex2 === cellIndex1 + this.cellsInARow || cellIndex2 === cellIndex1 - this.cellsInARow);
    },
    generateMonsters:function()
    {
        const cThis = this;
        cThis.monsters = [];
        var interval = setInterval(function () {
            if (cThis.gameState != 2)
                cThis.addNewMonster();
        }, 2000);
    },
    addNewMonster: function() {
        var monst;
        var monsterPos = 0;
        var monsterType = this._utility.randomInt(1,4);//(1,4)
        var xPos = this._utility.convertCellIndexToCoord(monsterPos).x;
        var yPos = this._utility.convertCellIndexToCoord(monsterPos).y;
        switch (monsterType) {
            case 1: 
                monst = new Assassin(xPos, yPos, this.SCALE_RATE);
                break;
            case 2: 
                monst = new DarkGiant(xPos, yPos, this.SCALE_RATE);
                break;
            case 3: 
                monst = new Iceman(xPos, yPos, this.SCALE_RATE);
                break;
            case 4: 
                monst = new Bat(xPos, yPos, this.SCALE_RATE);
                break;
        }
        this.addChild(monst._img);
        this.monsters.push(monst);
    },
    moveMonsters: function() {
        const cThis = this;
        for (var index = this.monsters.length - 1; index >= 0; index--) {
            var monst = this.monsters[index];
            var xPos = monst._img.getPositionX();
            var yPos = monst._img.getPositionY();
            if (!cThis._utility.reachHousePoint(xPos, yPos)) { // quái chưa đến nhà chính
                // move                
                if (!monst._flyable) {  // Todo: check collision
                    if(!cThis.checkTouchObstacle(xPos, yPos-5)) {
                        monst.moveDown(100);
                    }
                    else {
                        monst.moveRight(100);
                    }
                    // try to move down, if can't, try to move right
                    //if ()
                }
                else {
                    monst.moveDown(100);
                    monst.moveRight(100);
                }
            }
            else {  // reach the house
                if (this.gameState === 1) {
                    cThis.HP--;
                    this.HPBox.setString(cThis.HP);
                    cThis.monsters.splice(index, 1);
                    cThis.removeChild(monst._img, true);
                    if (cThis.HP <= 0) cThis.onGameOver();
                }
            }
        }
    },
    checkTouchObstacle: function(xPos, yPos)   {
        var isTouch = false;
        if (this._utility.reachBottomBorder(xPos, yPos))
            isTouch = true;
        this.obstaclePos.forEach((obs, index) => {
            centerX = this._utility.convertCellIndexToCoord(obs).x;
            centerY = this._utility.convertCellIndexToCoord(obs).y;
            if (centerX - this.cellSize <= xPos && xPos <= centerX + this.cellSize &&
                centerY - this.cellSize <= yPos && yPos <= centerY + this.cellSize) {
                isTouch = true;
            }
        })
        return isTouch;
    },
    onStartGame:function()
    {
        this.gameState = 1;
        const cThis = this;
        var interval = setInterval(function () {
            cThis.moveMonsters();
        }, 1000);
    },
    onGameOver: function() {
        this.gameState = 2;
        this.checkSystemAndPlaySound("gameover");
        // text Game over
        this.txtGameOver = this.addSprite(battle_res.textgameover_sheet0, this.scrSize.width/2, this.scrSize.height/2, 15);
        this.txtGameOver.runAction(cc.repeat(cc.sequence(cc.scaleBy(1.5, 1.1),cc.scaleBy(1.5, 0.9)),3));
    },
    addClickListener:function() {
        // add event listener for layer
        const cThis = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                if (cThis.gameState === 2) {
                    // restart game
                    fr.view(ScreenBattle);
                }
                return true;
            },
        }, this);
        
    },
    checkSystemAndPlaySound: function(soundName, isLoop = false) {
        var soundFile_ogg = "assests/game/golddigger/media/" + soundName + ".ogg";
        var soundFile_mp3 = "assests/game/golddigger/media/" + soundName + ".mp3";
        if (this.sound)
            cc.audioEngine.playMusic(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? soundFile_ogg : soundFile_mp3, isLoop);
    },
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