import { BoardCell, Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Bishop extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Bishop;
  private readonly bishopSymbols = {
    [PieceColor.White]: "♗",
    [PieceColor.Black]: "♝",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.Bishop);
    this.symbol = this.bishopSymbols[color];
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return MultiMoveValidator.getAvailableMoves(board, this.directions, from);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return MultiMoveValidator.validateMove(board, this.directions, movement);
  }
}
