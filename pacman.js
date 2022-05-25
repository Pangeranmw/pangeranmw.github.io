let deathAudio = new Audio("./audio/pacman_death.wav");
let duarrAudio = new Audio("./audio/siu.wav");
let powerAudio = new Audio("./audio/pacman_eatfruit.wav");
let eatAudio = new Audio("./audio/pacman_chomp.wav");
let firstTime = true
let randomQuestion = Math.floor(Math.random() * 3);

let pacmanBackgroundAudio = document.getElementById("pacmanBackgroundAudio");
pacmanBackgroundAudio.loop = true

let ura = document.getElementById("uraa");

const canvas = document.querySelector("canvas");
canvas.width = innerWidth/1.5;
canvas.height = innerHeight;
const c = canvas.getContext("2d");
console.log(canvas);

class Boundary {
	static width = 40;
	static height = 40;
	constructor({ position, image }) {
		this.position = position;
		this.width = 40;
		this.height = 40;
		this.image = image;
	}
	draw() {
		c.drawImage(this.image, this.position.x, this.position.y);
	}
}

class Player {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 15;
    this.radians = 0.
    this.openRate = 0.12
    this.rotation = 0
	}
	draw() {
    c.save()
    c.translate(this.position.x, this.position.y)
    c.rotate(this.rotation)
    c.translate(-this.position.x, -this.position.y)
		c.beginPath();
		c.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians);
    c.lineTo(this.position.x, this.position.y)
		c.fillStyle = "yellow";
		c.fill(); 
		c.closePath();
    c.restore()
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
    if(this.radians < 0 || this.radians > .75){
      this.openRate = -this.openRate
    }
    this.radians += this.openRate
	}
}
class Ghost {
	static speed = 2;
	constructor({ position, velocity, color = "red" }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 15;
		this.color = color;
		this.prevCollisions = [];
		this.speed = 2;
		this.scared = false;
	}
	draw() {
		c.beginPath();
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = this.scared ? "lightblue" : this.color;
		c.fill();
		c.closePath();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}
class Pellet {
	constructor({ position }) {
		this.position = position;
		this.radius = 3;
	}
	draw() {
		c.beginPath();
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = "white";
		c.fill();
		c.closePath();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

class PowerUp {
	constructor({ position }) {
		this.position = position;
		this.radius = 8;
	}
	draw() {
		c.beginPath();
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = "white";
		c.fill();
		c.closePath();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

const keys = {
	w: {
		pressed: false,
		lastKey: "w",
	},
	a: {
		pressed: false,
		lastKey: "a",
	},
	s: {
		pressed: false,
		lastKey: "s",
	},
	d: {
		pressed: false,
		lastKey: "d",
	},
};

const map = [
	["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
	["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
	["|", ".", "b", ".", "[", "7", "]", ".", "[", "7", "]", "p", "b", ".", "|"],
	["|", ".", ".", ".", ".", "_", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
	["|", ".", "[", "]", ".", ".", ".", "b", ".", ".", ".", "[", "]", ".", "|"],
	["|", ".", ".", ".", "p", "^", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
	["|", ".", "b", ".", "[", "+", "]", ".", "[", "+", "]", ".", "b", ".", "|"],
	["|", ".", ".", ".", ".", "_", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
	["|", ".", "[", "]", ".", ".", ".", "b", ".", ".", ".", "[", "]", ".", "|"],
	["|", ".", ".", ".", ".", "^", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
	["|", ".", "^", "p", "[", "+", "]", ".", "[", "+", "]", ".", "b", ".", "|"],
	["|", ".", "_", ".", ".", "_", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
	["|", ".", "[", "]", ".", ".", "p", "b", ".", "p", ".", "[", "]", ".", "|"],
	["|", ".", ".", ".", ".", "^", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
	["|", ".", "^", ".", "[", "+", "]", ".", "[", "+", "]", "p", "^", ".", "|"],
	["|", ".", "_", ".", "b", "_", "b", ".", "b", "_", "b", ".", "_", ".", "|"],
	["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
	["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

const boundaries = [];
const pellets = [];
const powerUps = [];
const ghosts = [
	new Ghost({
		position: {
			x: Boundary.width * 6 + Boundary.width / 2,
			y: Boundary.height + Boundary.height / 2,
		},
		velocity: {
			x: Ghost.speed,
			y: 0,
		},
	}),
	new Ghost({
		position: {
			x: Boundary.width + Boundary.width / 2,
			y: Boundary.height * 3 + Boundary.height / 2,
		},
		velocity: {
			x: Ghost.speed,
			y: 0,
		},
		color: "lightgreen",
	}),
	new Ghost({
		position: {
			x: Boundary.width + Boundary.width / 2,
			y: Boundary.height * 9 + Boundary.height / 2,
		},
		velocity: {
			x: Ghost.speed,
			y: 0,
		},
		color: "black",
	}),
	new Ghost({
		position: {
			x: Boundary.width + Boundary.width / 2,
			y: Boundary.height * 13 + Boundary.height / 2,
		},
		velocity: {
			x: Ghost.speed,
			y: 0,
		},
		color: "pink",
	}),
	new Ghost({
		position: {
			x: Boundary.width * 10 + Boundary.width / 2,
			y: Boundary.height + Boundary.height / 2,
		},
		velocity: {
			x: Ghost.speed,
			y: 0,
		},
		color: "#636363",
	}),
	new Ghost({
		position: {
			x: Boundary.width * 6 + Boundary.width / 2,
			y: Boundary.height * 11 + Boundary.height / 2,
		},
		velocity: {
			x: Ghost.speed,
			y: 0,
		},
		color: "#636363",
	}),
];
const player = new Player({
	position: {
		x: Boundary.width + Boundary.width / 2,
		y: Boundary.height + Boundary.height / 2,
	},
	velocity: {
		x: 0,
		y: 0,
	},
});

function createImage(src) {
	const image = new Image();
	image.src = src;
	return image;
}
map.forEach((row, i) => {
	row.forEach((symbol, j) => {
		switch (symbol) {
			case "-":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/pipeHorizontal.png"),
					})
				);
				break;
			case "|":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/pipeVertical.png"),
					})
				);
				break;
			case "1":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/pipeCorner1.png"),
					})
				);
				break;
			case "2":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/pipeCorner2.png"),
					})
				);
				break;
			case "3":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/pipeCorner3.png"),
					})
				);
				break;
			case "4":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/pipeCorner4.png"),
					})
				);
				break;
			case "b":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i,
						},
						image: createImage("./asset-pacman/block.png"),
					})
				);
				break;
			case "[":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						image: createImage("./asset-pacman/capLeft.png"),
					})
				);
				break;
			case "]":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						image: createImage("./asset-pacman/capRight.png"),
					})
				);
				break;
			case "_":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						image: createImage("./asset-pacman/capBottom.png"),
					})
				);
				break;
			case "^":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						image: createImage("./asset-pacman/capTop.png"),
					})
				);
				break;
			case "+":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						image: createImage("./asset-pacman/pipeCross.png"),
					})
				);
				break;
			case "5":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						color: "blue",
						image: createImage("./asset-pacman/pipeConnectorTop.png"),
					})
				);
				break;
			case "6":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						color: "blue",
						image: createImage("./asset-pacman/pipeConnectorRight.png"),
					})
				);
				break;
			case "7":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						color: "blue",
						image: createImage("./asset-pacman/pipeConnectorBottom.png"),
					})
				);
				break;
			case "8":
				boundaries.push(
					new Boundary({
						position: {
							x: j * Boundary.width,
							y: i * Boundary.height,
						},
						image: createImage("./asset-pacman/pipeConnectorLeft.png"),
					})
				);
				break;
			case ".":
				pellets.push(
					new Pellet({
						position: {
							x: j * Boundary.width + Boundary.width / 2,
							y: i * Boundary.height + Boundary.height / 2,
						},
					})
				);
				break;
			case "p":
				powerUps.push(
					new PowerUp({
						position: {
							x: j * Boundary.width + Boundary.width / 2,
							y: i * Boundary.height + Boundary.height / 2,
						},
					})
				);
				break;
		}
	});
});

