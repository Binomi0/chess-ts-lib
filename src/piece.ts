import { BoardCell, Movement, Position } from "./chessBoard";
import { isInBounds, isCellEmpty, isCellCaptured } from "./utils/helpers";

export enum PieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

interface Piece {
  color: PieceColor;
  type: PieceType;
  symbol: string;
}

abstract class Piece implements Piece {
  color: PieceColor;
  type: PieceType;

  constructor(color: PieceColor, type: PieceType) {
    this.color = color;
    this.type = type;
  }

  abstract getAllAvailableMoves(
    board: BoardCell[][],
    from: Position,
    directions: Position[],
  ): Position[];
  abstract validateMove(board: BoardCell[][], movement: Movement): boolean;
}

export default Piece;
