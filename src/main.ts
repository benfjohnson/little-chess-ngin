// Little chess engine...

import engine from './logic.js';

import type { BoardPosition, RowPosition, ColPosition } from './logic.js';

function ask(question: string): Promise<string> {
  const stdin = process.stdin, stdout = process.stdout;
  stdin.resume();
  stdout.write(question);

  return new Promise((resolve) => {
    stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });    
  });
}

function isRowPos(s: string): s is RowPosition {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(s);
}

function isColPos(n: number): n is ColPosition {
  return [1, 2, 3, 4, 5, 6, 7, 8].includes(n);
}

function parseAnswer(answer: string): [BoardPosition, BoardPosition] | null {
  const [fromStr, toStr] = answer.split(',');
  const [fromX, fromY] = fromStr.split('');
  const [toX, toY] = toStr.split('');
  const fromYNum = parseInt(fromY, 10);
  const toYNum = parseInt(toY, 10);

  if (!isRowPos(fromX) || !isRowPos(toX) || !isColPos(fromYNum) || !isColPos(toYNum)) {
    return null;
  }

  return [[fromX, fromYNum], [toX, toYNum]];
}

let game = engine.new();
let answer;

console.log('Press q at any time to exit');

(async () => {
  do {
    engine.print(game);
    answer = await ask('Please enter start/end location in AX,BY format:');
    const parsedAnswer = parseAnswer(answer);

    if (parsedAnswer == null) {
      console.log('Invalid input, try again.');
      continue;
    }

    const [fromPos, toPos] = parsedAnswer;
    
    game = engine.move(fromPos, toPos, game);
  } while (!/^q$/.test(answer));
})();