function circleCollidesWithRectangle({ circle, rectangle }) {
	const padding = Boundary.width / 2 - circle.radius - 1;
	return (
		circle.position.y - circle.radius + circle.velocity.y <=
			rectangle.position.y + rectangle.height + padding &&
		circle.position.x + circle.radius + circle.velocity.x >=
			rectangle.position.x - padding &&
		circle.position.y + circle.radius + circle.velocity.y >=
			rectangle.position.y - padding &&
		circle.position.x - circle.radius + circle.velocity.x <=
			rectangle.position.x + rectangle.width + padding
	);
}

let animationId;

function animate() {
	animationId = requestAnimationFrame(animate);
	randomQuestion = Math.floor(Math.random() * 3);
	c.clearRect(0, 0, canvas.width, canvas.height);

	if (keys.w.pressed && lastKey === "w") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: 0,
							y: -5,
						},
					},
					rectangle: boundary,
				})
			) {
				player.velocity.y = 0;
				break;
			} else {
				player.velocity.y = -5;
			}
		}
	} else if (keys.a.pressed && lastKey === "a") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: -5,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				player.velocity.x = 0;
				break;
			} else {
				player.velocity.x = -5;
			}
		}
	} else if (keys.s.pressed && lastKey === "s") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: 0,
							y: 5,
						},
					},
					rectangle: boundary,
				})
			) {
				player.velocity.y = 0;
				break;
			} else {
				player.velocity.y = 5;
			}
		}
	} else if (keys.d.pressed && lastKey === "d") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: 5,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				player.velocity.x = 0;
				break;
			} else {
				player.velocity.x = 5;
			}
		}
	}

  if(pellets.length === 0){
    duarrAudio.play()
    duarrAudio.loop = true;
    cancelAnimationFrame(animationId);
		let dec;
		if (randomQuestion === 0)
			dec = CryptoJS.AES.decrypt(
				`U2FsdGVkX1/XnzZHJV9DPuuTSr456EzavRUjeFkRA/vZp8DCLFAHBnGRBFEmt7kdrl6EJQ/N+BGqvBuYqIimHHI/Qf7wJL0VN8l86m+1jNExOa6FXYF+gHaNf3XRzWz0QEE2UAq5ZhTQ8389cqLGH5xyNMxhiISWjNgtrmdAvr9JRiQvqPYxMoZXMTNlnRWdXWmLleQGB33wOf88VYw1y3CTDPK22yHcwNWbdBh21nzIE6ivZdNq4+nvrp0RZFZE5MXUvZ0GNF1dKKK5GXZgrqxDNevu0XrguVV+IoRmHoaOK3lvrASeoi1wnjr15pqh`,
				"Secret Passphrase"
			);
		else if (randomQuestion === 1)
			dec = CryptoJS.AES.decrypt(
				`U2FsdGVkX18lxDn8sVHd8XkYR/SpkUCeXVfIN6PoJ33xTAgc7rw6gB/Z9wTztmnWlOaujfmcTZPBJt4nslDJ9jRZGN2+GR/CrLoGIrNoiozjn0K609PmgWkkiDQN2pprwqL1Y1PC8L0fBhRsub6MHoOPL41c+HikJC5+WrRn6r6b6/iJrxPVUls1+JGvv3rO6MdzXHcwTt2GwNCxS7uTqzGRCRkDGrd9n8QR940MGojn9Y67aI//Kj+5NFiuegQ9l17xdOxfT1Acb/W09SlpTsmMK/0u+at+VzdTwyfDCpReDNOu1KeL+sLwMs9FgheMT/BGQcIea82OJhAHskf6itr436D2bA2TrOIakzMdeCCOrOAGMc9wHM7GaVcSYTz3iyooUbRN38F7Q2x2JpDTLQ==`,
				"Secret Passphrase"
			);
		else if (randomQuestion === 2)
			dec = CryptoJS.AES.decrypt(
				`U2FsdGVkX1/EfbBQvEdNJl/rw44iOZ0Nhs+qB5rbAzAM43MmmNyVsxvDxZMHI8DpD/rfCIRMvjLa8NTqgu2qzCXw7k5Dza1L3OYkWvZ6Bl9zqphNO4Bm5jk//c4y5Odm6FsjlO+qxwwtYKiuW6Fr5BW0FUNQCBHaLUYNf9HuLNd9vuAPFWCXoIsy7je6f6Kdv/EioqDWMNt/BGNbmjQ01WnnvKxBinUYLovFQzo5sNs2hufcntxhMusRyahdtMGyLYti9F+mlnTVRrofHOn+BXrw1K4edVDRHL+uOketkFa6Mnuz+DF66WXXjOTlVK09`,
				"Secret Passphrase"
			);
		ura.innerHTML = dec.toString(CryptoJS.enc.Utf8);
	}

	// power ups go
	for (let i = powerUps.length - 1; 0 <= i; i--) {
		const powerUp = powerUps[i];
		powerUp.draw();
		// player collide with power up
		if (
			Math.hypot(
				powerUp.position.x - player.position.x,
				powerUp.position.y - player.position.y
			) <
			powerUp.radius + player.radius
		) {
			powerUps.splice(i, 1);
      powerAudio.play()
			console.log("hilang");
			ghosts.forEach((ghost) => {
				ghost.scared = true;
				setTimeout(() => {
					ghost.scared = false;
				}, 5000);
			});
		}
	}

	// touch pellets
	for (let i = pellets.length - 1; 0 <= i; i--) {
		const pellet = pellets[i];
		pellet.draw();
		if (
			Math.hypot(
				pellet.position.x - player.position.x,
				pellet.position.y - player.position.y
			) <
			pellet.radius + player.radius
		) {
			pellets.splice(i, 1);
      if(!firstTime) eatAudio.play();
		}
	}

	boundaries.forEach((boundary) => {
		boundary.draw();
		if (circleCollidesWithRectangle({ circle: player, rectangle: boundary })) {
			player.velocity.x = 0;
			player.velocity.y = 0;
		}
	});
	player.update();

	ghosts.forEach((ghost) => {
		ghost.update();
		if (
			Math.hypot(
				ghost.position.x - player.position.x,
				ghost.position.y - player.position.y
			) <
				ghost.radius + player.radius &&
			!ghost.scared
		) {
			cancelAnimationFrame(animationId);

      eatAudio.pause();
			eatAudio.currentTime = 0;
			deathAudio.play();

			if (confirm("Yahh Gajadi Dapet TP, Yuk Coba Lagi") == true) {
				location.reload();
			} else {
				location = "/#portfolio";
			}
		}
		const collisions = [];
		boundaries.forEach((boundary) => {
			if (
				!collisions.includes("right") &&
				circleCollidesWithRectangle({
					circle: {
						...ghost,
						velocity: {
							x: ghost.speed,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push("right");
			}
			if (
				!collisions.includes("left") &&
				circleCollidesWithRectangle({
					circle: {
						...ghost,
						velocity: {
							x: -ghost.speed,
							y: 0,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push("left");
			}
			if (
				!collisions.includes("up") &&
				circleCollidesWithRectangle({
					circle: {
						...ghost,
						velocity: {
							x: 0,
							y: -ghost.speed,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push("up");
			}
			if (
				!collisions.includes("down") &&
				circleCollidesWithRectangle({
					circle: {
						...ghost,
						velocity: {
							x: 0,
							y: ghost.speed,
						},
					},
					rectangle: boundary,
				})
			) {
				collisions.push("down");
			}
		});
		if (collisions.length > ghost.prevCollisions.length)
			ghost.prevCollisions = collisions;
		if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
			if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
			else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
			else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");
			else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
			const pathways = ghost.prevCollisions.filter((collision) => {
				return !collisions.includes(collision);
			});

			const direction = pathways[Math.floor(Math.random() * pathways.length)];

			switch (direction) {
				case "down":
					ghost.velocity.y = ghost.speed;
					ghost.velocity.x = 0;
					break;
				case "up":
					ghost.velocity.y = -ghost.speed;
					ghost.velocity.x = 0;
					break;
				case "left":
					ghost.velocity.y = 0;
					ghost.velocity.x = -ghost.speed;
					break;
				case "right":
					ghost.velocity.y = 0;
					ghost.velocity.x = ghost.speed;
					break;
			}
			ghost.prevCollisions = [];
		}
	});

  if(player.velocity.x > 0) player.rotation = 0
  else if(player.velocity.x < 0) player.rotation = Math.PI
  else if(player.velocity.y > 0) player.rotation = Math.PI /2
  else if(player.velocity.y < 0) player.rotation = Math.PI *1.5
}

animate();

function firstTimeAudio(){
    if(firstTime) {
			firstTime = false;
			pacmanBackgroundAudio.pause();
			pacmanBackgroundAudio.currentTime = 0;
		}
}
addEventListener("keydown", ({ key }) => {
	switch (key) {
		case "w":
			keys.w.pressed = true;
			lastKey = "w";
			firstTimeAudio();
			break;
		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			firstTimeAudio();
			break;
		case "s":
			keys.s.pressed = true;
			lastKey = "s";
			firstTimeAudio();
			break;
		case "d":
			keys.d.pressed = true;
			lastKey = "d";
			firstTimeAudio();
			break;
	}
});

addEventListener("keyup", ({ key }) => {
	switch (key) {
		case "w":
			keys.w.pressed = false;
			break;
		case "a":
			keys.a.pressed = false;
			break;
		case "s":
			keys.s.pressed = false;
			break;
		case "d":
			keys.d.pressed = false;
			break;
	}
});

document.onkeydown = function (e) {
	if (event.keyCode == 123) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
		return false;
	}
};
