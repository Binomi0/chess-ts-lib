import StateManager from "./board/stateManager";
import { PieceColor, PieceType, Position, Movement } from "./types";

abstract class Piece {
  constructor(
    public color: PieceColor,
    public type: PieceType,
  ) {}
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

  getSymbol(): string {
    return this.pieceSymbols[this.color][this.type];
  }

  abstract getAllAvailableMoves(
    boardStateManager: StateManager,
    from: Position,
    directions: Position[],
  ): Position[];
  abstract validateMove(
    boardStateManager: StateManager,
    movement: Movement,
  ): boolean;
}

export default Piece;
