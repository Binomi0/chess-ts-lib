import StateManager from "../../board/stateManager";
import { PieceColor, PieceType } from "../../types";
import { Pawn } from "../pawn";
import Piece from "../piece";

describe("Pawn", () => {
  it("Should be an instance of a Piece", () => {
    const pawn = new Pawn(PieceColor.White);
    expect(pawn).toBeInstanceOf(Piece);
  });

  it("should hace a color", () => {
    const pawn = new Pawn(PieceColor.White);
    expect(pawn.color).toEqual(PieceColor.White);
  });

  it("should have a type of Pawn", () => {
    const pawn = new Pawn(PieceColor.White);
    expect(pawn.type).toEqual(PieceType.Pawn);
  });

  it("White Pawn should have the right directions to move", () => {
    const pawn = new Pawn(PieceColor.White);
    expect(pawn.directions).toEqual([
      [-1, 0],
      [-1, -1],
      [-1, 1],
    ]);
  });

  it("Black Pawn should have the right directions to move", () => {
    const pawn = new Pawn(PieceColor.Black);
    expect(pawn.directions).toEqual([
      [1, 0],
      [1, 1],
      [1, -1],
    ]);
  });

  describe("getAllAvailableMoves", () => {
    it("should return possible moves for a black pawn on the first row", () => {
      const pawn = new Pawn(PieceColor.Black);
      const boardStateManager = new StateManager();
      boardStateManager.initializeBoard();
      boardStateManager.placePiece([1, 0], pawn);
      const moves = pawn.getAllAvailableMoves(boardStateManager, [1, 0]);

      expect(moves).toEqual([
        [2, 0],
        [2, 1],
        [3, 0],
      ]);
    });

    it("should return possible moves for a white pawn on the first row", () => {
      const pawn = new Pawn(PieceColor.White);
      const boardStateManager = new StateManager();
      boardStateManager.initializeBoard();
      boardStateManager.placePiece([6, 0], pawn);
      const moves = pawn.getAllAvailableMoves(boardStateManager, [6, 0]);
      expect(moves).toEqual([
        [5, 0],
        [5, 1],
        [4, 0],
      ]);
    });
  });
  describe("validateMove", () => {
    it("should return true for a valid move", () => {
      const pawn = new Pawn(PieceColor.White);
      const boardStateManager = new StateManager();
      boardStateManager.setEmptyBoard();
      boardStateManager.placePiece([6, 0], pawn);
      const isValidMove = pawn.validateMove(boardStateManager, {
        from: [6, 0],
        to: [5, 0],
        piece: pawn,
      });
      expect(isValidMove).toBe(true);
    });

    it("should return false for an invalid move", () => {
      const pawn = new Pawn(PieceColor.White);
      const boardStateManager = new StateManager();
      boardStateManager.setEmptyBoard();
      boardStateManager.placePiece([6, 0], pawn);

      try {
        pawn.validateMove(boardStateManager, {
          from: [6, 0],
          to: [5, 1],
          piece: pawn,
        });
        expect(false).toBe(true);
      } catch (error) {
        expect((error as Error).message).toBe("Invalid movement for pawn");
      }
    });

    it("should return true if initial move is two spaces forward", () => {
      const pawn = new Pawn(PieceColor.White);
      const boardStateManager = new StateManager();
      boardStateManager.setEmptyBoard();
      boardStateManager.placePiece([6, 0], pawn);
      const isValidMove = pawn.validateMove(boardStateManager, {
        from: [6, 0],
        to: [4, 0],
        piece: pawn,
      });
      expect(isValidMove).toBe(true);
    });

    it("should return true if capturing as first move", () => {
      const pawn = new Pawn(PieceColor.White);
      const boardStateManager = new StateManager();
      boardStateManager.setEmptyBoard();
      boardStateManager.placePiece([6, 0], pawn);
      boardStateManager.placePiece([5, 1], new Pawn(PieceColor.Black));
      const isValidMove = pawn.validateMove(boardStateManager, {
        from: [6, 0],
        to: [5, 1],
        piece: pawn,
      });
      expect(isValidMove).toBe(true);
    });
  });
});
