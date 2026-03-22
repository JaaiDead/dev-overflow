import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";

type HistoryItem = { type: "input" | "output"; text: string };

type Mark = "X" | "O";
type BoardCell = Mark | null;
type TicTacToeBoard = BoardCell[];

type GameStats = {
  played: number;
  playerWins: number;
  terminalWins: number;
  draws: number;
  streak: number;
  bestStreak: number;
};

type TicTacToeGameState = {
  board: TicTacToeBoard;
  playerMark: Mark;
  terminalMark: Mark;
};

const COMMANDS = {
  about:
    "I'm Jaai, a developer who loves building Minecraft mods and web apps. 4+ years of coding, 1M+ downloads!",
  skills: "Java • JavaScript • React • TypeScript • Minecraft Modding • Chess Strategies",
  projects: "Check out my 12 published mods with 111.7K Modrinth + 1M+ CurseForge downloads!",
  coffee: "☕ *sips coffee* That's better. Ready to code more!",
  joke: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  secret: "🎮 Easter egg found! You've unlocked the konami code... just kidding, or am I?",
  clear: "__CLEAR__",
};

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const HELP_LINES = [
  "Available commands: help, about, skills, projects, coffee, joke, secret, game, stats, clear",
  "Run 'game' to play Tic-Tac-Toe (X/O).",
];
const GAME_HELP_LINES = [
  "You are X, terminal is O.",
  "Place a mark with: 1-9, 'move 1-9', or 'play 1-9'.",
  "Board slots: 1|2|3, 4|5|6, 7|8|9.",
  "In-game commands: board, help, quit.",
];
const EMPTY_STATS: GameStats = {
  played: 0,
  playerWins: 0,
  terminalWins: 0,
  draws: 0,
  streak: 0,
  bestStreak: 0,
};

function createGame(): TicTacToeGameState {
  return {
    board: Array.from({ length: 9 }, () => null),
    playerMark: "X",
    terminalMark: "O",
  };
}

function withOutput(history: HistoryItem[], ...lines: string[]): HistoryItem[] {
  return [...history, ...lines.map((text) => ({ type: "output" as const, text }))];
}

function renderBoard(board: TicTacToeBoard): string[] {
  const cell = (index: number) => board[index] ?? String(index + 1);
  return [
    ` ${cell(0)} | ${cell(1)} | ${cell(2)} `,
    "---+---+---",
    ` ${cell(3)} | ${cell(4)} | ${cell(5)} `,
    "---+---+---",
    ` ${cell(6)} | ${cell(7)} | ${cell(8)} `,
  ];
}

function getWinner(board: TicTacToeBoard): Mark | null {
  for (const [a, b, c] of WIN_LINES) {
    const mark = board[a];
    if (mark !== null && mark === board[b] && mark === board[c]) {
      return mark;
    }
  }
  return null;
}

function isBoardFull(board: TicTacToeBoard): boolean {
  return board.every((cell) => cell !== null);
}

