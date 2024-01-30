import { Position } from "./Position";
import { Size } from "./Types";
import { drawPoint } from "./utils";

export class Grid {
    ctx: CanvasRenderingContext2D;
    numberOfRow: number;
    numberOfColumn: number;
    grid: number[][];
    cellSize: Size;


    constructor(
        ctx: CanvasRenderingContext2D, 
        numberOfRow: number, 
        numberOfColumn: number, 
        cellSize: Size, 
        initialValueFunction: (pos: Position, posOnScreen: Position) => number = () => 0
    ){
        this.ctx = ctx;
        this.numberOfRow = numberOfRow;
        this.numberOfColumn = numberOfColumn;
        this.cellSize = cellSize;
        this.grid = [];
        for (let i = 0; i < numberOfRow; i++) {
            this.grid[i] = [];
            for (let j = 0; j < numberOfColumn; j++) {
                this.grid[i][j] = initialValueFunction(new Position(j, i), new Position(j * cellSize.width, i * cellSize.height));
            }
        }
    }

    public get size() : Size {
        return {
            width: this.numberOfColumn * this.cellSize.width,
            height: this.numberOfRow * this.cellSize.height
        };
    }

    public get rectangleSize() : Size {
        return {
            width: this.cellSize.width,
            height: this.cellSize.height
        };
    }

    drawGrid() {
        this.grid.forEach((row, i) => {
            row.forEach((value, j) => {
                drawPoint(this.ctx, new Position(j * this.cellSize.width, i * this.cellSize.height), 'white', 2);
            });
        });
    }
}