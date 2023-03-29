const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];

canvas.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 2; i++) {
        particlesArray.push(new Particle())
    }

    // console.log(mouse.x , mouse.y)
})

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw() {
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size < 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }


}

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0,0,0,0.07)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    handleParticles();
    requestAnimationFrame(anim)
}
anim()
