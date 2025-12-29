"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Bird {
  x: number;
  y: number;
  velocity: number;
  radius: number;
}

interface Pipe {
  x: number;
  topHeight: number;
  gap: number;
  width: number;
}

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const birdRef = useRef<Bird>({
    x: 100,
    y: 250,
    velocity: 0,
    radius: 15,
  });
  
  const pipesRef = useRef<Pipe[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastPipeTimeRef = useRef<number>(0);
  const passedPipesRef = useRef<Set<number>>(new Set());

  const GRAVITY = 0.25; // Giảm gravity để bird rơi chậm hơn
  const JUMP_STRENGTH = -5; // Giảm jump strength để chỉ bay nhẹ nhàng
  const PIPE_SPEED = 1.3; // Giảm tốc độ pipes
  const PIPE_SPACING = 280; // Tăng khoảng cách giữa các pipes
  const PIPE_GAP = 200; // Tăng gap để dễ bay qua hơn
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 500;

  const initGame = useCallback(() => {
    birdRef.current = {
      x: 100,
      y: CANVAS_HEIGHT / 2, // Bắt đầu ở giữa màn hình
      velocity: 0,
      radius: 15,
    };
    pipesRef.current = [];
    lastPipeTimeRef.current = 0;
    passedPipesRef.current = new Set();
    setScore(0);
    setGameState("playing");
  }, []);

  const jump = useCallback(() => {
    if (gameState === "menu") {
      initGame();
    } else if (gameState === "playing") {
      birdRef.current.velocity = JUMP_STRENGTH;
    } else if (gameState === "gameover") {
      initGame();
    }
  }, [gameState, initGame]);

  const checkCollision = useCallback((bird: Bird, pipes: Pipe[]): boolean => {
    // Bird dimensions (pixel art style)
    const birdWidth = 16;
    const birdHeight = 12;
    const birdTop = bird.y - 10; // Head extends above body
    const birdBottom = bird.y + 6;
    const birdLeft = bird.x - 8;
    const birdRight = bird.x + 14; // Beak extends to the right

    // Check ground/ceiling collision
    if (birdTop <= 0 || birdBottom >= CANVAS_HEIGHT - 20) {
      return true;
    }

    // Check pipe collision
    for (const pipe of pipes) {
      if (
        birdRight > pipe.x &&
        birdLeft < pipe.x + pipe.width
      ) {
        if (
          birdTop < pipe.topHeight ||
          birdBottom > pipe.topHeight + pipe.gap
        ) {
          return true;
        }
      }
    }
    return false;
  }, []);

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bird = birdRef.current;
    const pipes = pipesRef.current;

    // Update bird
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;

    // Generate pipes
    const now = Date.now();
    if (now - lastPipeTimeRef.current > PIPE_SPACING) {
      const topHeight = Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 120) + 60;
      pipes.push({
        x: CANVAS_WIDTH,
        topHeight,
        gap: PIPE_GAP,
        width: 50, // Pipes mỏng hơn để dễ hơn
      });
      lastPipeTimeRef.current = now;
    }

    // Update pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= PIPE_SPEED;

      // Remove off-screen pipes
      if (pipes[i].x + pipes[i].width < 0) {
        pipes.splice(i, 1);
      }

      // Score when passing pipe
      if (
        !passedPipesRef.current.has(i) &&
        bird.x > pipes[i].x + pipes[i].width
      ) {
        passedPipesRef.current.add(i);
        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });
      }
    }

    // Check collision
    if (checkCollision(bird, pipes)) {
      setGameState("gameover");
      return;
    }

    // Draw background - Sky
    ctx.fillStyle = "#70C5CE";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw clouds (simple pixel art style)
    ctx.fillStyle = "#FFFFFF";
    const cloudY = 80;
    // Cloud 1
    ctx.fillRect(50, cloudY, 20, 15);
    ctx.fillRect(60, cloudY - 5, 20, 15);
    ctx.fillRect(70, cloudY, 20, 15);
    // Cloud 2
    ctx.fillRect(200, cloudY + 20, 20, 15);
    ctx.fillRect(210, cloudY + 15, 20, 15);
    ctx.fillRect(220, cloudY + 20, 20, 15);
    // Cloud 3
    ctx.fillRect(320, cloudY - 10, 20, 15);
    ctx.fillRect(330, cloudY - 15, 20, 15);
    ctx.fillRect(340, cloudY - 10, 20, 15);

    // Draw city skyline (simple pixel art)
    const cityY = CANVAS_HEIGHT - 60;
    ctx.fillStyle = "#C0C0C0";
    // Building 1
    ctx.fillRect(0, cityY, 40, 60);
    ctx.fillRect(5, cityY - 10, 10, 10);
    ctx.fillRect(25, cityY - 10, 10, 10);
    // Building 2
    ctx.fillRect(50, cityY + 10, 30, 50);
    ctx.fillRect(60, cityY, 10, 10);
    // Building 3
    ctx.fillRect(90, cityY - 5, 25, 65);
    ctx.fillRect(95, cityY - 10, 8, 10);
    ctx.fillRect(107, cityY - 10, 8, 10);
    // Building 4
    ctx.fillRect(125, cityY + 15, 35, 45);
    ctx.fillRect(135, cityY + 5, 10, 10);
    ctx.fillRect(145, cityY + 5, 10, 10);
    // Building 5
    ctx.fillRect(170, cityY, 20, 60);
    ctx.fillRect(175, cityY - 5, 8, 8);
    // Building 6
    ctx.fillRect(200, cityY + 20, 30, 40);
    ctx.fillRect(210, cityY + 10, 8, 8);
    // Building 7
    ctx.fillRect(240, cityY - 10, 25, 70);
    ctx.fillRect(245, cityY - 15, 8, 8);
    ctx.fillRect(257, cityY - 15, 8, 8);
    // Building 8
    ctx.fillRect(275, cityY + 10, 35, 50);
    ctx.fillRect(285, cityY, 8, 8);
    ctx.fillRect(297, cityY, 8, 8);
    // Building 9
    ctx.fillRect(320, cityY, 40, 60);
    ctx.fillRect(330, cityY - 5, 8, 8);
    ctx.fillRect(345, cityY - 5, 8, 8);
    // Building 10
    ctx.fillRect(370, cityY + 15, 30, 45);
    ctx.fillRect(380, cityY + 5, 8, 8);

    // Draw ground
    ctx.fillStyle = "#D4A574";
    ctx.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20);
    ctx.fillStyle = "#8B7355";
    ctx.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 3);

    // Draw pipes (simple green pipes)
    ctx.fillStyle = "#4CAF50";
    for (const pipe of pipes) {
      // Top pipe
      ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
      // Bottom pipe
      ctx.fillRect(
        pipe.x,
        pipe.topHeight + pipe.gap,
        pipe.width,
        CANVAS_HEIGHT - (pipe.topHeight + pipe.gap) - 20
      );
      // Pipe caps (darker green)
      ctx.fillStyle = "#2E7D32";
      ctx.fillRect(pipe.x - 3, pipe.topHeight - 15, pipe.width + 6, 15);
      ctx.fillRect(
        pipe.x - 3,
        pipe.topHeight + pipe.gap,
        pipe.width + 6,
        15
      );
      ctx.fillStyle = "#4CAF50";
    }

    // Draw bird (simple pixel art style - yellow bird)
    ctx.fillStyle = "#FFEB3B";
    // Body
    ctx.fillRect(bird.x - 8, bird.y - 6, 16, 12);
    // Head
    ctx.fillRect(bird.x - 2, bird.y - 10, 10, 8);
    // Beak
    ctx.fillStyle = "#FF9800";
    ctx.fillRect(bird.x + 8, bird.y - 2, 6, 4);
    // Eye
    ctx.fillStyle = "#000";
    ctx.fillRect(bird.x + 2, bird.y - 6, 3, 3);
    // Wing
    ctx.fillStyle = "#FFC107";
    ctx.fillRect(bird.x - 4, bird.y - 2, 8, 6);

    // Draw score
    ctx.fillStyle = "#000";
    ctx.font = "bold 24px DM Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(score.toString(), CANVAS_WIDTH / 2, 40);

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, checkCollision, highScore]);

  useEffect(() => {
    if (gameState === "playing") {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jump]);

  const drawMenu = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = "#70C5CE";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw clouds
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(50, 80, 20, 15);
    ctx.fillRect(60, 75, 20, 15);
    ctx.fillRect(70, 80, 20, 15);
    ctx.fillRect(200, 100, 20, 15);
    ctx.fillRect(210, 95, 20, 15);
    ctx.fillRect(220, 100, 20, 15);
    ctx.fillRect(320, 70, 20, 15);
    ctx.fillRect(330, 65, 20, 15);
    ctx.fillRect(340, 70, 20, 15);

    // Draw city skyline
    const cityY = CANVAS_HEIGHT - 60;
    ctx.fillStyle = "#C0C0C0";
    ctx.fillRect(0, cityY, 40, 60);
    ctx.fillRect(50, cityY + 10, 30, 50);
    ctx.fillRect(90, cityY - 5, 25, 65);
    ctx.fillRect(125, cityY + 15, 35, 45);
    ctx.fillRect(170, cityY, 20, 60);
    ctx.fillRect(200, cityY + 20, 30, 40);
    ctx.fillRect(240, cityY - 10, 25, 70);
    ctx.fillRect(275, cityY + 10, 35, 50);
    ctx.fillRect(320, cityY, 40, 60);
    ctx.fillRect(370, cityY + 15, 30, 45);

    // Draw ground
    ctx.fillStyle = "#D4A574";
    ctx.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20);

    ctx.fillStyle = "#000";
    ctx.font = "bold 32px DM Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Flappy Bird", CANVAS_WIDTH / 2, 150);

    ctx.font = "18px DM Sans, sans-serif";
    ctx.fillText("Click or Press SPACE", CANVAS_WIDTH / 2, 250);
    ctx.fillText("to Start!", CANVAS_WIDTH / 2, 280);

    if (highScore > 0) {
      ctx.font = "16px DM Sans, sans-serif";
      ctx.fillText(`High Score: ${highScore}`, CANVAS_WIDTH / 2, 350);
    }
  };

  const drawGameOver = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 32px DM Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", CANVAS_WIDTH / 2, 200);

    ctx.font = "20px DM Sans, sans-serif";
    ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, 250);
    ctx.fillText(`High Score: ${highScore}`, CANVAS_WIDTH / 2, 290);

    ctx.font = "16px DM Sans, sans-serif";
    ctx.fillText("Click to Restart", CANVAS_WIDTH / 2, 350);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (gameState === "menu") {
      drawMenu();
    } else if (gameState === "gameover") {
      drawGameOver();
    }
  }, [gameState, score, highScore]);

  return (
    <section className="cv-section-card animate-fade-in-up animate-delay-600">
      <h2 className="cv-section-title mb-4">Flappy Bird Game</h2>
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={jump}
          className="border-2 border-[#E2852E] rounded-lg cursor-pointer bg-[#70C5CE] shadow-lg"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Click or press <kbd className="px-2 py-1 bg-gray-100 rounded border">SPACE</kbd> to jump</p>
          {gameState === "playing" && (
            <p className="mt-2 text-[#E2852E] font-semibold">Score: {score}</p>
          )}
        </div>
      </div>
    </section>
  );
}

