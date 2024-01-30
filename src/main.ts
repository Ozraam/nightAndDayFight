import { MarchingSquare } from './marchingSquare';
import { setup, drawPoint } from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const { screenW, screenH, numberOfRow, numberOfColumn, squareWidth, grid } = setup(ctx, canvas);

const mS = new MarchingSquare(grid, .5);
mS.processMarchingSquare();
mS.drawLines();
let frames = 0;
function draw() {
    frames++;
    ctx.clearRect(0, 0, screenW, screenH);
    
    mS.limit = Math.sin(frames / 100) / 2 + .5;
    mS.processMarchingSquare();



    mS.drawLines();


    requestAnimationFrame(draw);
}

// draw()

