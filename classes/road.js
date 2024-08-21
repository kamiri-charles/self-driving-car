import { lerp } from "../utils.js";

export default class Road {
	constructor(x, width, lane_count = 3) {
		this.x = x;
		this.width = width;
		this.lane_count = lane_count;

		this.left = this.x - this.width / 2;
		this.right = this.x + this.width / 2;

		const infinity = 1000000;
		this.top = -infinity;
		this.bottom = infinity;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
	}

    getLaneCenter(lane_idx) {
        const lane_width = this.width / this.lane_count;

        return this.left + lane_width / 2 + Math.min(lane_idx, this.lane_count - 1) * lane_width;

    }
	draw(context) {
		context.lineWidth = 5;
		context.strokeStyle = "white";

		for (let i = 1; i <= this.lane_count - 1; i++) {
			const x = lerp(this.left, this.right, i / this.lane_count);

			context.setLineDash([20, 20]);
			

			context.beginPath();
			context.moveTo(x, this.top);
			context.lineTo(x, this.bottom);
			context.stroke();
		}

		context.setLineDash([]);

		this.borders.forEach(border => {
			context.beginPath();
			context.moveTo(border[0].x, border[0].y);
			context.lineTo(border[1].x, border[1].y);
			context.stroke();
		});
	}
}
