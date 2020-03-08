type Color = "White" | "Black";

type Board = Array<Array<Piece | null>>;

type Rank = "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King";

type Piece = { color: Color, rank: Rank };

function getMajorMinorPieces(color: Color): Array<Piece> {
  return [ { color, rank: "Rook" }, { color, rank: "Knight" }, { color, rank: "Bishop" }, { color, rank: "Queen" }, { color, rank: "King" }, { color, rank: "Bishop" }, { color, rank: "Knight" }, { color, rank: "Rook" } ];
}

function getPawns(color: Color): Array<Piece> {
  return [ ...Array(8) ].map(_ => ({ color, rank: "Pawn" }));
}

function getEmptyRow() {
  return [ ...Array(8) ].map(_ => null);
}

function createBoard(): Board {
  return [
    getMajorMinorPieces("Black"),
    getPawns("Black"),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getEmptyRow(),
    getPawns("White"),
    getMajorMinorPieces("White"),
  ];
}

type Game = {
  turn: Color,
  board: Board,
  mate: Color | null,
  moveError: string | null,
};


function createGame(): Game {
  return { turn: 'White', board: createBoard(), mate: null, moveError: null };
}

export type RowPosition = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type ColPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type BoardPosition = [RowPosition, ColPosition];

function moveGame(fromPos: BoardPosition, toPos: BoardPosition, game: Game): Game {
  const [fromRow, fromCol] = fromPos;
  const [toRow, toCol] = toPos;

  const rowMap: { [key in RowPosition]: number } = { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7 };
  const fromRowIndex = rowMap[fromRow];
  const toRowIndex = rowMap[toRow];

  const pieceToMove: Piece | null  = game.board[rowMap[fromRow]][fromCol - 1];
  // Need to clone this so we don't trample it's value when nulling out the former position
  const movedPiece = pieceToMove == null
    ? null
    : { ...pieceToMove };

  game.board[fromRowIndex][fromCol - 1] = null;
  game.board[toRowIndex][toCol - 1] = movedPiece;

  return game;
}

function printPiece(p: Piece | null, rowIdx: number, pieceIdx: number) {
  if (p == null) {
    const isWhiteSquare =
      (rowIdx % 2 === 0 && pieceIdx % 2 === 0)
      || (rowIdx % 2 !== 0 && pieceIdx % 2 !== 0);

    // These unicode chars are actually backwards, but "Black" square prints as white on a dark background (e.g. term window)
    return isWhiteSquare ? '\u25A0' : '\u25A1';
  }

  switch(p.rank) {
    case 'Pawn':
      return p.color === 'Black' ? '\u265F' : '\u2659';
    case 'Knight':
      return p.color === 'Black' ? '\u265E' : '\u2658';
    case 'Bishop':
      return p.color === 'Black' ? '\u265D' : '\u2657';
    case 'Rook':
      return p.color === 'Black' ? '\u265C' : '\u2656';
    case 'Queen':
      return p.color === 'Black' ? '\u265B' : '\u2655';
    case 'King':
      return p.color === 'Black' ? '\u265A' : '\u2654';
  }
};

function printRowStr(row: Array<Piece | null>, rowIdx: number): string {
  return row.reduce((rowStr, piece, pieceIdx) => {
    return `${rowStr} ${printPiece(piece, rowIdx, pieceIdx)}`;
  }, '');
}

function printBoard(b: Board): void {
  b.forEach((row, rowIdx) => console.log(printRowStr(row, rowIdx)));
}

function printGame(g: Game): void {
  console.log(`${g.turn} to move...`);
  printBoard(g.board);
}

const engine = {
  new: createGame,
  move: moveGame,
  print: printGame,
};

export default engine;

