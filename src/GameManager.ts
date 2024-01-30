import { Position } from "./Position";
import { AnimatedObject } from "./Types";

export class GameManager {
    ctx: CanvasRenderingContext2D;
    private _objects: AnimatedObject[];

    mousePosition: Position = new Position(0, 0);

    environment: Map<string, any> = new Map();

    constructor(ctx: CanvasRenderingContext2D) {
        this._objects = [];
        this.ctx = ctx;

        this.ctx.canvas.addEventListener('mousemove', (e) => {
            const rect = this.ctx.canvas.getBoundingClientRect();
            this.mousePosition = new Position(e.clientX - rect.left, e.clientY - rect.top);
        });
    }

    get objects() {
        return this._objects;
    }

    set objects(objects) {
        this._objects = objects;
    }
    
    addObject(...objects: AnimatedObject[]) {
        this.objects = this._objects.concat(objects);
    }

    removeObject(object: AnimatedObject) {
        this._objects = this._objects.filter(obj => obj !== object);
    }

    update() {
        this._objects.forEach(object => object.update(this));
    }

    draw() {
        this._objects.forEach(object => object.draw(this));
    }
}