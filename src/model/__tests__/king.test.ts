import ChessBoard from "../../board/chessBoard";
import MovementManager from "../../board/movementManager";
import StateManager from "../../board/stateManager";
import TurnManager from "../../board/turnManager";
import GameManager from "../../gameManager";
import { blackPawn, blackQueen, blackRook, whiteKing } from "../constants";

describe("King", () => {
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

    it("should allow to move one square around when free", () => {
      chessBoard.stateManager.placePiece([3, 3], whiteKing);
      chessBoard.stateManager.placePiece([0, 0], blackRook);

      const validMoves = whiteKing.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteKing.directions,
      );
      expect(validMoves).toHaveLength(8);
    });

    it("should allow to move limited when current move is check", () => {
      chessBoard.stateManager.placePiece([3, 3], whiteKing);
      chessBoard.stateManager.placePiece([0, 3], blackRook);
      const validMoves = whiteKing.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteKing.directions,
      );

      console.log(chessBoard.getBoard());
      expect(validMoves).toHaveLength(6);
    });

    it("should allow to move limited when next move is under check", () => {
      chessBoard.stateManager.placePiece([0, 0], whiteKing);
      chessBoard.stateManager.placePiece([1, 7], blackRook);
      const validMoves = whiteKing.getAllAvailableMoves(
        chessBoard.stateManager,
        [0, 0],
        whiteKing.directions,
      );

      expect(validMoves).toHaveLength(1);
    });

    it("should allow to move limited when next move is under check", () => {
      chessBoard.stateManager.placePiece([3, 3], whiteKing);
      chessBoard.stateManager.placePiece([0, 2], blackRook);
      const validMoves = whiteKing.getAllAvailableMoves(
        chessBoard.stateManager,
        [3, 3],
        whiteKing.directions,
      );

      expect(validMoves).toHaveLength(5);
    });

    it("should not be allowed to capture if results in check", () => {
      chessBoard.stateManager.placePiece([7, 0], whiteKing);
      chessBoard.stateManager.placePiece([5, 0], blackPawn);
      chessBoard.stateManager.placePiece([6, 1], blackQueen);

      const validMoves = whiteKing.getAllAvailableMoves(
        chessBoard.stateManager,
        [7, 0],
        whiteKing.directions,
      );

      expect(validMoves).toHaveLength(0);
    });
  });
});
