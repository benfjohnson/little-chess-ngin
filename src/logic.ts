export type Color = "White" | "Black";

export type Board = Array<Array<Piece | null>>;

export type Rank = "Pawn" | "Knight" | "Bishop" | "Rook" | "Queen" | "King";

export type Piece = { color: Color, rank: Rank };

function getMajorMinorPieces(color: Color): Array<Piece> {
  return [ { color, rank: "Rook" }, { color, rank: "Knight" }, { color, rank: "Bishop" }, { color, rank: "Queen" }, { color, rank: "King" }, { color, rank: "Bishop" }, { color, rank: "Knight" }, { color, rank: "Rook" } ];
}

function getPawns(color: Color): Array<Piece> {
  return [ ...Array(8) ].map(_ => ({ color, rank: "Pawn" }));
}

function getEmptyRow() {
  return [ ...Array(8) ].map(_ => null);
}

export function createBoard(): Board {
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

export function printBoard(b: Board): void {
  b.forEach((row, rowIdx) => console.log(printRowStr(row, rowIdx)));
}
