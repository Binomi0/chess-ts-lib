import { Position } from "./chessBoard";

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

  static readonly WhitePawn: Position[] = [
    [-1, 0],
    [-1, -1],
    [-1, 1],
  ];

  static readonly BlackPawn: Position[] = [
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  static getPieceDirections(type: string): Position[] {
    switch (type) {
      case "king":
        return PieceDirections.King;
      case "queen":
        return PieceDirections.Queen;
      case "bishop":
        return PieceDirections.Bishop;
      case "rook":
        return PieceDirections.Rook;
      case "knight":
        return PieceDirections.Knight;
      case "whitePawn":
        return PieceDirections.WhitePawn;
      case "blackPawn":
        return PieceDirections.BlackPawn;
      default:
        throw new Error("Invalid piece type");
    }
  }
}

export default PieceDirections;
