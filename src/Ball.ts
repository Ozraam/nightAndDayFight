import { GameManager } from "./GameManager";
import { AnimatedObject } from "./Types";
import { ballCollidingWithLines, drawDisc, groupElementInArrayByN } from "./utils";
import { Position } from "./Position";

export class Ball implements AnimatedObject {
    position: Position;
    radius: number;
    velocity: Position = new Position(0, 0);
    direction: Position = new Position(1, 1);
    color: string = 'gray';

    substractValue: number;

    draw(manager: GameManager): void {
        drawDisc(manager.ctx, this.position, this.radius, this.color);

        // drawText(manager.ctx, `x: ${this.position.x.toFixed(2)}, y: ${this.position.y.toFixed(2)}`, this.position.add(new Position(0, -60)));
        // drawText(manager.ctx, `x: ${this.position.x.toFixed(2)}, y: ${this.position.y.toFixed(2)}`, this.position.add(new Position(0, 60)));

        // drawText(manager.ctx, `x: ${this.direction.x.toFixed(2)}, y: ${this.direction.y.toFixed(2)}`, this.position.add(new Position(0, -40)));
        // drawText(manager.ctx, `x: ${this.direction.x.toFixed(2)}, y: ${this.direction.y.toFixed(2)}`, this.position.add(new Position(0, 40)));    


        //drawLine(manager.ctx, [this.position, this.position.add(this.direction.normalize().multiply(100))]);
    }

    update(manager: GameManager): void {
        const velocity = this.direction.normalize().multiply(0.1);
        this.position = this.position.add(velocity.multiply(100));
        
        if (this.position.x + this.radius > manager.ctx.canvas.width) {
            this.direction.x = Math.abs(this.direction.x) * (-1 + Math.random() * 0.9);
            this.position.x = manager.ctx.canvas.width - this.radius;
            this.direction.y *= (1 + Math.random() * 0.3);
        }

        if(this.position.x - this.radius < 0) {
            this.direction.x = Math.abs(this.direction.x) * (1 + Math.random() * 0.9);
            this.position.x = this.radius;
            this.direction.y *= (1 + Math.random() * 0.3);
        }

        if (this.position.y - this.radius < 0 || this.position.y + this.radius > manager.ctx.canvas.height) {
            this.direction.y *= (-1 + Math.random() * 0.9);
            this.position.y = Math.min(Math.max(this.position.y, this.radius), manager.ctx.canvas.height - this.radius);
            this.direction.x *= (1 + Math.random() * 0.9);
        }

        if(this.direction.x < 0.3 && this.direction.x > -0.3) {
            this.direction.x = 0.3 * Math.sign(this.direction.x);
        }

        if(this.direction.y < 0.3 && this.direction.y > -0.3) {
            this.direction.y = 0.3 * Math.sign(this.direction.y);
        }

        this.direction.x = Math.max(-1, Math.min(1, this.direction.x));
        this.direction.y = Math.max(-1, Math.min(1, this.direction.y));


        // drawText(manager.ctx, `${this.position.y + this.radius > manager.ctx.canvas.height}, ${this.position.y + this.radius}, ${manager.ctx.canvas.height}`, this.position.add(new Position(0, -80)));
        // drawText(manager.ctx, `${this.position.y - this.radius < 0}, ${this.position.y - this.radius}, ${manager.ctx.canvas.height}`, this.position.add(new Position(0, 80)));
        const ms = manager.environment.get('mS')!;

        const lines = groupElementInArrayByN(ms.lines, 2) as [Position, Position][];
        
        const colliding = ballCollidingWithLines(this, lines);

        if (colliding) {
            const lineNormal = colliding.collider.normal.end.substract(colliding.collider.normal.start).normalize();
            
            const angle = lineNormal.angleBetween(this.direction);
            
            const newDirection = this.direction.multiply(-1).rotate(-angle * 2);

            this.direction = newDirection;

            const points = colliding.collider.start.getMeta('points') as number[][];

            ms.grid.grid[points[0][0]][points[0][1]] -= this.substractValue * Math.random();
            ms.grid.grid[points[1][0]][points[1][1]] -= this.substractValue * Math.random();
            ms.grid.grid[points[2][0]][points[2][1]] -= this.substractValue * Math.random();
            ms.grid.grid[points[3][0]][points[3][1]] -= this.substractValue * Math.random();

            points.forEach(([i, j]) => {
                ms.grid.grid[i][j] = Math.max(0, Math.min(ms.grid.grid[i][j], 1));
            });
        }
        

    }

    constructor(position: Position, radius = 10, subValue = 0.1) {
        this.radius = radius;
        this.position = position;
        this.substractValue = subValue;
    }
}