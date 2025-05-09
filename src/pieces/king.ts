import { Movement, Position } from "../chessBoard";
import BoardValidations from "../board/boardValidations";
import SingleMove from "../board/singleMove";
import Piece, { PieceColor, PieceType } from "../piece";
import { cloneBoard } from "../utils/helpers";
import PieceDirections from "./directions";
import StateManager from "../board/stateManager";

export class King extends Piece {
  readonly symbol: string;
  directions: Position[] = PieceDirections.King;
  private readonly kingSymbols = {
    [PieceColor.White]: "♔",
    [PieceColor.Black]: "♚",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.King);
    this.symbol = this.kingSymbols[color];
  }

  getAllAvailableMoves(boardStateManager: StateManager, from: Position) {
    const movement: Movement = { from, piece: this, to: [0, 0] };
    const moves = SingleMove.getAvailableMoves(boardStateManager, movement);

    const tempBoard = cloneBoard(boardStateManager.getBoardSnapshot());

    const piece = boardStateManager.getCell(from);
    return moves.filter((move) => {
      tempBoard[move[0]][move[1]] = piece;
      tempBoard[from[0]][from[1]] = undefined;

      return BoardValidations.isKingInCheck(
        boardStateManager,
        tempBoard,
        this.color,
      );
    });
  }

  validateMove(boardStateManager: StateManager, movement: Movement): boolean {
    return SingleMove.validateMove(boardStateManager, movement);
  }
}
