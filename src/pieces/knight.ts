import { Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import SingleMoveValidator from "../board/singleMoveValidator";
import PieceDirections from "./directions";
import BoardStateManager from "../board/boardStateManager";

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

  getAllAvailableMoves(boardStateManager: BoardStateManager, from: Position) {
    return SingleMoveValidator.getAvailableMoves(
      boardStateManager,
      this.directions,
      from,
    );
  }

  validateMove(
    boardStateManager: BoardStateManager,
    movement: Movement,
  ): boolean {
    return SingleMoveValidator.validateMove(
      boardStateManager,
      this.directions,
      movement,
    );
  }
}
