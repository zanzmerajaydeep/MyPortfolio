import { useEffect, useRef } from "react";

// Base speed for all drops
const BASE_SPEED = 0.09; // smaller = slower, bigger = faster

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numbers = "0123456789";
    const lettersSymbols =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()";
    const fontSize = 25;
    const columns = Math.floor(canvas.width / fontSize);

    // Instead of just drops, store {y, char} per column
    const drops = Array.from({ length: columns }, () => ({
      y: Math.random() * canvas.height / fontSize,
      char: numbers.charAt(Math.floor(Math.random() * numbers.length))
    }));

    const speeds = Array(columns)
      .fill(0)
      .map(() => BASE_SPEED + Math.random() * BASE_SPEED);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(1, 0, canvas.width, canvas.height);

      ctx.fillStyle = darkMode
        ? "rgba(79, 181, 106, 0.7)"
        : "rgb(181, 214, 190)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Draw the character
        ctx.fillText(drop.char, i * fontSize, drop.y * fontSize);

        // Move the drop down
        drop.y += speeds[i];

        // Occasionally change character as it moves down
        if (Math.random() < 0.02) {
          drop.char =
            Math.random() < 0.7
              ? numbers.charAt(Math.floor(Math.random() * numbers.length))
              : lettersSymbols.charAt(
                  Math.floor(Math.random() * lettersSymbols.length)
                );
        }

        // Reset drop if it goes off screen
        if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
          drop.y = 0;
          speeds[i] = BASE_SPEED + Math.random() * BASE_SPEED;
          drop.char =
            Math.random() < 0.7
              ? numbers.charAt(Math.floor(Math.random() * numbers.length))
              : lettersSymbols.charAt(
                  Math.floor(Math.random() * lettersSymbols.length)
                );
        }
      }
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default MatrixBackground;
