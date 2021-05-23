// generate random
function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function calDistance(x1, y1, x2, y2) {
    let deltaX = x1 - x2;
    let deltaY = y1 - y2;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
}
function checkClickButton(touch, button) {
    // button area
    let x1 = button.getPositionX() - button.getBoundingBox().width/2;
    let x2 = button.getPositionX() + button.getBoundingBox().width/2;
    let y1 = button.getPositionY() - button.getBoundingBox().height/2;
    let y2 = button.getPositionY() + button.getBoundingBox().height/2;
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
        this.background = cc.Sprite.create("assests/game/map/map_background_0000.png");
        // SCALE RATE
        this.SCALE_RATE = this.scrSize.width/this.background.getContentSize().width;
        this.background.setScale(this.SCALE_RATE);
        this.background.attr({ x: this.scrSize.width/2, y: this.scrSize.height/2 });
        this.background.setLocalZOrder(0);
        this.addChild(this.background);

        this.initTheGame();

        this.schedule(this.update);
    },
    initTheGame: function() {   // init các giá trị, hiển thị hình ảnh trước khi vào game
        // Todo: kiểm tra tất cả sprite item, có cái nào thì remove hết ra rồi tạo lại

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
    //     let soundFile_ogg = "assests/game/golddigger/media/" + soundName + ".ogg";
    //     let soundFile_mp3 = "assests/game/golddigger/media/" + soundName + ".mp3";
    //     if (this.sound)
    //         cc.audioEngine.playMusic(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? soundFile_ogg : soundFile_mp3, isLoop);
    // },
    // addSprite: function(resFolder, imgName, xPos, yPos, zOrder, scaleRate) {
    //     zOrder = zOrder || 0;
    //     scaleRate = scaleRate || this.SCALE_RATE;
    //     sprite = cc.Sprite.create("assests/game/" + resFolder + "/" + imgName + ".png");
    //     sprite.setScale(scaleRate);
    //     sprite.attr({ x: xPos, y: yPos });
    //     sprite.setLocalZOrder(zOrder);
    //     this.addChild(sprite);
    //     return sprite;
    // }

});