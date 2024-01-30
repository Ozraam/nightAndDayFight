import { Grid } from "./Grid";
import { Position } from "./Types";
import { drawLine } from "./utils";

export class MarchingSquare {
    private _grid: Grid;
    private _lines : Position[] = [];

    // limit of whitch the corner is considered as a line
    private _limit: number;

    // 0: top, 1: right, 2: bottom, 3: left
    static readonly line = [
        [], // 0
        [[0, 0.5], [0.5, 1]], // 1
        [[0.5, 1], [1, 0.5]], // 2
        [[0, .5], [1, .5]], // 3
        [[0.5, 0], [1, 0.5]], // 4
        [[0.5, 0], [0, .5], [1, .5], [0.5, 1]], // 5
        [[.5, 0], [.5, 1]], // 6
        [[.5, 0], [0, .5]], // 7
        [[.5, 0], [0, .5]], // 8
        [[.5, 0], [.5, 1]], // 9
        [[.5, 0], [1, .5], [0, .5], [.5, 1]], // 10
        [[0.5, 0], [1, 0.5]], // 11
        [[0, .5], [1, .5]], // 12
        [[0.5, 1], [1, 0.5]], // 13
        [[0, 0.5], [0.5, 1]],
        []
    ];
    
    public set limit(limit: number) {
        this._limit = limit;
    }

    constructor(grid: Grid, limit: number = 0.5) {
        this._grid = grid;
        this._limit = limit;
    }

    public get grid(): Grid {
        return this._grid;
    }

    public set grid(grid: Grid) {
        this._grid = grid;
    }

    public processMarchingSquare() {
        this._lines = [];
        for (let i = 0; i < this._grid.numberOfRow - 1; i++) {
            for (let j = 0; j < this._grid.numberOfColumn - 1; j++) {

                const squareValue = 
                    (this._grid.grid[i][j + 1] > this._limit ? 1 : 0) +
                    (this._grid.grid[i + 1][j + 1] > this._limit ? 2 : 0) +
                    (this._grid.grid[i + 1][j] > this._limit ? 4 : 0) +
                    (this._grid.grid[i][j] > this._limit ? 8 : 0);
                
            
                const line = MarchingSquare.line[squareValue]
                    .map(([y, x]) => {
                        return {
                            x: j * this._grid.cellSize.width + x * this._grid.rectangleSize.width, 
                            y: i * this._grid.cellSize.height + y * this._grid.rectangleSize.height
                        }
                });

                this._lines = this._lines.concat(line);
            }
        }
    }

    public drawLines() {
    

        this._grid.ctx.strokeStyle = 'white';
        this._grid.ctx.lineWidth = 2;

        for (let i = 0; i < this._lines.length - 1; i+=2) {
            drawLine(this._grid.ctx, [this._lines[i], this._lines[i + 1]]);
        }
    }

}