import StateManager from "../board/stateManager";
import PieceDirections from "../model/directions";
import { PieceColor, PieceType, Position } from "../types";

abstract class Piece {
  abstract symbol: string;
  readonly directions: Position[] = [];
  private readonly pieceSymbols = {
    [PieceColor.White]: {
      [PieceType.King]: "♔",
      [PieceType.Queen]: "♕",
      [PieceType.Rook]: "♖",
      [PieceType.Bishop]: "♗",
      [PieceType.Knight]: "♘",
      [PieceType.Pawn]: "♙",
    },
    [PieceColor.Black]: {
      [PieceType.King]: "♚",
      [PieceType.Queen]: "♛",
      [PieceType.Rook]: "♜",
      [PieceType.Bishop]: "♝",
      [PieceType.Knight]: "♞",
      [PieceType.Pawn]: "♟",
    },
  };

  constructor(
    public color: PieceColor,
    public type: PieceType,
  ) {
    this.directions = PieceDirections.getPieceDirections(type);
  }

  getSymbol(): string {
    return this.pieceSymbols[this.color][this.type];
  }

  abstract getAllAvailableMoves(
    boardStateManager: StateManager,
    from: Position,
    directions: Position[],
  ): Position[];
}

export default Piece;
