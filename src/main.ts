import { MarchingSquare } from './marchingSquare';
import { setup } from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const { screenW, screenH, grid } = setup(ctx, canvas);

const mS = new MarchingSquare(grid, .5);
mS.processMarchingSquare();

let frames = 0;
function draw() {
    frames++;
    ctx.clearRect(0, 0, screenW, screenH);
    
    mS.processMarchingSquare();

    mS.drawLines();

    requestAnimationFrame(draw);
}

draw()

