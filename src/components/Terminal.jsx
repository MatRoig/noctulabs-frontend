import { useState, useEffect, useRef, useCallback } from 'react';

const SIZES = {
  sm: { cell: 10, w: 200, h: 200 },
  md: { cell: 14, w: 280, h: 280 },
  lg: { cell: 18, w: 360, h: 360 },
};

function SnakeGame({ onExit }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    snake: [], dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 },
    food: { x: 0, y: 0 }, score: 0, loop: null,
    gameState: 'waiting', // 'waiting' | 'running' | 'over'
    size: 'sm',
  });
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('waiting'); // for UI
  const [size, setSize] = useState('sm');
  const touchRef = useRef({ x: 0, y: 0 });

  const getCols = (s) => Math.floor(SIZES[s].w / SIZES[s].cell);
  const getRows = (s) => Math.floor(SIZES[s].h / SIZES[s].cell);

  const placeFood = useCallback((snakeBody, s) => {
    const cols = getCols(s), rows = getRows(s);
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } while (snakeBody.some(seg => seg.x === pos.x && seg.y === pos.y));
    return pos;
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { snake, food, size: s } = stateRef.current;
    const cs = SIZES[s].cell;
    ctx.fillStyle = '#020110';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#a78bfa' : '#6d28d9';
      ctx.fillRect(seg.x * cs + 1, seg.y * cs + 1, cs - 2, cs - 2);
      if (i === 0) {
        ctx.fillStyle = '#ffffff';
        const ey = Math.floor(cs * 0.3), ex = Math.floor(cs * 0.25);
        ctx.fillRect(seg.x * cs + ex, seg.y * cs + ey, 2, 2);
        ctx.fillRect(seg.x * cs + cs - ex - 2, seg.y * cs + ey, 2, 2);
      }
    });
    ctx.fillStyle = '#f87171';
    ctx.fillRect(food.x * cs + 1, food.y * cs + 1, cs - 2, cs - 2);
  }, []);

  const initSnake = useCallback((s) => {
    const cols = getCols(s), rows = getRows(s);
    const cx = Math.floor(cols / 2), cy = Math.floor(rows / 2);
    const snake = [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }];
    stateRef.current.snake = snake;
    stateRef.current.dir = { x: 1, y: 0 };
    stateRef.current.nextDir = { x: 1, y: 0 };
    stateRef.current.score = 0;
    stateRef.current.food = placeFood(snake, s);
    stateRef.current.size = s;
    setScore(0);
    drawFrame();
  }, [placeFood, drawFrame]);

  const stopLoop = useCallback(() => {
    if (stateRef.current.loop) {
      clearInterval(stateRef.current.loop);
      stateRef.current.loop = null;
    }
  }, []);

  const tick = useCallback(() => {
    const st = stateRef.current;
    st.dir = st.nextDir;
    const head = { x: st.snake[0].x + st.dir.x, y: st.snake[0].y + st.dir.y };
    const cols = getCols(st.size), rows = getRows(st.size);
    const hit = head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows
      || st.snake.some(seg => seg.x === head.x && seg.y === head.y);
    if (hit) {
      stopLoop();
      st.gameState = 'over';
      setGameState('over');
      drawFrame();
      return;
    }
    st.snake.unshift(head);
    if (head.x === st.food.x && head.y === st.food.y) {
      st.score++;
      setScore(st.score);
      st.food = placeFood(st.snake, st.size);
    } else {
      st.snake.pop();
    }
    drawFrame();
  }, [stopLoop, drawFrame, placeFood]);

  const startLoop = useCallback(() => {
    stopLoop();
    stateRef.current.loop = setInterval(tick, 120);
  }, [stopLoop, tick]);

  const changeSize = useCallback((s) => {
    setSize(s);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = SIZES[s].w;
    canvas.height = SIZES[s].h;
    stopLoop();
    stateRef.current.gameState = 'waiting';
    setGameState('waiting');
    initSnake(s);
  }, [stopLoop, initSnake]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e) => {
      const st = stateRef.current;
      if (e.key === 'Escape') { stopLoop(); onExit(); return; }
      if ((e.key === ' ' || e.key === 'Enter') && st.gameState === 'waiting') {
        e.preventDefault();
        st.gameState = 'running';
        setGameState('running');
        startLoop();
        return;
      }
      if ((e.key === ' ' || e.key === 'Enter') && st.gameState === 'over') {
        e.preventDefault();
        initSnake(st.size);
        st.gameState = 'running';
        setGameState('running');
        startLoop();
        return;
      }
      const map = {
        ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
      };
      if (map[e.key]) {
        e.preventDefault();
        const d = map[e.key];
        const cur = stateRef.current.dir;
        if (d.x !== -cur.x || d.y !== -cur.y) stateRef.current.nextDir = d;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit, startLoop, initSnake, stopLoop]);

  // Touch handlers
  useEffect(() => {
    const onTouchStart = (e) => {
      touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchRef.current.x;
      const dy = e.changedTouches[0].clientY - touchRef.current.y;
      const cur = stateRef.current.dir;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && cur.x !== -1) stateRef.current.nextDir = { x: 1, y: 0 };
        else if (dx < 0 && cur.x !== 1) stateRef.current.nextDir = { x: -1, y: 0 };
      } else {
        if (dy > 0 && cur.y !== -1) stateRef.current.nextDir = { x: 0, y: 1 };
        else if (dy < 0 && cur.y !== 1) stateRef.current.nextDir = { x: 0, y: -1 };
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Init on mount
  useEffect(() => {
    initSnake('sm');
    return () => stopLoop();
  }, [initSnake, stopLoop]);

  const sizeBtn = (s, label) => (
    <button
      key={s}
      onClick={() => changeSize(s)}
      className={`text-[10px] px-2 py-0.5 rounded border font-mono transition-colors ${
        size === s
          ? 'border-noct-purple text-noct-neon'
          : 'border-noct-border text-gray-500 hover:border-noct-purple hover:text-noct-neon'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-2 p-3">
      <div className="flex justify-between items-start w-full">
        <div>
          <div className="text-[10px] text-noct-neon uppercase tracking-widest">snake_os v1.0</div>
          <div className="text-white text-sm font-bold">
            score: <span>{score}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex gap-1">
            {sizeBtn('sm', 'S')}
            {sizeBtn('md', 'M')}
            {sizeBtn('lg', 'L')}
          </div>
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
          width={SIZES.sm.w}
          height={SIZES.sm.h}
          className="border border-[#4c1d95] bg-[#020110] block"
        />
        {(gameState === 'waiting' || gameState === 'over') && (
          <div className="absolute inset-0 bg-[#06041388] flex flex-col items-center justify-center gap-2">
            <div className="text-noct-neon text-base font-bold tracking-widest">
              {gameState === 'over' ? 'perdiste :(' : 'SNAKE_OS'}
            </div>
            {gameState === 'over' && (
              <div className="text-gray-300 text-[11px]">score: {score}</div>
            )}
            <div className="text-gray-400 text-[10px]">
              {gameState === 'over' ? 'espacio / enter para reiniciar' : 'presiona espacio o enter para iniciar'}
            </div>
          </div>
        )}
      </div>

      <div className="text-gray-500 text-[10px] text-center">
        ← ↑ → ↓ para mover · ESC para salir
      </div>
    </div>
  );
}

export default function Terminal({ t, lang }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [gameMode, setGameMode] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const logsEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMsg = [
    t.terminal.welcome,
    t.terminal.help_msg,
    '------------------------------------------------',
  ];

  useEffect(() => {
    setTerminalLogs(welcomeMsg);
  }, [lang]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const exitGame = useCallback(() => {
    setGameMode(false);
    setTerminalLogs(prev => [...prev, '>> Juego terminado. Bienvenido de vuelta.']);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const executeCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setTerminalLogs(welcomeMsg);
      return;
    }

    if (cleanCmd === 'snake') {
      setGameMode(true);
      return;
    }

    if (cleanCmd === 'exit') {
      exitGame();
      return;
    }

    let response = [];
    if (cleanCmd === 'help') {
      response = [
        `> ${cmd}`, t.terminal.help,
        `  team     - ${t.terminal.t_desc}`,
        `  clear    - ${t.terminal.c_desc}`,
        `  secret   - ${t.terminal.s_desc}`,
        `  snake    - Iniciar juego Snake`,
        `  exit     - Salir del juego`,
      ];
    } else if (cleanCmd === 'team') {
      response = [
        `> ${cmd}`, 'Core Developers online:',
        '  * Miussete  -> UI/UX & Java Backend',
        '  * Fernando  -> Security & Database',
        '  * Matias    -> Web Integration',
        '  * Monse     -> QA & Performance',
        '  * Zuelem    -> Data Logic',
        '  * Alonso    -> System Architect',
      ];
    } else if (cleanCmd === 'secret') {
      response = [`> ${cmd}`, t.terminal.secret];
    } else {
      response = [`> ${cmd}`, t.terminal.unknown];
    }
    setTerminalLogs(prev => [...prev, ...response]);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 font-mono">
      {!terminalOpen && (
        <button
          onClick={() => setTerminalOpen(true)}
          className="bg-[#0a0818]/90 border border-noct-purple hover:border-noct-neon text-noct-neon px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl transition-all text-[10px] sm:text-xs flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-noct-neon animate-pulse" />
          <span>noctulabs_shell.sh</span>
        </button>
      )}

      {terminalOpen && (
        <div
          className={`bg-[#060413]/95 border-2 border-noct-purple rounded-xl shadow-2xl overflow-hidden flex flex-col ${
            gameMode ? '' : 'w-72 max-sm:w-[calc(100vw-2rem)] sm:w-96'
          }`}
          style={{ width: gameMode ? 'auto' : undefined }}
        >
          <div className="bg-[#0a0818] px-4 py-2 flex items-center justify-between border-b border-noct-border">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-gray-500 text-[11px]">noctulabs_shell — bash</span>
            <button
              onClick={() => { setGameMode(false); setTerminalOpen(false); }}
              className="text-gray-400 hover:text-noct-neon text-xs font-bold"
            >✕</button>
          </div>

          {gameMode ? (
            <SnakeGame onExit={exitGame} />
          ) : (
            <>
              <div className="h-48 overflow-y-auto p-4 flex flex-col gap-1 text-[11px] text-gray-300">
                {terminalLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap leading-tight ${
                      log.startsWith('>') ? 'text-noct-neon' : log.includes('🦉') ? 'text-noct-neon font-bold' : ''
                    }`}
                  >
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              <form
                onSubmit={(e) => { e.preventDefault(); executeCommand(terminalInput); setTerminalInput(''); }}
                className="border-t border-noct-border bg-[#03020a] p-3 flex items-center gap-2"
              >
                <span className="text-noct-neon font-bold text-xs">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type command..."
                  className="flex-grow bg-transparent text-noct-neon focus:outline-none text-xs"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-[10px] bg-noct-purple hover:bg-purple-600 px-2 py-1 rounded text-white font-bold"
                >
                  Run
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}