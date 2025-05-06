import CastlingManager from "./castlingManager";
import ChessBoard, { BoardCell } from "./chessBoard";
import { BlackKing, WhiteKing } from "./pieces/king";
import { BlackRook, WhiteRook } from "./pieces/rook";
import { createFreshBoard } from "./utils/helpers";

describe("Castling Manager", () => {
  describe("White King", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      chessBoard = new ChessBoard();
    });

    it("should not be able to castle at start for white king side", () => {
      expect(
        CastlingManager.castle(chessBoard.board, new WhiteKing(), "king")
      ).toBe(false);
    });

    it("should not be able to castle at start for white queen side", () => {
      expect(
        CastlingManager.castle(chessBoard.board, new WhiteKing(), "queen")
      ).toBe(false);
    });

    it("should castle correctly for queen side", () => {
      chessBoard.board = createFreshBoard();
      chessBoard.board[7][4] = new WhiteKing();
      chessBoard.board[7][0] = new WhiteRook();

      if (CastlingManager.castle(chessBoard.board, new WhiteKing(), "queen")) {
        expect(chessBoard.board[7][2]).toHaveProperty("type", "King");
        expect(chessBoard.board[7][3]).toHaveProperty("type", "Rook");
      } else {
        expect(false).toBe(true);
      }
    });

    it("should castle correctly for king side", () => {
      // @ts-expect-error test
      CastlingManager.castlingRights.white = true;
      chessBoard.board = createFreshBoard();
      chessBoard.board[7][4] = new WhiteKing();
      chessBoard.board[7][7] = new WhiteRook();

      if (CastlingManager.castle(chessBoard.board, new WhiteKing(), "king")) {
        expect(chessBoard.board[7][6]).toHaveProperty("type", "King");
        expect(chessBoard.board[7][5]).toHaveProperty("type", "Rook");
      } else {
        expect(false).toBe(true);
      }
    });
  });

  describe("Black King", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      chessBoard = new ChessBoard();
    });

    it("should not be able to castle at start for white king side", () => {
      expect(
        CastlingManager.castle(chessBoard.board, new BlackKing(), "king")
      ).toBe(false);
    });

    it("should not be able to castle at start for White queen side", () => {
      expect(
        CastlingManager.castle(chessBoard.board, new BlackKing(), "queen")
      ).toBe(false);
    });

    it("should castle correctly for queen side", () => {
      chessBoard.board = createFreshBoard();
      chessBoard.board[0][4] = new BlackKing();
      chessBoard.board[0][0] = new BlackRook();

      if (CastlingManager.castle(chessBoard.board, new BlackKing(), "queen")) {
        expect(chessBoard.board[0][2]).toHaveProperty("type", "King");
        expect(chessBoard.board[0][3]).toHaveProperty("type", "Rook");
      } else {
        expect(false).toBe(true);
      }
    });

    it("should castle correctly for king side", () => {
      // @ts-expect-error test
      CastlingManager.castlingRights.black = true;
      chessBoard.board = createFreshBoard();
      chessBoard.board[0][4] = new BlackKing();
      chessBoard.board[0][7] = new BlackRook();

      if (CastlingManager.castle(chessBoard.board, new BlackKing(), "king")) {
        expect(chessBoard.board[0][6]).toHaveProperty("type", "King");
        expect(chessBoard.board[0][5]).toHaveProperty("type", "Rook");
      } else {
        expect(false).toBe(true);
      }
    });
  });
});
