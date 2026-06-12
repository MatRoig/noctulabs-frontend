import { useState, useEffect, useRef, useCallback } from 'react';

const SIZES = {
  lg: { w: 360, h: 360 },
};

const PADDLE_W = 10;
const getPaddleH = (s) => Math.round(SIZES[s].h * 0.20);
const BALL_SIZE = 8;
const BALL_SPEED = 2.0;
const AI_SPEED = 0.7;
const PLAYER_SPEED = 3;
const WIN_SCORE = 5;
const SPEED_CAP = BALL_SPEED * 1.2;

function PongGame({ onExit }) {
  const canvasRef = useRef(null);
  const keysRef = useRef({});
  const pauseRef = useRef(null);
  const stateRef = useRef({
    player: { y: 0 },
    ai: { y: 0 },
    ball: { x: 0, y: 0, dx: BALL_SPEED, dy: 0 },
    playerScore: 0,
    aiScore: 0,
    gameState: 'waiting',
    size: 'lg',
    loop: null,
    ballSpeed: BALL_SPEED,
  });
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameState, setGameState] = useState('waiting');

  const getHeight = (s) => SIZES[s].h;
  const getWidth = (s) => SIZES[s].w;

  const resetBall = useCallback((s, dir) => {
    stateRef.current.ballSpeed = BALL_SPEED;
    const w = getWidth(s);
    const h = getHeight(s);
    const speed = stateRef.current.ballSpeed;
    const angle = Math.random() * (Math.PI / 6) + Math.PI / 6;
    const dx = dir * speed * Math.cos(angle);
    const dy = speed * Math.sin(angle) * (Math.random() > 0.5 ? 1 : -1);
    stateRef.current.ball = { x: w / 2, y: h / 2, dx, dy };
  }, []);

  const tickRef = useRef(null);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { player, ai, ball, size: s } = stateRef.current;
    const w = getWidth(s);
    const h = getHeight(s);

    ctx.fillStyle = '#020110';
    ctx.fillRect(0, 0, w, h);

    const ph = getPaddleH(s);

    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(0, player.y, PADDLE_W, ph);

    ctx.fillStyle = '#f87171';
    ctx.fillRect(w - PADDLE_W, ai.y, PADDLE_W, ph);

    ctx.fillStyle = '#ffffff';
    const bx = ball.x - BALL_SIZE / 2;
    const by = ball.y - BALL_SIZE / 2;
    ctx.fillRect(bx, by, BALL_SIZE, BALL_SIZE);
  }, []);

  const stopLoop = useCallback(() => {
    clearTimeout(pauseRef.current);
    if (stateRef.current.loop) {
      cancelAnimationFrame(stateRef.current.loop);
      stateRef.current.loop = null;
    }
  }, []);

  const tick = () => {
    const st = stateRef.current;
    const h = getHeight(st.size);
    const w = getWidth(st.size);
    const ph = getPaddleH(st.size);

    if (keysRef.current.w || keysRef.current.W || keysRef.current.ArrowUp) {
      st.player.y = Math.max(0, st.player.y - PLAYER_SPEED);
    }
    if (keysRef.current.s || keysRef.current.S || keysRef.current.ArrowDown) {
      st.player.y = Math.min(h - ph, st.player.y + PLAYER_SPEED);
    }

    const aiCenter = st.ai.y + ph / 2;
    if (st.ball.y < aiCenter - 5) {
      st.ai.y = Math.max(0, st.ai.y - AI_SPEED);
    } else if (st.ball.y > aiCenter + 5) {
      st.ai.y = Math.min(h - ph, st.ai.y + AI_SPEED);
    }

    if (st.ball.dx > 0) {
      const centerY = h / 2 - ph / 2;
      if (st.ai.y < centerY - 1) st.ai.y = Math.min(centerY, st.ai.y + AI_SPEED * 0.3);
      else if (st.ai.y > centerY + 1) st.ai.y = Math.max(centerY, st.ai.y - AI_SPEED * 0.3);
    }

    st.ball.x += st.ball.dx;
    st.ball.y += st.ball.dy;

    if (st.ball.y - BALL_SIZE / 2 <= 0 || st.ball.y + BALL_SIZE / 2 >= h) {
      st.ball.dy = -st.ball.dy;
      st.ball.y = Math.max(BALL_SIZE / 2, Math.min(h - BALL_SIZE / 2, st.ball.y));
    }

    if (
      st.ball.x - BALL_SIZE / 2 <= PADDLE_W &&
      st.ball.y >= st.player.y &&
      st.ball.y <= st.player.y + ph
    ) {
      const remaining = (SPEED_CAP - st.ballSpeed) / (SPEED_CAP - BALL_SPEED);
      st.ballSpeed = Math.min(st.ballSpeed * (1 + 0.015 * remaining), SPEED_CAP);
      st.ball.dx = Math.abs(st.ball.dx) * (st.ballSpeed / BALL_SPEED);
      const hitPos = Math.max(-0.5, Math.min(0.5, (st.ball.y - st.player.y) / ph - 0.5));
      st.ball.dy = (hitPos + (Math.random() - 0.5) * 0.08) * st.ballSpeed;
      st.ball.x = PADDLE_W + BALL_SIZE / 2;
    }

    if (
      st.ball.x + BALL_SIZE / 2 >= w - PADDLE_W &&
      st.ball.y >= st.ai.y &&
      st.ball.y <= st.ai.y + ph
    ) {
      const remaining = (SPEED_CAP - st.ballSpeed) / (SPEED_CAP - BALL_SPEED);
      st.ballSpeed = Math.min(st.ballSpeed * (1 + 0.015 * remaining), SPEED_CAP);
      st.ball.dx = -Math.abs(st.ball.dx) * (st.ballSpeed / BALL_SPEED);
      const hitPos = Math.max(-0.5, Math.min(0.5, (st.ball.y - st.ai.y) / ph - 0.5));
      st.ball.dy = (hitPos + (Math.random() - 0.5) * 0.08) * st.ballSpeed;
      st.ball.x = w - PADDLE_W - BALL_SIZE / 2;
    }

    if (st.ball.x + BALL_SIZE / 2 < 0) {
      st.aiScore++;
      setAiScore(st.aiScore);
      if (st.aiScore >= WIN_SCORE) {
        st.gameState = 'over';
        setGameState('over');
        stopLoop();
        drawFrame();
        return;
      }
      stopLoop();
      pauseRef.current = setTimeout(() => {
        const s = stateRef.current;
        const h2 = getHeight(s.size);
        const ph2 = getPaddleH(s.size);
        s.player.y = h2 / 2 - ph2 / 2;
        s.ai.y = h2 / 2 - ph2 / 2;
        s.ballSpeed = BALL_SPEED;
        resetBall(s.size, 1);
        s.loop = requestAnimationFrame(tickRef.current);
      }, 800);
      drawFrame();
      return;
    } else if (st.ball.x - BALL_SIZE / 2 > w) {
      st.playerScore++;
      setPlayerScore(st.playerScore);
      if (st.playerScore >= WIN_SCORE) {
        st.gameState = 'over';
        setGameState('over');
        stopLoop();
        drawFrame();
        return;
      }
      stopLoop();
      pauseRef.current = setTimeout(() => {
        const s = stateRef.current;
        const h2 = getHeight(s.size);
        const ph2 = getPaddleH(s.size);
        s.player.y = h2 / 2 - ph2 / 2;
        s.ai.y = h2 / 2 - ph2 / 2;
        s.ballSpeed = BALL_SPEED;
        resetBall(s.size, -1);
        s.loop = requestAnimationFrame(tickRef.current);
      }, 800);
      drawFrame();
      return;
    }

    drawFrame();
    st.loop = requestAnimationFrame(tickRef.current);
  };

  useEffect(() => {
    tickRef.current = tick;
  });

  const startLoop = useCallback(() => {
    stopLoop();
    stateRef.current.loop = requestAnimationFrame(tickRef.current);
  }, [stopLoop]);

  const initGame = useCallback((s, dir) => {
    const h = getHeight(s);
    const ph = getPaddleH(s);
    stateRef.current.player.y = h / 2 - ph / 2;
    stateRef.current.ai.y = h / 2 - ph / 2;
    stateRef.current.playerScore = 0;
    stateRef.current.aiScore = 0;
    stateRef.current.ballSpeed = BALL_SPEED;
    setPlayerScore(0);
    setAiScore(0);
    resetBall(s, dir || 1);
    stateRef.current.size = s;
    drawFrame();
  }, [resetBall, drawFrame]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const st = stateRef.current;
      if (e.key === 'Escape') { stopLoop(); onExit(); return; }
      if ((e.key === ' ' || e.key === 'Enter') && st.gameState === 'waiting') {
        e.preventDefault();
        st.gameState = 'running';
        setGameState('running');
        resetBall(st.size, Math.random() > 0.5 ? 1 : -1);
        startLoop();
        return;
      }
      if ((e.key === ' ' || e.key === 'Enter') && st.gameState === 'over') {
        e.preventDefault();
        initGame(st.size, 1);
        st.gameState = 'running';
        setGameState('running');
        startLoop();
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }
      keysRef.current[e.key] = true;
    };
    const onKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onExit, startLoop, initGame, stopLoop, resetBall]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = getWidth('lg');
    canvas.height = getHeight('lg');
    stateRef.current.size = 'lg';
    initGame('lg', 1);
    return () => stopLoop();
  }, [initGame, stopLoop]);

  return (
    <div className="flex flex-col items-center gap-2 p-3">
      <div className="flex justify-between items-start w-full">
        <div>
          <div className="text-[10px] text-noct-neon uppercase tracking-widest">pong_os v1.0</div>
          <div className="text-white text-sm font-bold">
            <span className="text-[#a78bfa]">{playerScore}</span>
            <span className="text-gray-500 mx-1">:</span>
            <span className="text-[#f87171]">{aiScore}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <button
            onClick={() => { stopLoop(); onExit(); }}
            className="text-[10px] border border-noct-border text-noct-neon px-3 py-0.5 rounded font-mono hover:border-noct-purple transition-colors"
          >
            exit
          </button>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={SIZES.lg.w}
          height={SIZES.lg.h}
          className="border border-[#4c1d95] bg-[#020110] block"
        />
        {(gameState === 'waiting' || gameState === 'over') && (
          <div className="absolute inset-0 bg-[#06041388] flex flex-col items-center justify-center gap-2">
            <div className="text-noct-neon text-base font-bold tracking-widest">
              {gameState === 'over' ? 'juego terminado' : 'PONG_OS'}
            </div>
            {gameState === 'over' && (
              <div className="text-gray-300 text-[11px]">
                {playerScore > aiScore ? '¡Ganaste!' : 'Perdiste :('} · {playerScore}:{aiScore}
              </div>
            )}
            <div className="text-gray-400 text-[10px]">
              {gameState === 'over' ? 'espacio / enter para jugar de nuevo' : 'presiona espacio o enter para iniciar'}
            </div>
          </div>
        )}
      </div>

      <div className="text-gray-500 text-[10px] text-center">
        W/S o ↑↓ para mover · ESC para salir
      </div>
    </div>
  );
}

export default PongGame;
