import CastlingManager from "./castlingManager";
import ChessBoard from "./chessBoard";
import { PieceColor } from "./piece";
import { King } from "./pieces/king";
import { Rook } from "./pieces/rook";
import { createFreshBoard } from "./utils/helpers";

describe("Castling Manager", () => {
  describe("White King", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      chessBoard = new ChessBoard();
    });

    it("should not be able to castle at start for white king side", () => {
      expect(
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.White),
          "king"
        )
      ).toBe(false);
    });

    it("should not be able to castle at start for white queen side", () => {
      expect(
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.White),
          "queen"
        )
      ).toBe(false);
    });

    it("should castle correctly for queen side", () => {
      chessBoard.board = createFreshBoard();
      chessBoard.board[7][4] = new King(PieceColor.White);
      chessBoard.board[7][0] = new Rook(PieceColor.White);

      if (
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.White),
          "queen"
        )
      ) {
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
      chessBoard.board[7][4] = new King(PieceColor.White);
      chessBoard.board[7][7] = new Rook(PieceColor.White);

      if (
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.White),
          "king"
        )
      ) {
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
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.Black),
          "king"
        )
      ).toBe(false);
    });

    it("should not be able to castle at start for White queen side", () => {
      expect(
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.Black),
          "queen"
        )
      ).toBe(false);
    });

    it("should castle correctly for queen side", () => {
      chessBoard.board = createFreshBoard();
      chessBoard.board[0][4] = new King(PieceColor.Black);
      chessBoard.board[0][0] = new Rook(PieceColor.Black);

      if (
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.Black),
          "queen"
        )
      ) {
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
      chessBoard.board[0][4] = new King(PieceColor.Black);
      chessBoard.board[0][7] = new Rook(PieceColor.Black);

      if (
        CastlingManager.castle(
          chessBoard.board,
          new King(PieceColor.Black),
          "king"
        )
      ) {
        expect(chessBoard.board[0][6]).toHaveProperty("type", "King");
        expect(chessBoard.board[0][5]).toHaveProperty("type", "Rook");
      } else {
        expect(false).toBe(true);
      }
    });
  });
});
