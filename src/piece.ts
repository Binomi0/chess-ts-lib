import BoardStateManager from "./board/boardStateManager";
import { Movement, Position } from "./chessBoard";

export enum PieceType {
  King = "King",
  Queen = "Queen",
  Rook = "Rook",
  Bishop = "Bishop",
  Knight = "Knight",
  Pawn = "Pawn",
}

export enum PieceColor {
  White = "white",
  Black = "black",
}

abstract class Piece {
  constructor(
    public color: PieceColor,
    public type: PieceType,
  ) {}
  abstract symbol: string;
  protected readonly directions: Position[] = [];
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
    boardStateManager: BoardStateManager,
    from: Position,
    directions: Position[],
  ): Position[];
  abstract validateMove(
    boardStateManager: BoardStateManager,
    movement: Movement,
  ): boolean;
}

export default Piece;
