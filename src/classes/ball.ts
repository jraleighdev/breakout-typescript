export class Ball {

    constructor(public x: number,
                public y: number,
                public size: number,
                public speed: number,
                public dx: number,
                public dy: number,
                public ctx: CanvasRenderingContext2D) {

    }

    drawBall(): void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = '#0095dd';
        this.ctx.fill();
        this.ctx.closePath();
    }
}