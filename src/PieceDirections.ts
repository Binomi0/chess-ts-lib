import { Position } from "./chessBoard";
import { PieceType } from "./piece";

class PieceDirections {
  static readonly King: Position[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  static readonly Queen: Position[] = [
    [-1, 0], // ↑
    [1, 0], // ↓
    [0, -1], // ←
    [0, 1], // →
    [-1, -1], // ↖️
    [-1, 1], // ↗️
    [1, -1], // ↙️
    [1, 1], // ↘️
  ];

  static readonly Knight: Position[] = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  static readonly Bishop: Position[] = [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  static readonly Rook: Position[] = [
    [-1, 0], // ↑
    [1, 0], // ↓
    [0, -1], // ←
    [0, 1], // →
  ];

  static readonly Pawn: Position[] = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  static getPieceDirections(type: PieceType): Position[] {
    switch (type) {
      case "King":
        return PieceDirections.King;
      case "Queen":
        return PieceDirections.Queen;
      case "Bishop":
        return PieceDirections.Bishop;
      case "Rook":
        return PieceDirections.Rook;
      case "Knight":
        return PieceDirections.Knight;
      case "Pawn":
        return PieceDirections.Pawn;
      default:
        throw new Error("Invalid piece type");
    }
  }
}

export default PieceDirections;
