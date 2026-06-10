import { useEffect } from 'react';

export default function ParticlesBackground() {
    useEffect(() => {
        const canvas = document.getElementById('noct-particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId, width = (canvas.width = window.innerWidth), height = (canvas.height = window.innerHeight);
        const handleResize = () => { width = (canvas.width = window.innerWidth); height = (canvas.height = window.innerHeight); };
        window.addEventListener('resize', handleResize);
        const particles = [];
        class Particle {
            constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.radius = Math.random() * 2 + 1; }
            update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = 'rgba(157, 78, 221, 0.3)'; ctx.fill(); }
        }
        for (let i = 0; i < 45; i++) particles.push(new Particle());
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 110) {
                        ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 245, 212, ${0.1 * (1 - dist / 110)})`; ctx.lineWidth = 0.5; ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
    }, []);

    return <canvas id="noct-particles" className="fixed inset-0 pointer-events-none z-0" />;
}