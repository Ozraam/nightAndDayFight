import { GameManager } from "./GameManager";
import { AnimatedObject, Collision } from "./Types";
import { ballCollidingWithLines, drawDisc, drawLine, groupElementInArrayByN } from "./utils";
import { Position } from "./Position";

export class Ball implements AnimatedObject {
    position: Position;
    radius: number;
    velocity: Position = new Position(0, 0);
    direction: Position = new Position(1, 1);
    color: string = 'gray';

    draw(manager: GameManager): void {
        drawDisc(manager.ctx, this.position, this.radius, this.color);

        //drawLine(manager.ctx, [this.position, this.position.add(this.direction.normalize().multiply(100))]);
    }

    update(manager: GameManager): void {
        const velocity = this.direction.normalize().multiply(0.1);
        this.position = this.position.add(velocity.multiply(100));
        
        if (this.position.x - this.radius < 0 || this.position.x + this.radius > manager.ctx.canvas.width) {
            this.direction.x *= (-1 + Math.random() * 0.9 - 0.45);
            this.direction.y *= (1 + Math.random() * 0.3 - 0.15);
        }

        if (this.position.y - this.radius < 0 || this.position.y + this.radius > manager.ctx.canvas.height) {
            this.direction.y *= (-1 + Math.random() * 0.9 - 0.45);
            this.direction.x *= (1 + Math.random() * 0.3 - 0.15);
        }


        const ms = manager.environment.get('mS')!;

        const lines = groupElementInArrayByN(ms.lines, 2) as [Position, Position][];
        
        const colliding = ballCollidingWithLines(this, lines);

        if (colliding) {
            const lineNormal = colliding.collider.normal.end.substract(colliding.collider.normal.start).normalize();
            
            const angle = lineNormal.angleBetween(this.direction);
            
            const newDirection = this.direction.multiply(-1).rotate(-angle * 2);

            this.direction = newDirection;

        }
        

    }

    constructor(position: Position, radius = 10) {
        this.radius = radius;
        this.position = position;
    }
}