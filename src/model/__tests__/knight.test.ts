import ChessBoard from "../../board/chessBoard";
import MovementManager from "../../board/movementManager";
import StateManager from "../../board/stateManager";
import TurnManager from "../../board/turnManager";
import GameManager from "../../gameManager";
import { whiteKnight } from "../constants";

describe("Knight", () => {
  describe("getAllAvailableMoves", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turn = new TurnManager();
      const manager = new GameManager(turn);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turn);
      chessBoard = new ChessBoard(manager, stateManager, moveManager);
      chessBoard.stateManager.setEmptyBoard();
    });

    it("should allow to move around when free", () => {
      chessBoard.stateManager.placePiece([3, 3], whiteKnight);

      const validMoves = whiteKnight.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteKnight.directions,
      );
      expect(validMoves).toHaveLength(8);
    });

    it("should allow to move limited when blocked", () => {
      chessBoard.stateManager.placePiece([3, 3], whiteKnight);
      chessBoard.stateManager.placePiece([2, 1], whiteKnight);

      const validMoves = whiteKnight.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteKnight.directions,
      );
      expect(validMoves).toHaveLength(7);
    });
  });

  describe("validateMove", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turn = new TurnManager();
      const manager = new GameManager(turn);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turn);
      chessBoard = new ChessBoard(manager, stateManager, moveManager);
      chessBoard.stateManager.setEmptyBoard();
    });

    it("should return true for a valid move", () => {
      chessBoard.stateManager.placePiece([0, 0], whiteKnight);

      const isValidMove = whiteKnight.validateMove(chessBoard.stateManager, {
        from: [0, 0],
        to: [1, 2],
        piece: whiteKnight,
      });
      expect(isValidMove).toBe(true);
    });

    it("should return false for an invalid move", () => {
      chessBoard.stateManager.placePiece([0, 0], whiteKnight);

      try {
        const isValidMove = whiteKnight.validateMove(chessBoard.stateManager, {
          from: [0, 0],
          to: [1, 0],
          piece: whiteKnight,
        });
        expect(isValidMove).toBe(false);
      } catch (error) {
        expect((error as Error).message).toBe(
          `Invalid move for Knight from 0,0 to 1,0`,
        );
      }
    });
  });
});
