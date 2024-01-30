export type Position = {
    x: number;
    y: number;
};

export type Size = {
    width: number;
    height: number;
};

export interface AnimatedObject extends Object {
    update(): void;
    draw(): void;
}

class Object {
    position: Position;
    constructor(position: Position) {
        this.position = position;
    }
}