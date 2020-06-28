export class Paddle {

    constructor(public x: number, 
                public y: number,
                public w: number,
                public h: number,
                public speed: number,
                public dx: number,
                public ctx: CanvasRenderingContext2D) {}

    drawPaddle(): void {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = '#0095dd';
        this.ctx.fill();
        this.ctx.closePath();
    }
}