import ChessBoard, { Movement } from "./chessBoard";

export type Position = [number, number];
export type PieceColor = "black" | "white";
export type PieceType =
  | "Pawn"
  | "Rook"
  | "Knight"
  | "Bishop"
  | "Queen"
  | "King";

interface Piece {
  color: Readonly<PieceColor>;
  type: Readonly<PieceType>;
  validateMove(board: ChessBoard["board"], movement: Movement): boolean;
}

class Piece implements Piece {
  color: PieceColor;
  type: PieceType;

  constructor(color: PieceColor, type: PieceType) {
    this.color = color;
    this.type = type;
  }
}

export default Piece;
