import { BoardCell, Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Bishop extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Bishop;

  constructor(color: PieceColor) {
    super(color, PieceType.Bishop);
    this.symbol = color === PieceColor.White ? "♗" : "♝";
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return MultiMoveValidator.validateMove(board, this.directions, movement);
  }
}
