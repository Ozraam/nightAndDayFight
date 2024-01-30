import { Grid } from "./Grid";

export function setup(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);

    const screenH = window.innerHeight;
    const screenW = window.innerWidth;
    canvas.width = screenW;
    canvas.height = screenH;

    const squareWidth = 10;
    const numberOfRow = Math.floor(screenH / squareWidth);
    const numberOfColumn = Math.floor(screenW / squareWidth);

    const grid = new Grid(ctx, numberOfRow, numberOfColumn, squareWidth, (i, j) => {
        return distance(i, j, numberOfRow / 2, numberOfColumn / 2) / (numberOfRow / 2);
    });
    
    return { screenW, screenH, numberOfRow, numberOfColumn, squareWidth, grid };
}

export function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, color: string = 'white', size: number = 1) {
    ctx.fillStyle = color;
    ctx.fillRect(x - Math.floor(size / 2), y - Math.floor(size / 2), size, size);
}

export function drawLine(ctx: CanvasRenderingContext2D, line: number[][]) {
    ctx.beginPath();
    ctx.moveTo(line[0][0], line[0][1]);
    for (let i = 1; i < line.length; i++) {
        ctx.lineTo(line[i][0], line[i][1]);
    }
    ctx.stroke();
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
    ctx.fillStyle = 'white';
    ctx.font = '10px Arial';
    ctx.fillText(text, x, y);
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}