import Road from "./classes/road.js";
import Car from "./classes/car.js";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = 200;
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    
    const road = new Road(canvas.width / 2, canvas.width * 0.9);
    const car = new Car(road.getLaneCenter(1), 100, 50, 100);


    const animate = () => {
        car.update(road.borders);
        
        canvas.height = window.innerHeight;

        ctx.save();
        ctx.translate(0, -car.y + canvas.height * 0.75);
        road.draw(ctx);
        car.draw(ctx);

        ctx.restore();
        requestAnimationFrame(animate);
    };

    animate();
});