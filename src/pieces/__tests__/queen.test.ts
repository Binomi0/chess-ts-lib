import TurnManager from "../../board/turnManager";
import ChessBoard from "../../chessBoard";
import GameManager from "../../gameManager";
import { PieceColor, Position } from "../../types";
import { whitePawn } from "../constants";
import { Queen } from "../queen";

describe("Queen", () => {
  let chessBoard: ChessBoard;
  let queen: Queen;
  beforeEach(() => {
    const turnManager = new TurnManager();
    const gameManager = new GameManager(turnManager);
    chessBoard = new ChessBoard(gameManager);
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
