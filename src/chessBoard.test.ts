import ChessBoard from "./chessBoard";
import Pawn from "./pieces/pawn";

describe("Chess Board", () => {
  describe("handleMove", () => {
    describe("White Pawn Movement", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });
      it("should move 1 position from start", () => {
        chessBoard.handleMove([1, 0], [2, 0]);
        expect(chessBoard.getPosition([2, 0])).toBeInstanceOf(Pawn);
      });

      it("should move 2 positions from start", () => {
        chessBoard.handleMove([1, 0], [3, 0]);
        expect(chessBoard.getPosition([3, 0])).toBeInstanceOf(Pawn);
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.handleMove([1, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move diagonally from start", () => {
        try {
          chessBoard.handleMove([1, 0], [2, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move out of chessboard", () => {
        try {
          chessBoard.handleMove([1, 0], [1, -1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([1, 0], [0, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([1, 0], [1, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });
    });

    describe("Black Pawn Movement", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });
      it("should move 1 position from start", () => {
        chessBoard.handleMove([6, 0], [5, 0]);
        expect(chessBoard.getPosition([5, 0])).toBeInstanceOf(Pawn);
      });

      it("should move 2 positions from start", () => {
        chessBoard.handleMove([6, 0], [4, 0]);
        expect(chessBoard.getPosition([4, 0])).toBeInstanceOf(Pawn);
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.handleMove([6, 0], [3, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move diagonally from start", () => {
        try {
          chessBoard.handleMove([6, 0], [5, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move out of chessboard", () => {
        try {
          chessBoard.handleMove([6, 0], [6, -1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([6, 0], [7, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([6, 0], [6, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });
    });
  });
});
