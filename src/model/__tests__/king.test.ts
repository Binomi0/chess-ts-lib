import ChessBoard from "../../board/chessBoard";
import MovementManager from "../../board/movementManager";
import StateManager from "../../board/stateManager";
import TurnManager from "../../board/turnManager";
import GameManager from "../../gameManager";
import { blackRook, whiteKing } from "../constants";

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
  });
});
