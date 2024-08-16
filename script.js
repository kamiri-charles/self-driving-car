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
        canvas.height = window.innerHeight;

        road.draw(ctx);
        car.update();
        car.draw(ctx);
        requestAnimationFrame(animate);
    };

    animate();
});