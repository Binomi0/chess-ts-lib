import type Piece from "../model/piece";
import { Movement, PieceColor, Position } from "../types";
import * as Helpers from "./helpers";

describe("Helper functions", () => {
  describe("isInBounds", () => {
    it("should return true for valid positions", () => {
      expect(Helpers.isInBounds([0, 0])).toBe(true);
      expect(Helpers.isInBounds([7, 7])).toBe(true);
      expect(Helpers.isInBounds([3, 4])).toBe(true);
    });
    it("should return false for invalid positions", () => {
      expect(Helpers.isInBounds([-1, 0])).toBe(false);
      expect(Helpers.isInBounds([8, 0])).toBe(false);
      expect(Helpers.isInBounds([0, -1])).toBe(false);
      expect(Helpers.isInBounds([0, 8])).toBe(false);
    });
  });

  describe("isCellEmpty", () => {
    it("should return true if cell is empty", () => {
      expect(Helpers.isCellEmpty(undefined)).toBe(true);
    });
    it("should return false if cell is not empty", () => {
      expect(Helpers.isCellEmpty({} as Piece)).toBe(false);
    });
  });

  describe("isCellBlocked", () => {
    it("should return true if target and movement have the same color", () => {
      const target = { color: "white" } as Piece;
      const movement = { piece: { color: "white" } } as Movement;
      expect(Helpers.isCellBlocked(target, movement)).toBe(true);
    });
    it("should return false if target and movement have different colors", () => {
      const target = { color: "white" } as Piece;
      const movement = { piece: { color: "black" } } as Movement;
      expect(Helpers.isCellBlocked(target, movement)).toBe(false);
    });
  });

  describe("isCellCaptured", () => {
    it("should return true if target and color have different colors", () => {
      const target = { color: "white" } as Piece;
      const color = PieceColor.Black;
      expect(Helpers.isCellCaptured(target, color)).toBe(true);
    });
    it("should return false if target and color have the same colors", () => {
      const target = { color: "white" } as Piece;
      const color = PieceColor.White;
      expect(Helpers.isCellCaptured(target, color)).toBe(false);
    });
  });

  describe("isValidDestination", () => {
    it("should return true if moves contains the target position", () => {
      const moves: Position[] = [[1, 2]];
      const target: Position = [1, 2];
      expect(Helpers.isValidDestination(moves, target)).toBe(true);
    });
    it("should return false if moves does not contain the target position", () => {
      const moves: Position[] = [[1, 2]];
      const target: Position = [2, 3];
      expect(Helpers.isValidDestination(moves, target)).toBe(false);
    });
    it("should throw an error if moves is undefined", () => {
      const target: Position = [1, 2];
      expect(() =>
        // @ts-expect-error test
        Helpers.isValidDestination(undefined, target),
      ).toThrow();
    });
    it("should throw an error if target is undefined", () => {
      const moves: Position[] = [[1, 2]];
      // @ts-expect-error test
      expect(() => Helpers.isValidDestination(moves, undefined)).toThrow();
    });
  });

  describe("createFreshBoard", () => {
    it("should return an 8x8 board with all cells initialized to undefined", () => {
      const board = Helpers.createFreshBoard();
      expect(board.length).toBe(8);
      for (let i = 0; i < 8; i++) {
        expect(board[i].length).toBe(8);
        expect(board[i]).toEqual(Array(8).fill(undefined));
      }
    });
  });

  describe("cloneBoard", () => {
    it("should return a deep copy of the board with all cells initialized to undefined", () => {
      const originalBoard = [
        [undefined, undefined],
        [undefined, undefined],
        [undefined, undefined],
        [undefined, undefined],
      ];
      const clonedBoard = Helpers.cloneBoard(originalBoard);
      expect(clonedBoard.length).toBe(4);
      for (let i = 0; i < 4; i++) {
        expect(clonedBoard[i].length).toBe(2);
        expect(clonedBoard[i]).toEqual(originalBoard[i]);
      }
    });
  });
});