function getAvailableMoves(board: TicTacToeBoard): number[] {
  const moves: number[] = [];
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

function findWinningMove(board: TicTacToeBoard, mark: Mark): number | null {
  for (const move of getAvailableMoves(board)) {
    const next = [...board];
    next[move] = mark;
    if (getWinner(next) === mark) {
      return move;
    }
  }
  return null;
}

function chooseTerminalMove(board: TicTacToeBoard, terminalMark: Mark, playerMark: Mark): number {
  const winningMove = findWinningMove(board, terminalMark);
  if (winningMove !== null) {
    return winningMove;
  }

  const blockingMove = findWinningMove(board, playerMark);
  if (blockingMove !== null) {
    return blockingMove;
  }

  if (board[4] === null) {
    return 4;
  }

  const available = getAvailableMoves(board);
  const corners = available.filter(
    (index) => index === 0 || index === 2 || index === 6 || index === 8,
  );
  const pool = corners.length > 0 ? corners : available;
  return pool[Math.floor(Math.random() * pool.length)];
}

function parseMove(cmd: string): number | null {
  if (/^[1-9]$/.test(cmd)) {
    return Number(cmd) - 1;
  }

  const matched = cmd.match(/^(?:move|play)\s+([1-9])$/);
  if (matched) {
    return Number(matched[1]) - 1;
  }

  return null;
}

function formatStats(stats: GameStats): string[] {
  const winRate = stats.played === 0 ? 0 : Math.round((stats.playerWins / stats.played) * 100);

  return [
    `Games: ${stats.played} | You: ${stats.playerWins} | Terminal: ${stats.terminalWins} | Draws: ${stats.draws}`,
    `Win rate: ${winRate}% | Current streak: ${stats.streak} | Best streak: ${stats.bestStreak}`,
  ];
}

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "Welcome! Type 'help' for available commands." },
  ]);
  const [game, setGame] = useState<TicTacToeGameState | null>(null);
  const [stats, setStats] = useState<GameStats>(EMPTY_STATS);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (!raw) return;

    const newHistory: HistoryItem[] = [...history, { type: "input", text: raw }];

    if (game) {
      if (cmd === "help") {
        setHistory(withOutput(newHistory, ...GAME_HELP_LINES));
        setInput("");
        return;
      }

      if (cmd === "board" || cmd === "status") {
        setHistory(withOutput(newHistory, ...renderBoard(game.board), "Your move: type 1-9."));
        setInput("");
        return;
      }

      if (cmd === "quit" || cmd === "exit") {
        setGame(null);
        setHistory(
          withOutput(
            newHistory,
            "Game ended.",
            "No stats were recorded for this run.",
            "Type 'game' to play again.",
          ),
        );
        setInput("");
        return;
      }

      const move = parseMove(cmd);

      if (move === null) {
        setHistory(
          withOutput(
            newHistory,
            "Invalid move. Enter 1-9 (or use 'move 5').",
            "Type 'board' to view the grid or 'help' for game commands.",
          ),
        );
        setInput("");
        return;
      }

      if (game.board[move] !== null) {
        setHistory(
          withOutput(
            newHistory,
            `Slot ${move + 1} is already taken.`,
            ...renderBoard(game.board),
            "Choose another slot.",
          ),
        );
        setInput("");
        return;
      }

      const playerBoard = [...game.board];
      playerBoard[move] = game.playerMark;
      const playerBoardLines = [
        `You placed ${game.playerMark} at ${move + 1}.`,
        ...renderBoard(playerBoard),
      ];
      const playerWinner = getWinner(playerBoard);

      if (playerWinner === game.playerMark) {
        setGame(null);
        setStats((prev) => {
          const streak = prev.streak + 1;
          return {
            played: prev.played + 1,
            playerWins: prev.playerWins + 1,
            terminalWins: prev.terminalWins,
            draws: prev.draws,
            streak,
            bestStreak: Math.max(prev.bestStreak, streak),
          };
        });
        setHistory(
          withOutput(newHistory, ...playerBoardLines, "🎉 You win! Type 'game' to play again."),
        );
      } else if (isBoardFull(playerBoard)) {
        setGame(null);
        setStats((prev) => ({
          played: prev.played + 1,
          playerWins: prev.playerWins,
          terminalWins: prev.terminalWins,
          draws: prev.draws + 1,
          streak: 0,
          bestStreak: prev.bestStreak,
        }));
        setHistory(
          withOutput(newHistory, ...playerBoardLines, "🤝 Draw game. Type 'game' for a rematch."),
        );
      } else {
        const terminalMove = chooseTerminalMove(playerBoard, game.terminalMark, game.playerMark);
        const nextBoard = [...playerBoard];
        nextBoard[terminalMove] = game.terminalMark;
        const roundLines = [
          ...playerBoardLines,
          `Terminal placed ${game.terminalMark} at ${terminalMove + 1}.`,
          ...renderBoard(nextBoard),
        ];
        const terminalWinner = getWinner(nextBoard);

        if (terminalWinner === game.terminalMark) {
          setGame(null);
          setStats((prev) => ({
            played: prev.played + 1,
            playerWins: prev.playerWins,
            terminalWins: prev.terminalWins + 1,
            draws: prev.draws,
            streak: 0,
            bestStreak: prev.bestStreak,
          }));
          setHistory(
            withOutput(newHistory, ...roundLines, "💥 Terminal wins. Type 'game' to retry."),
          );
        } else if (isBoardFull(nextBoard)) {
          setGame(null);
          setStats((prev) => ({
            played: prev.played + 1,
            playerWins: prev.playerWins,
            terminalWins: prev.terminalWins,
            draws: prev.draws + 1,
            streak: 0,
            bestStreak: prev.bestStreak,
          }));
          setHistory(
            withOutput(newHistory, ...roundLines, "🤝 Draw game. Type 'game' for a rematch."),
          );
        } else {
          setGame({ ...game, board: nextBoard });
          setHistory(withOutput(newHistory, ...roundLines, "Your move: type 1-9 (or 'board')."));
        }
      }

      setInput("");
      return;
    }

    if (cmd === "help") {
      setHistory(withOutput(newHistory, ...HELP_LINES));
    } else if (cmd === "game") {
      const nextGame = createGame();
      setGame(nextGame);
      setHistory(
        withOutput(
          newHistory,
          "⭕ X/O game started!",
          ...GAME_HELP_LINES,
          ...renderBoard(nextGame.board),
          "Your move: type 1-9.",
        ),
      );
    } else if (cmd === "stats") {
      setHistory(
        withOutput(newHistory, "X/O stats:", ...formatStats(stats), "Start a run with 'game'."),
      );
    } else if (cmd in COMMANDS) {
      const response = COMMANDS[cmd as keyof typeof COMMANDS];
      if (response === "__CLEAR__") {
        setGame(null);
        setHistory([{ type: "output", text: "Terminal cleared. Type 'help' for commands." }]);
      } else {
        setHistory(withOutput(newHistory, response));
      }
    } else {
      setHistory(withOutput(newHistory, `Command not found: ${cmd}. Type 'help' for commands.`));
    }

    setInput("");
  };

  return (
    <div className="relative flex justify-start">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 clay-button flex items-center justify-center text-accent hover:scale-110 active:scale-95 transition-all group"
        title="Open Terminal"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Terminal" : "Open Terminal"}
      >
        <Terminal size={20} className="group-hover:rotate-12 transition-transform" />
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 z-40 w-[90vw] max-w-md glass-clay border border-accent/20 overflow-hidden animate-slide-up">
          <div className="flex items-center justify-between px-4 py-2 bg-accent/5 border-b border-accent/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[10px] text-text-dim dark:text-dark-text-dim ml-2">
                {game ? "jaai@terminal · x/o" : "jaai@terminal"}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-dim dark:text-dark-text-dim hover:text-accent transition-colors text-xs"
            >
              ✕
            </button>
          </div>

          <div
            ref={historyRef}
            className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-2 scrollbar-thin"
          >
            {history.map((item, i) => (
              <div key={i}>
                {item.type === "input" ? (
                  <div className="flex items-start gap-2">
                    <span className="text-accent">›</span>
                    <span className="text-text-primary dark:text-dark-text-primary">
                      {item.text}
                    </span>
                  </div>
                ) : (
                  <div className="text-text-dim dark:text-dark-text-dim pl-4">{item.text}</div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-accent/20 p-4">
            <div className="flex items-center gap-2">
              <span className="text-accent font-mono text-xs">›</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none font-mono text-xs text-text-primary dark:text-dark-text-primary placeholder:text-text-dim/50"
                placeholder={game ? "enter 1-9 or board/help/quit..." : "type a command..."}
                autoComplete="off"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
