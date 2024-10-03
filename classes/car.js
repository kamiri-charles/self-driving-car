import Controls from "./controls.js";
import Sensor from "./sensor.js";

export default class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.acceleration = 0.2;
		this.max_speed = 3;
		this.friction = 0.05;
		this.angle = 0;

        this.damaged = false;

		this.sensor = new Sensor(this);
		this.controls = new Controls();
	}

	#handle_movement() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.acceleration;
		}

		if (this.speed != 0) {
			const flip = this.speed > 0 ? 1 : -1;

			if (this.controls.left) {
				this.angle += 0.03 * flip;
			}
			if (this.controls.right) {
				this.angle -= 0.03 * flip;
			}
		}

		if (this.speed > this.max_speed) this.speed = this.max_speed;
		if (this.speed < -this.max_speed / 2) this.speed = -this.max_speed / 2;

		if (this.speed > 0) {
			this.speed -= this.friction;
		}

		if (this.speed < 0) {
			this.speed += this.friction;
		}

		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}

		this.x -= Math.sin(this.angle) * this.speed;
		this.y -= Math.cos(this.angle) * this.speed;
	}

	#create_polygon() {
		const points = [];
		const rad = Math.hypot(this.width, this.height) / 2;
		const alpha = Math.atan2(this.width, this.height);
		points.push({
			x: this.x - Math.sin(this.angle - alpha) * rad * 3,
			y: this.y - Math.cos(this.angle - alpha) * rad * 3,
		});

		points.push({
			x: this.x - Math.sin(this.angle + alpha) * rad,
			y: this.y - Math.cos(this.angle + alpha) * rad,
		});

		points.push({
			x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
			y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
		});

		points.push({
			x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
			y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
		});

		return points;
	}

	update(road_borders) {
		this.#handle_movement();
		this.polygon = this.#create_polygon();
		this.sensor.update(road_borders);
	}

	draw(context) {
		context.beginPath();
		context.moveTo(this.polygon[0].x, this.polygon[0].y);
		for (let i = 1; i < this.polygon.length; i++) {
			context.lineTo(this.polygon[i].x, this.polygon[i].y);
		}
		context.fill();

		this.sensor.draw(context);
	}
}
