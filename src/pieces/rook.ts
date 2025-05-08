import { BoardCell, Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../board/multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Rook extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Rook;

  constructor(color: PieceColor) {
    super(color, PieceType.Rook);
    this.symbol = this.getSymbol();
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return MultiMoveValidator.getAvailableMoves(board, this.directions, from);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return MultiMoveValidator.validateMove(board, this.directions, movement);
  }
}
