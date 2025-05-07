import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import SingleMoveValidator from "../singleMoveValidator";
import PieceDirections from "./directions";

export class Knight extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Knight;

  constructor(color: PieceColor) {
    super(color, PieceType.Knight);
    this.symbol = color === PieceColor.White ? "♘" : "♞";
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return super.getAllAvailableMoves(board, from, this.directions);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return SingleMoveValidator.validateMove(board, this.directions, movement);
  }
}
