import TurnManager from "../board/turnManager";
import CastlingManager from "../castlingManager";
import ChessBoard, { Castling } from "../chessBoard";
import GameManager from "../gameManager";
import { PieceColor } from "../piece";
import {
  blackKing,
  blackRook,
  whiteKing,
  whiteRook,
} from "../pieces/constants";

describe("Castling Manager", () => {
  describe("White King", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      chessBoard = new ChessBoard(gameManager);
    });

    it("should not be able to castle at start for white king side", () => {
      try {
        CastlingManager.castle(
          chessBoard.stateManager,
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
          chessBoard.stateManager,
          PieceColor.White,
          Castling.Queen,
        );
      } catch (error) {
        expect((error as Error).message).toBe("Invalid castling move");
      }
    });

    it("should castle correctly for queen side", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([7, 4], whiteKing);
      chessBoard.stateManager.placePiece([7, 0], whiteRook);

      if (
        CastlingManager.castle(
          chessBoard.stateManager,
          PieceColor.White,
          Castling.Queen,
        )
      ) {
        expect(chessBoard.stateManager.getCell([7, 2])).toHaveProperty(
          "type",
          "King",
        );
        expect(chessBoard.stateManager.getCell([7, 3])).toHaveProperty(
          "type",
          "Rook",
        );
      } else {
        expect(false).toBe(true);
      }
    });

    it("should castle correctly for king side", () => {
      CastlingManager.castlingRights.white = true;
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([7, 4], whiteKing);
      chessBoard.stateManager.placePiece([7, 7], whiteRook);

      if (
        CastlingManager.castle(
          chessBoard.stateManager,
          PieceColor.White,
          Castling.King,
        )
      ) {
        expect(chessBoard.stateManager.getCell([7, 6])).toHaveProperty(
          "type",
          "King",
        );
        expect(chessBoard.stateManager.getCell([7, 5])).toHaveProperty(
          "type",
          "Rook",
        );
      } else {
        expect(false).toBe(true);
      }
    });
  });

  describe("Black King", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      chessBoard = new ChessBoard(gameManager);
    });

    it("should not be able to castle at start for white king side", () => {
      try {
        CastlingManager.castle(
          chessBoard.stateManager,
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
          chessBoard.stateManager,
          PieceColor.Black,
          Castling.Queen,
        );
      } catch (error) {
        expect((error as Error).message).toBe("Invalid castling move");
      }
    });

    it("should castle correctly for queen side", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([0, 4], blackKing);
      chessBoard.stateManager.placePiece([0, 0], blackRook);

      if (
        CastlingManager.castle(
          chessBoard.stateManager,
          PieceColor.Black,
          Castling.Queen,
        )
      ) {
        expect(chessBoard.stateManager.getCell([0, 2])).toHaveProperty(
          "type",
          "King",
        );
        expect(chessBoard.stateManager.getCell([0, 3])).toHaveProperty(
          "type",
          "Rook",
        );
      } else {
        expect(false).toBe(true);
      }
    });

    it("should castle correctly for king side", () => {
      CastlingManager.castlingRights.black = true;
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([0, 4], blackKing);
      chessBoard.stateManager.placePiece([0, 7], blackRook);

      const canCastle = CastlingManager.castle(
        chessBoard.stateManager,
        PieceColor.Black,
        Castling.King,
      );

      if (canCastle) {
        const piece1 = chessBoard.stateManager.getCell([0, 6]);
        const piece2 = chessBoard.stateManager.getCell([0, 5]);

        expect(piece1).toHaveProperty("type", "King");
        expect(piece2).toHaveProperty("type", "Rook");
      } else {
        expect(false).toBe(true);
      }
    });
  });
});
