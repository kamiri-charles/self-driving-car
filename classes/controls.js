export default class Controls {
	constructor() {
		this.forward = false;
		this.reverse = false;
		this.left = false;
		this.right = false;

		this.#addKeyboardListeners();
	}

	#addKeyboardListeners() {
		document.onkeydown = (e) => {
			switch (e.key) {
				case "w":
				case "ArrowUp":
					this.forward = true;
					break;

				case "s":
				case "ArrowDown":
					this.reverse = true;
					break;

				case "a":
				case "ArrowLeft":
					this.left = true;
					break;

				case "d":
				case "ArrowRight":
					this.right = true;
					break;
			}
		};

		document.onkeyup = (e) => {
			switch (e.key) {
				case "w":
				case "ArrowUp":
					this.forward = false;
					break;

				case "s":
				case "ArrowDown":
					this.reverse = false;
					break;

				case "a":
				case "ArrowLeft":
					this.left = false;
					break;

				case "d":
				case "ArrowRight":
					this.right = false;
					break;
			}
		};
	}
}
