import { BoardCell, Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import SingleMoveValidator from "../singleMoveValidator";
import PieceDirections from "./directions";

export class Knight extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.Knight;
  private readonly knightSymbols = {
    [PieceColor.White]: "♘",
    [PieceColor.Black]: "♞",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.Knight);
    this.symbol = this.knightSymbols[color];
  }

  getAllAvailableMoves(board: BoardCell[][], from: Position) {
    return SingleMoveValidator.getAvailableMoves(board, this.directions, from);
  }

  validateMove(board: BoardCell[][], movement: Movement): boolean {
    return SingleMoveValidator.validateMove(board, this.directions, movement);
  }
}
