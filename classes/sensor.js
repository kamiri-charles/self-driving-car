import {lerp, get_intersection} from "../utils.js";

export default class Sensor {
	constructor(car) {
		this.car = car;
		this.ray_count = 5;
		this.ray_length = 150;
		this.ray_spread = Math.PI / 2;

		this.rays = [];
        this.readings = [];
	}

    #cast_rays() {
        this.rays = [];
        for (let i = 0; i < this.ray_count; i++) {
            const ray_angle =
                lerp(
                    this.ray_spread / 2,
                    -this.ray_spread / 2,
                    this.ray_count == 1 ? 0.5 : i / (this.ray_count - 1)
                ) + this.car.angle;
    
            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(ray_angle) * this.ray_length,
                y: this.car.y - Math.cos(ray_angle) * this.ray_length,
            };
    
            this.rays.push([start, end]);
        }
    }

    #get_readings(ray, road_borders) {
        let touches = [];


        for (let i = 0; i < road_borders.length; i++) {
            const touch = get_intersection(ray[0], ray[0], road_borders[i][0], road_borders[i][1]);
            if (touch) {
                touches.push(touch);
            }
        }

        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const min_offset = Math.min(...offsets);
            return touches.find(e => e.offset == min_offset);
        }
    }

	update(road_borders) {
        this.#cast_rays();
        this.readings = [];

        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#get_readings(this.rays[i], road_borders)
            );
        }
    }

    draw(context) {
        for (let i = 0; i < this.rays.length; i++) {
            let end = this.rays[i][1];

            if (this.readings[i]) {
                end = this.readings[i];
            }

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke();

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(end.x, end.y);
            context.stroke();
        }
    }
	
}
