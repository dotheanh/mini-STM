
var Utility = cc.Class.extend({
    ctor:function(cellsInARow, cellsInACol, cellSize, scrSize, mapStartX, mapStartY){
        this._cellsInARow = cellsInARow;
        this._cellsInACol = cellsInACol;
        this._cellSize = cellSize;
        this._scrSize = scrSize;
        this._mapStartX = mapStartX;
        this._mapStartY = mapStartY;
        this._topBorder = this._mapStartY;
        this._bottomBorder = this._mapStartY - this._cellSize*6;
        this._leftBorder = this._mapStartX;
        this._rightBorder = this._mapStartX + this._cellSize*6;
    },
    convertCellIndexToCoord: function(index) {
        var xIndex = index%this._cellsInARow;
        var yIndex = Math.floor(index/this._cellsInARow);
        var xCoord = this._mapStartX + this._cellSize*xIndex;
        var yCoord = this._mapStartY - this._cellSize*yIndex + this._scrSize.height*0.02;
        return { x: xCoord, y: yCoord }
    },
    isInsideMap: function(x, y) {
        return (x < this._rightBorder || x > this._leftBorder || y < this._topBorder || y > this._bottomBorder)
    }
});
