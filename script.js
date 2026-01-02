document.addEventListener('DOMContentLoaded', () => {
    const clickOverlay = document.getElementById('click-overlay');
    const audio = document.getElementById('bg-music');

    clickOverlay.addEventListener('click', () => {
        clickOverlay.classList.add('hidden');
        audio.play().catch(e => console.log("Audio play failed:", e));
    });
    const canvas = document.getElementById('snow');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 100; // Number of snowflakes

    class Snowflake {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * 2 - 1; // Horizontal drift
            this.vy = Math.random() * 3 + 1; // Vertical speed
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Reset when off screen
            if (this.y > height) {
                this.y = -10;
                this.x = Math.random() * width;
            }
            if (this.x > width) {
                this.x = 0;
            }
            if (this.x < 0) {
                this.x = width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            ctx.closePath();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Snowflake());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    init();
    animate();
});
