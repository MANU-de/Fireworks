const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.size = Math.random() * 3 + 2;
    this.exploded = false;
    this.particles = [];

    this.update = function() {
        if (!this.exploded) {
            this.y -= 3; // Move up
            if (this.y < canvas.height / 2) {
                this.explode();
            }
        } else {
            for (let particle of this.particles) {
                particle.update();
            }
        }
    };

    this.explode = function() {
        this.exploded = true;
        const particleCount = Math.random() * 100 + 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    };

    this.draw = function() {
        if (!this.exploded) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            for (let particle of this.particles) {
                particle.draw();
            }
        }
    };
}

function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 5 + 2;
    this.angle = Math.random() * Math.PI * 2;
    this.color = color;

    this.update = function() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.size *= 0.95; // Fade out
    };

    this.draw = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };
}

const fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) {
        fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
    }
    for (let firework of fireworks) {
        firework.update();
        firework.draw();
    }
    requestAnimationFrame(animate);
}

animate();
