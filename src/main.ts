import { GameManager } from './GameManager';
import { Position } from './Position';
import { Ball } from './Ball';
import { MarchingSquare } from './marchingSquare';
import { setup } from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const { screenW, screenH, grid } = setup(ctx, canvas);

const mS = new MarchingSquare(grid, .5);
mS.processMarchingSquare();

const manager = new GameManager(ctx);

const moon = new Ball(new Position(400, screenH/2), 20);

const sun = new Ball(new Position(1400, screenH/2), 20, -0.1);
sun.color = 'yellow';
sun.direction = sun.direction.multiply(-1);

manager.addObject(moon, sun)

manager.environment.set('mS', mS);

let frames = 0;
function draw() {
    frames++;
    ctx.clearRect(0, 0, screenW, screenH);
    
    mS.processMarchingSquare();

    mS.drawLines();

    // mS.limit = Math.sin(frames / 1000) * 0.5 + 0.5;

    manager.update(2);
    manager.draw();

    requestAnimationFrame(draw);
}

draw()

