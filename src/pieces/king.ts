import { Movement, Position } from "../chessBoard";
import BoardValidations from "../board/boardValidations";
import SingleMoveValidator from "../board/singleMoveValidator";
import Piece, { PieceColor, PieceType } from "../piece";
import { cloneBoard } from "../utils/helpers";
import PieceDirections from "./directions";
import BoardStateManager from "../board/boardStateManager";

export class King extends Piece {
  readonly symbol: string;
  protected readonly directions: Position[] = PieceDirections.King;
  private readonly kingSymbols = {
    [PieceColor.White]: "♔",
    [PieceColor.Black]: "♚",
  };

  constructor(color: PieceColor) {
    super(color, PieceType.King);
    this.symbol = this.kingSymbols[color];
  }

  getAllAvailableMoves(boardStateManager: BoardStateManager, from: Position) {
    const moves = SingleMoveValidator.getAvailableMoves(
      boardStateManager,
      this.directions,
      from,
    );

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
