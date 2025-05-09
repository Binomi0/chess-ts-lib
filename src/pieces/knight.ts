import { Movement, Position } from "../chessBoard";
import Piece, { PieceColor, PieceType } from "../piece";
import SingleMove from "../board/singleMove";
import PieceDirections from "./directions";
import StateManager from "../board/stateManager";

export class Knight extends Piece {
  readonly symbol: string;
  readonly directions: Position[] = PieceDirections.Knight;
  private readonly knightSymbols = {
    [PieceColor.White]: "♘",
    [PieceColor.Black]: "♞",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.Knight);
    this.symbol = this.knightSymbols[color];
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const movement: Movement = { from, piece: this, to: [0, 0] };
    return SingleMove.getAvailableMoves(boardStateManager, movement);
  }

  validateMove(boardStateManager: StateManager, movement: Movement): boolean {
    return SingleMove.validateMove(boardStateManager, movement);
  }
}
