import { BoardCell, Position } from "../../chessBoard";
import { PieceColor, PieceType } from "../../piece";
import { createFreshBoard } from "../../utils/helpers";
import PieceFactory from "../factory";
import { Queen } from "../queen";

describe("Queen", () => {
  let chessBoard: BoardCell[][];
  let queen: Queen;
  beforeEach(() => {
    chessBoard = createFreshBoard();
    queen = new Queen(PieceColor.White);
  });

  it("should be able to move in all directions", () => {
    const from: Position = [0, 0];
    const moves = queen.getAllAvailableMoves(chessBoard, from);
    expect(moves.length).toBe(21);
  });

  it("should not be able to jump over other pieces", () => {
    const from: Position = [0, 0];
    chessBoard[0][0] = queen;
    chessBoard[1][1] = PieceFactory.getPiece(PieceType.Pawn, PieceColor.White);
    const moves = queen.getAllAvailableMoves(chessBoard, from);
    expect(moves.length).toBe(14);
  });

  it("should not be able to move diagonally if there is a piece in the way", () => {
    const from: Position = [0, 0];
    chessBoard[0][0] = queen;
    chessBoard[1][1] = PieceFactory.getPiece(PieceType.Pawn, PieceColor.White);
    const moves = queen.getAllAvailableMoves(chessBoard, from);
    expect(moves.length).toBe(14);
  });

  it("should not be able to move horizontally or vertically if there is a piece in the way", () => {
    const from: Position = [0, 0];
    chessBoard[0][0] = queen;
    chessBoard[1][0] = PieceFactory.getPiece(PieceType.Pawn, PieceColor.White);
    chessBoard[0][1] = PieceFactory.getPiece(PieceType.Pawn, PieceColor.White);
    const moves = queen.getAllAvailableMoves(chessBoard, from);
    expect(moves.length).toBe(7);
  });
});
