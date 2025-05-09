import { PieceType } from "../../types";
import PieceDirections from "../directions";

describe("PieceDirections", () => {
  it("getPieceDirections should return the correct directions for each piece type", () => {
    expect(PieceDirections.getPieceDirections(PieceType.King)).toEqual([
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]);
    expect(PieceDirections.getPieceDirections(PieceType.Queen)).toEqual([
      [-1, 0], // ↑
      [1, 0], // ↓
      [0, -1], // ←
      [0, 1], // →
      [-1, -1], // ↖️
      [-1, 1], // ↗️
      [1, -1], // ↙️
      [1, 1],
    ]);
    expect(PieceDirections.getPieceDirections(PieceType.Bishop)).toEqual([
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
    ]);
    expect(PieceDirections.getPieceDirections(PieceType.Rook)).toEqual([
      [-1, 0], // ↑
      [1, 0], // ↓
      [0, -1], // ←
      [0, 1], // →
    ]);
    expect(PieceDirections.getPieceDirections(PieceType.Knight)).toEqual([
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ]);
    expect(PieceDirections.getPieceDirections(PieceType.Pawn)).toEqual([
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ]);
  });

  it("should throw an error for invalid piece type", () => {
    // @ts-expect-error test
    expect(() => PieceDirections.getPieceDirections("Invalid")).toThrowError(
      "Invalid piece type",
    );
  });
});
