import { useState, useEffect } from 'react';

export default function Terminal({ t, lang }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    t.terminal.welcome,
    t.terminal.help_msg,
    '------------------------------------------------'
  ]);

  useEffect(() => {
    setTerminalLogs([
      t.terminal.welcome,
      t.terminal.help_msg,
      '------------------------------------------------'
    ]);
  }, [lang]);

  const executeCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = [];
    if (cleanCmd === 'help') {
      response = [
        `> ${cmd}`, t.terminal.help,
        `  team     - ${t.terminal.t_desc}`,
        `  ping     - ${t.terminal.p_desc}`,
        `  clear    - ${t.terminal.c_desc}`,
        `  secret   - ${t.terminal.s_desc}`
      ];
    } else if (cleanCmd === 'team') {
      response = [
        `> ${cmd}`, 'Core Developers online:',
        '  * Miussete  -> UI/UX & Java Backend Architect',
        '  * Fernando  -> Security & Database Engineer',
        '  * Matias    -> Web Integration Specialist',
        '  * Monse     -> QA & Performance Analyst',
        '  * Zuelem    -> Data Logic Specialist',
        '  * Alonso    -> Tailwind & Core System Architect'
      ];
    } else if (cleanCmd === 'ping') {
      response = [
        `> ${cmd}`,
        'Pinging server nodes...',
        '  [Node 1: Valparaíso] -> Latency: 8ms (Stable)',
        '  [Node 2: Santiago]   -> Latency: 12ms (Stable)',
        '  Diagnostic complete. Status: OPTIMAL'
      ];
    } else if (cleanCmd === 'secret') {
      response = [`> ${cmd}`, t.terminal.secret];
    } else if (cleanCmd === 'clear') {
      setTerminalLogs([]);
      return;
    } else {
      response = [`> ${cmd}`, t.terminal.unknown];
    }
    setTerminalLogs(prev => [...prev, ...response]);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput);
    setTerminalInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {!terminalOpen && (
        <button
          onClick={() => setTerminalOpen(true)}
          className="bg-[#0a0818]/90 border border-noct-purple hover:border-noct-neon text-noct-neon px-5 py-3 rounded-full shadow-2xl transition-all text-xs flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-noct-neon animate-pulse" />
          <span>noctulabs_shell.sh</span>
        </button>
      )}
      {terminalOpen && (
        <div className="w-80 sm:w-96 bg-[#060413]/95 border-2 border-noct-purple rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-[#0a0818] px-4 py-2 flex items-center justify-between border-b border-noct-border">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-gray-400 ml-2">noctulabs_console.sh</span>
            </div>
            <button
              onClick={() => setTerminalOpen(false)}
              className="text-gray-400 hover:text-noct-neon text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
          <div className="h-48 overflow-y-auto p-4 flex flex-col gap-1 text-[11px] text-gray-300 scrollbar-thin">
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
          </div>
          <form
            onSubmit={handleTerminalSubmit}
            className="border-t border-noct-border bg-[#03020a] p-3 flex items-center gap-2"
          >
            <span className="text-noct-neon font-bold text-xs">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder={lang === 'es' ? "Escribe 'help'..." : "Type 'help'..."}
              className="flex-grow bg-transparent text-noct-neon focus:outline-none text-xs"
              autoFocus
            />
            <button
              type="submit"
              className="text-[10px] bg-noct-purple hover:bg-purple-600 px-2.5 py-1 rounded text-white font-bold"
            >
              Run
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
