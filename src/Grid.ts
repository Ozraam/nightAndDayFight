export class Grid {
    ctx: CanvasRenderingContext2D;
    numberOfRow: number;
    numberOfColumn: number;
    grid: any;
    squareWidth: number;


    constructor(ctx: CanvasRenderingContext2D, numberOfRow: number, numberOfColumn: number, squareWidth: number, initialValueFunction: (i: number, j: number) => number = () => 0){
        this.ctx = ctx;
        this.numberOfRow = numberOfRow;
        this.numberOfColumn = numberOfColumn;
        this.squareWidth = squareWidth;
        this.grid = [];
        for (let i = 0; i < numberOfRow; i++) {
            this.grid[i] = [];
            for (let j = 0; j < numberOfColumn; j++) {
                this.grid[i][j] = initialValueFunction(i, j);
            }
        }
    }

    public get size() : {width: number, height: number} {
        return {
            width: this.numberOfColumn * this.squareWidth,
            height: this.numberOfRow * this.squareWidth
        };
    }

    public get rectangleSize() : {width: number, height: number} {
        return {
            width: this.squareWidth,
            height: this.squareWidth
        };
    }
}