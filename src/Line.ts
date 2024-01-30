import { Position } from "./Position";

export class Line {
    start: Position;
    end: Position;

    constructor(start: Position, end: Position) {
        this.start = start;
        this.end = end;
    }
    get length() {
        return Math.sqrt(Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2));
    }
    get slope() {
        return (this.end.y - this.start.y) / (this.end.x - this.start.x);
    }
    get yIntercept() {
        return this.start.y - this.slope * this.start.x;
    }
    get xIntercept() {
        return this.start.x - this.yIntercept / this.slope;
    }
    get midpoint() {
        return new Position((this.start.x + this.end.x) / 2, (this.start.y + this.end.y) / 2);
    }
    get normal() {
        return new Line(this.midpoint, new Position(this.midpoint.x + (this.end.y - this.start.y), this.midpoint.y - (this.end.x - this.start.x)));
    }

    angleBetween(line: Line) {
        return Math.atan2(line.slope - this.slope, 1 + this.slope * line.slope);
    }
}