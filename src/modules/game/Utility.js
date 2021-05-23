
var Utility = cc.Class.extend({
    ctor:function(cellsInARow, cellsInACol, cellSize, scrSize, mapStartX, mapStartY){
        this._cellsInARow = cellsInARow;
        this._cellsInACol = cellsInACol;
        this._cellSize = cellSize;
        this._scrSize = scrSize;
        this._mapStartX = mapStartX;
        this._mapStartY = mapStartY;
    },
    convertCellIndexToCoord: function(index) {
        var xIndex = index%this._cellsInARow;
        var yIndex = Math.floor(index/this._cellsInARow);
        var xCoord = this._mapStartX + this._cellSize*xIndex;
        var yCoord = this._mapStartY - this._cellSize*yIndex + this._scrSize.height*0.02;
        return { x: xCoord, y: yCoord }
    }
});
