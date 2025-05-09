import TurnManager from "../../board/turnManager";
import ChessBoard, { Position } from "../../chessBoard";
import GameManager from "../../gameManager";
import { PieceColor } from "../../piece";
import { whitePawn } from "../constants";
import { Queen } from "../queen";

describe("Queen", () => {
  let chessBoard: ChessBoard;
  let queen: Queen;
  beforeEach(() => {
    const gameManager = new GameManager();
    const turnManager = new TurnManager();
    chessBoard = new ChessBoard(gameManager, turnManager);
    queen = new Queen(PieceColor.White);
    chessBoard.stateManager.setEmptyBoard();
  });

  it("should be able to move in all directions", () => {
    const from: Position = [0, 0];
    const moves = queen.getAllAvailableMoves(chessBoard.stateManager, from);
    expect(moves.length).toBe(21);
  });

  it("should not be able to jump over other pieces", () => {
    const from: Position = [0, 0];
    chessBoard.stateManager.placePiece([0, 0], queen);
    chessBoard.stateManager.placePiece([1, 1], whitePawn);
    const moves = queen.getAllAvailableMoves(chessBoard.stateManager, from);
    expect(moves.length).toBe(14);
  });

  it("should not be able to move diagonally if there is a piece in the way", () => {
    const from: Position = [0, 0];
    chessBoard.stateManager.placePiece([0, 0], queen);
    chessBoard.stateManager.placePiece([1, 1], whitePawn);
    const moves = queen.getAllAvailableMoves(chessBoard.stateManager, from);
    expect(moves.length).toBe(14);
  });

  it("should not be able to move horizontally or vertically if there is a piece in the way", () => {
    const from: Position = [0, 0];
    chessBoard.stateManager.placePiece([0, 0], queen);
    chessBoard.stateManager.placePiece([1, 0], whitePawn);
    chessBoard.stateManager.placePiece([0, 1], whitePawn);
    const moves = queen.getAllAvailableMoves(chessBoard.stateManager, from);
    expect(moves.length).toBe(7);
  });
});
