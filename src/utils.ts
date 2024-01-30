import { Grid } from "./Grid";
import { Position } from "./Types";

export function setup(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);

    const screenH = ctx.canvas.height;
    const screenW = ctx.canvas.width;
    canvas.width = screenW;
    canvas.height = screenH;

    const numberOfRow = 100;
    const numberOfColumn = 100;

    const squareWidth = screenW / numberOfColumn;
    const squareHeight = screenH / numberOfRow;
    
    const grid = new Grid(ctx, numberOfRow + 1, numberOfColumn + 1, {
        width: squareWidth,
        height: squareHeight
    }, (_: Position, posOnScreen: Position) => {
        console.log(posOnScreen.x / screenW);
        
        return posOnScreen.x / screenW;
    });
    
    return { screenW, screenH, numberOfRow, numberOfColumn, squareWidth, grid };
}

export function drawPoint(ctx: CanvasRenderingContext2D, pos: Position, color: string = 'white', size: number = 1) {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x - Math.floor(size / 2), pos.y - Math.floor(size / 2), size, size);
}

export function drawLine(ctx: CanvasRenderingContext2D, line: Position[]) {
    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    for (let i = 1; i < line.length; i++) {
        ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, pos: Position) {
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.fillText(text, pos.x, pos.y);
}

export function distance(p1: Position, p2: Position) {
    return Math.sqrt(Math.pow(p2.x-p1.x, 2) + Math.pow(p2.y-p1.y, 2));
}

export function drawDisc(ctx: CanvasRenderingContext2D, pos: Position, radius: number, color: string = 'white') {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fill();
}