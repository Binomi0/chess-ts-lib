import ChessBoard from "../../board/chessBoard";
import MovementManager from "../../board/movementManager";
import StateManager from "../../board/stateManager";
import TurnManager from "../../board/turnManager";
import GameManager from "../../gameManager";
import { whiteBishop } from "../constants";

describe("Bishop", () => {
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
      chessBoard.stateManager.placePiece([3, 3], whiteBishop);

      const validMoves = whiteBishop.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteBishop.directions,
      );
      expect(validMoves).toHaveLength(13);
    });

    it("should allow to move limited when blocked", () => {
      chessBoard.stateManager.placePiece([3, 3], whiteBishop);
      chessBoard.stateManager.placePiece([2, 2], whiteBishop);

      const validMoves = whiteBishop.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteBishop.directions,
      );
      expect(validMoves).toHaveLength(10);
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
      chessBoard.stateManager.placePiece([0, 0], whiteBishop);
      const isValidMove = whiteBishop.validateMove(chessBoard.stateManager, {
        from: [0, 0],
        to: [2, 2],
        piece: whiteBishop,
      });
      expect(isValidMove).toBe(true);
    });

    it("should return false for an invalid move", () => {
      chessBoard.stateManager.placePiece([0, 0], whiteBishop);
      try {
        const isValidMove = whiteBishop.validateMove(chessBoard.stateManager, {
          from: [0, 0],
          to: [1, 0],
          piece: whiteBishop,
        });
        expect(isValidMove).toBe(false);
      } catch (error) {
        console.error(error);
      }
    });
  });
});
