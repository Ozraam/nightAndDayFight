export class Position {
    x: number;
    y: number;
    static ZERO: Position = new Position(0, 0);

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    add(pos: Position): Position {
        return new Position(this.x + pos.x, this.y + pos.y);
    }

    substract(pos: Position): Position {
        return new Position(this.x - pos.x, this.y - pos.y);
    }

    multiply(nb: number): Position {
        return new Position(this.x * nb, this.y * nb);
    }

    divide(nb: number): Position {
        return new Position(this.x / nb, this.y / nb);
    }

    normalize(): Position {
        const length = this.length;
        return new Position(this.x / length, this.y / length);
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    get lenghtSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    static fromEvent(event: MouseEvent): Position {
        return new Position(event.clientX, event.clientY);
    }

    rotate(angle: number): Position {
        return new Position(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
    }

    angleBetween(direction: Position) {
        return direction.angle - this.angle;
    }
};