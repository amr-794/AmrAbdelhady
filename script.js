// تأثير الخلفية الديناميكية
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// إنشاء الجسيمات
class Particle {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // عكس الاتجاه عند الحواف
        if (this.x > canvas.width || this.x < 0) this.velocityX *= -1;
        if (this.y > canvas.height || this.y < 0) this.velocityY *= -1;

        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(255, 215, 0, ${Math.random()})`;
        const velocityX = (Math.random() - 0.5) * 2;
        const velocityY = (Math.random() - 0.5) * 2;

        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => particle.update());
    requestAnimationFrame(animateParticles);
}

// تحديث الحجم
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// تأثير حركة المؤشر على البطاقات
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // زاوية الدوران العمودية
        const rotateY = ((x - centerX) / centerX) * 10; // زاوية الدوران الأفقية

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});
