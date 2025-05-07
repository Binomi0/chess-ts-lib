import { BoardCell, Movement, Position } from "./chessBoard";

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

abstract class Piece {
  constructor(
    public color: PieceColor,
    public type: PieceType,
  ) {}

  abstract getAllAvailableMoves(
    board: BoardCell[][],
    from: Position,
    directions: Position[],
  ): Position[];
  abstract validateMove(board: BoardCell[][], movement: Movement): boolean;
}

export default Piece;
