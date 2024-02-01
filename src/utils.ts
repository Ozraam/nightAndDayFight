import { Ball } from "./Ball";
import { Grid } from "./Grid";
import { Line } from "./Line";
import { Position } from "./Position";
import { Collision } from "./Types";

export function setup(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);

    const screenH = ctx.canvas.height;
    const screenW = ctx.canvas.width;
    canvas.width = screenW;
    canvas.height = screenH;
    canvas.setAttribute('width', screenW.toString());
    canvas.setAttribute('height', screenH.toString());

    const numberOfRow = 100;
    const numberOfColumn = 100;

    const squareWidth = screenW / numberOfColumn;
    const squareHeight = screenH / numberOfRow;
    
    const grid = new Grid(ctx, numberOfRow + 1, numberOfColumn + 1, {
        width: squareWidth,
        height: squareHeight
    }, (_: Position, posOnScreen: Position) => {
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

export function ballCollidingWithLine(ball: Ball, line: [Position, Position]) : Collision | null {
    const [p1, p2] = line;
    const [x1, y1] = [p1.x, p1.y];
    const [x2, y2] = [p2.x, p2.y];
    const [x, y] = [ball.position.x, ball.position.y];
    const r = ball.radius;

    const d = Math.abs((x2 - x1) * (y1 - y) - (x1 - x) * (y2 - y1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (d > r) return null;

    const dotproduct = (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
    if (dotproduct < 0) return null;

    const squaredlengthba = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (dotproduct > squaredlengthba) return null;

    return {
        collider: new Line(p1, p2),
        position: new Position(
                x1 + (x2 - x1) * dotproduct / squaredlengthba,
                y1 + (y2 - y1) * dotproduct / squaredlengthba
            )
        };
}

export function ballCollidingWithLines(ball: Ball, lines: [Position, Position][]) : Collision | null {
    for (let i = 0; i < lines.length; i++) {
        const collision = ballCollidingWithLine(ball, lines[i]);
        if (collision) return collision;
    }
    return null;
}

export function groupElementInArrayByN<T>(array: T[], n: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += n) {
        result.push(array.slice(i, i + n));
    }
    return result;
}