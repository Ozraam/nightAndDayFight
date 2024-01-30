import { GameManager } from "./GameManager";
import { Line } from "./Line";
import { Position } from "./Position";

export type Size = {
    width: number;
    height: number;
};

export interface AnimatedObject extends Object {
    update(manager: GameManager): void;
    draw(manager: GameManager): void;
}

class Object {
    position: Position;
    constructor(position: Position) {
        this.position = position;
    }
}

export type Collision = {
    collider: Line;
    position: Position;
};