import React, { useEffect, useRef } from 'react';

const ParticleEffect = ({ effectType }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    let width = canvasRef.current.width = window.innerWidth;
    let height = canvasRef.current.height = window.innerHeight;
    
    let particles = [];
    const numParticles = effectType === 'kites' ? 10 : 50;

    for (let i = 0; i < numParticles; i++) {
       particles.push({
         x: Math.random() * width,
         y: Math.random() * height,
         vx: (Math.random() - 0.5) * 2,
         vy: effectType === 'kites' ? -Math.random() * 2 - 1 : (Math.random() - 0.5) * 2, // Kites go up
         size: effectType === 'kites' ? Math.random() * 20 + 10 : Math.random() * 5 + 2,
         color: effectType === 'kites' ? `hsl(${Math.random() * 360}, 100%, 60%)` : `rgba(255, 215, 0, ${Math.random()})`
       });
    }

    let animationId;
    const render = () => {
       ctx.clearRect(0, 0, width, height);

       particles.forEach(p => {
         p.x += p.vx;
         p.y += p.vy;

         // Wrap boundaries
         if (p.x < -p.size) p.x = width + p.size;
         if (p.x > width + p.size) p.x = -p.size;
         if (p.y < -p.size) p.y = height + p.size;
         if (p.y > height + p.size) p.y = -p.size;

         ctx.fillStyle = p.color;
         if (effectType === 'kites') {
             // Draw a simple kite shape
             ctx.beginPath();
             ctx.moveTo(p.x, p.y - p.size);
             ctx.lineTo(p.x + p.size/2, p.y);
             ctx.lineTo(p.x, p.y + p.size);
             ctx.lineTo(p.x - p.size/2, p.y);
             ctx.fill();
         } else {
             // Sparkles / default gold
             ctx.beginPath();
             ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
             ctx.fill();
         }
       });

       animationId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationId);
  }, [effectType]);

  return (
     <canvas 
       ref={canvasRef} 
       className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-60"
     />
  );
};

export default ParticleEffect;
