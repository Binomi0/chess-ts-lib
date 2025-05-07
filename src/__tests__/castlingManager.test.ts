import CastlingManager from "../castlingManager";
import ChessBoard, { Castling } from "../chessBoard";
import { PieceColor } from "../piece";
import { King } from "../pieces/king";
import { Rook } from "../pieces/rook";
import { createFreshBoard } from "../utils/helpers";

describe("Castling Manager", () => {
  describe("White King", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      chessBoard = new ChessBoard();
    });

    it("should not be able to castle at start for white king side", () => {
      try {
        CastlingManager.castle(
          chessBoard.board,
          PieceColor.White,
          Castling.King,
        );
      } catch (error) {
        expect((error as Error).message).toBe("Invalid castling move");
      }
    });

    it("should not be able to castle at start for white queen side", () => {
      try {
        CastlingManager.castle(
          chessBoard.board,
          PieceColor.White,
          Castling.Queen,
        );
      } catch (error) {
        expect((error as Error).message).toBe("Invalid castling move");
      }
    });

    it("should castle correctly for queen side", () => {
      chessBoard.board = createFreshBoard();
      chessBoard.board[7][4] = new King(PieceColor.White);
      chessBoard.board[7][0] = new Rook(PieceColor.White);

      if (
        CastlingManager.castle(
          chessBoard.board,
          PieceColor.White,
          Castling.Queen,
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
          PieceColor.White,
          Castling.King,
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
      try {
        CastlingManager.castle(
          chessBoard.board,
          PieceColor.Black,
          Castling.King,
        );
      } catch (error) {
        expect((error as Error).message).toBe("Invalid castling move");
      }
    });

    it("should not be able to castle at start for White queen side", () => {
      try {
        CastlingManager.castle(
          chessBoard.board,
          PieceColor.Black,
          Castling.Queen,
        );
      } catch (error) {
        expect((error as Error).message).toBe("Invalid castling move");
      }
    });

    it("should castle correctly for queen side", () => {
      chessBoard.board = createFreshBoard();
      chessBoard.board[0][4] = new King(PieceColor.Black);
      chessBoard.board[0][0] = new Rook(PieceColor.Black);

      if (
        CastlingManager.castle(
          chessBoard.board,
          PieceColor.Black,
          Castling.Queen,
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
          PieceColor.Black,
          Castling.King,
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
