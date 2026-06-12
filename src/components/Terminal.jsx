import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SnakeGame from './SnakeGame';

export default function Terminal({ t }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [gameMode, setGameMode] = useState(false);
  const [commandLogs, setCommandLogs] = useState([]);
  const logsEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMsg = useMemo(() => [
    t.terminal.welcome,
    t.terminal.help_msg,
    '------------------------------------------------',
  ], [t.terminal.welcome, t.terminal.help_msg]);

  const terminalLogs = useMemo(() => [...welcomeMsg, ...commandLogs], [welcomeMsg, commandLogs]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  const exitGame = useCallback(() => {
    setGameMode(false);
    setCommandLogs(prev => [...prev, '>> Juego terminado. Bienvenido de vuelta.']);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const executeCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setCommandLogs([]);
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
    setCommandLogs(prev => [...prev, ...response]);
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