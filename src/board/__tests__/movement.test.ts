import {
  blackPawn,
  whiteKing,
  whitePawn,
  whiteRook,
} from "../../model/constants";
import { Castling, PieceColor, PieceType } from "../../types";
import MovementManager from "../movementManager";
import StateManager from "../stateManager";
import TurnManager from "../turnManager";

describe("MovementManager", () => {
  let stateManager: StateManager;
  let movementManager: MovementManager;
  let turnManager: TurnManager;

  beforeEach(() => {
    stateManager = new StateManager(); // Assuming StateManager is defined elsewhere
    turnManager = new TurnManager(); // Assuming TurnManager is defined elsewhere
    movementManager = new MovementManager(stateManager, turnManager);
  });

  it("should be defined", () => {
    expect(MovementManager).toBeDefined();
  });

  it("should create a new MovementManager instance", () => {
    expect(movementManager).toBeInstanceOf(MovementManager);
  });

  describe("getAllAvailableMoves", () => {
    it("should return all available moves for the current piece", () => {
      // Assuming there's a piece at [0, 0] that can move to [1, 0]
      stateManager.setEmptyBoard();
      stateManager.placePiece([4, 0], whitePawn);
      const availableMoves = movementManager.getAvailableMoves([4, 0]);
      expect(availableMoves.length).toBe(2);
    });
  });

  describe("validateMove", () => {
    it("should validate a move based on the current state of the board", () => {
      // Assuming there's a piece at [0, 0] that can move to [1, 0]
      stateManager.setEmptyBoard();
      stateManager.placePiece([4, 0], whitePawn);
      expect(movementManager.validateMove([4, 0], [3, 0])).toBe(true);
    });

    it("should throw if not piece is found", () => {
      stateManager.setEmptyBoard();
      try {
        movementManager.validateMove([0, 0], [0, 1]);
        expect(false).toBe(true);
      } catch (error) {
        expect((error as Error).message).toBe("Missing piece at from location");
      }
    });

    it("should return false if its not the right turn", () => {
      stateManager.setEmptyBoard();
      stateManager.placePiece([4, 0], blackPawn);
      const isValid = movementManager.validateMove([4, 0], [3, 0]);
      expect(isValid).toBe(false);
    });
  });

  describe("isPromotion", () => {
    it("should determine if a move is a promotion", () => {
      // Assuming there's a piece at [7, 0] that can promote to a queen
      stateManager.setEmptyBoard();
      stateManager.placePiece([0, 0], whitePawn);
      expect(
        movementManager.isPromotion([0, 0], PieceType.Pawn, PieceColor.White),
      ).toBe(true);
    });

    it("should return false if piece is not a pawn", () => {
      stateManager.setEmptyBoard();
      stateManager.placePiece([0, 0], whitePawn);
      expect(
        movementManager.isPromotion([0, 0], PieceType.Knight, PieceColor.White),
      ).toBe(false);
    });
  });

  describe("isCastlingMove", () => {
    it("should determine if a move is a castling move", () => {
      stateManager.setEmptyBoard();
      stateManager.placePiece([7, 4], whiteKing);
      stateManager.placePiece([7, 0], whiteRook);
      const castlingMove = movementManager.isCastlingMove([7, 4], [7, 0]);
      expect(castlingMove).toHaveLength(2);
      expect(castlingMove).toEqual([PieceColor.White, Castling.Queen]);
    });

    it("should determine if a move is not a castling move", () => {
      stateManager.setEmptyBoard();
      stateManager.placePiece([7, 4], whiteKing);
      stateManager.placePiece([7, 0], whiteRook);
      expect(movementManager.isCastlingMove([7, 4], [7, 1])).toBe(undefined);
    });
  });
});
