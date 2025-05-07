import { BoardCell, Movement, Position } from "../chessBoard";
import MultiMoveValidator from "../multiMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import PieceDirections from "./directions";

export class Queen extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Queen;
  private readonly queenSymbols = {
    [PieceColor.White]: "♕",
    [PieceColor.Black]: "♛",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.Queen);
    this.symbol = this.queenSymbols[color];
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return MultiMoveValidator.getAvailableMoves(board, this.directions, from);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return MultiMoveValidator.validateMove(board, this.directions, movement);
  }
}
