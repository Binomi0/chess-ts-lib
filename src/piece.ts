interface Piece {
  color: Readonly<PieceColor>;
  type: Readonly<PieceType>;
  move(): void;
}

export type PieceColor = "black" | "white";
export type PieceType =
  | "Pawn"
  | "Rook"
  | "Knight"
  | "Bishop"
  | "Queen"
  | "King";

class Piece implements Piece {
  color: PieceColor;
  type: PieceType;

  constructor(color: PieceColor, type: PieceType) {
    this.color = color;
    this.type = type;
  }

  move(): void {
    console.log("Piece moved");
  }
}

export default Piece;
