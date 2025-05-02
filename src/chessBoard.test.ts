import ChessBoard from "./chessBoard";
import { Pawn, BlackPawn, WhitePawn } from "./pieces/pawn";
import { BlackRook } from "./pieces/rook";

describe("Chess Board", () => {
  it("should be able to create an instance", () => {
    const chessBoard = new ChessBoard();
    expect(chessBoard).toBeDefined();
  });

  describe("handleMove", () => {
    it("should be defined", () => {
      const chessBoard = new ChessBoard();
      expect(chessBoard.handleMove).toBeDefined();
    });

    describe("White Pawn", () => {
      let chessBoard: ChessBoard;

      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be able to create a white pawn", () => {
        const whitePawn = new WhitePawn();
        expect(whitePawn).toBeDefined();
        expect(whitePawn.color).toBe("white");
        expect(whitePawn.type).toBe("Pawn");
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

      it("should not be able to move diagonally from start if not enemy", () => {
        try {
          chessBoard.handleMove([1, 0], [2, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should be able to move diagonally from start if enemy", () => {
        chessBoard.handleMove([1, 5], [2, 5]);
        chessBoard.handleMove([6, 1], [4, 1]);

        chessBoard.handleMove([2, 5], [3, 5]);
        chessBoard.handleMove([4, 1], [3, 1]);

        chessBoard.handleMove([3, 5], [4, 5]);
        chessBoard.handleMove([3, 1], [2, 1]);
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

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.handleMove([1, 0], [0, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([1, 0], [3, 0]);
          chessBoard.handleMove([6, 0], [5, 0]);
          chessBoard.handleMove([3, 0], [2, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([2, 0])).toBeUndefined();
          expect(chessBoard.getPosition([3, 0])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([3, 0])?.color).toBe("white");
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([1, 0], [1, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move if it's blocked", () => {
        chessBoard.handleMove([1, 0], [3, 0]);
        chessBoard.handleMove([6, 0], [4, 0]);

        try {
          chessBoard.handleMove([3, 0], [4, 0]);
        } catch (error) {
          expect(chessBoard.getPosition([3, 0])).toHaveProperty(
            "color",
            "white"
          );
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.handleMove([1, 0], [3, 0]);
        chessBoard.handleMove([6, 0], [4, 0]);

        try {
          chessBoard.handleMove([3, 0], [4, 0]);
        } catch (error) {
          expect(chessBoard.getPosition([4, 0])?.color).toBe("black");
          expect(chessBoard.getPosition([3, 0])?.color).toBe("white");
          expect((error as Error).message).toBe("Invalid move");
        }
      });
    });

    describe("Black Pawn", () => {
      let chessBoard: ChessBoard;

      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be able to create a black pawn", () => {
        const blackPawn = new BlackPawn();
        expect(blackPawn).toBeDefined();
        expect(blackPawn.type).toBe("Pawn");
        expect(blackPawn.color).toBe("black");
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

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.handleMove([6, 0], [7, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([6, 0], [4, 0]);
          chessBoard.handleMove([1, 0], [2, 0]);
          chessBoard.handleMove([4, 0], [5, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([4, 0])).toBeInstanceOf(Pawn);
          expect(chessBoard.getPosition([5, 0])).toBeUndefined();
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([6, 0], [6, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move if it's blocked", () => {
        chessBoard.handleMove([6, 0], [4, 0]);
        chessBoard.handleMove([1, 0], [3, 0]);

        try {
          chessBoard.handleMove([4, 0], [3, 0]);
        } catch (error) {
          expect(chessBoard.getPosition([3, 0])?.color).toBe("white");
          expect(chessBoard.getPosition([4, 0])?.color).toBe("black");
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.handleMove([6, 4], [5, 4]);
        chessBoard.handleMove([1, 0], [3, 0]);

        chessBoard.handleMove([5, 4], [4, 4]);
        chessBoard.handleMove([3, 0], [4, 0]);

        chessBoard.handleMove([4, 4], [3, 4]);
        chessBoard.handleMove([4, 0], [5, 0]);

        try {
          chessBoard.handleMove([6, 0], [4, 0]);
        } catch (error) {
          expect(chessBoard.getPosition([4, 0])).toBeUndefined();
          expect(chessBoard.getPosition([5, 0])?.color).toBe("white");
          expect(chessBoard.getPosition([6, 0])?.color).toBe("black");
          expect((error as Error).message).toBe("Invalid move");
        }
      });
    });

    describe("White Rook", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should not be able to move vertically at start", () => {
        try {
          chessBoard.handleMove([0, 0], [1, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.handleMove([0, 0], [0, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should be able to move vertically", () => {
        chessBoard.board[1][0] = undefined;

        chessBoard.handleMove([0, 0], [4, 0]);
        expect(chessBoard.getPosition([4, 0])?.color).toBe("white");
        expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([4, 0], [2, 0]);
        expect(chessBoard.getPosition([2, 0])?.color).toBe("white");
        expect(chessBoard.getPosition([2, 0])?.type).toBe("Rook");
      });

      it("should be able to move horizontally", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.handleMove([0, 0], [3, 0]);
        chessBoard.nextTurn();

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe("white");
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([3, 7], [3, 1]);
        expect(chessBoard.getPosition([3, 1])?.color).toBe("white");
        expect(chessBoard.getPosition([3, 1])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way", () => {
        try {
          chessBoard.handleMove([0, 0], [7, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe("white");
        }
      });

      it("should be able to move horizontally if there is a enemy in the target", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][0] = new BlackPawn();

        chessBoard.handleMove([0, 0], [3, 0]);
        expect(chessBoard.getPosition([3, 0])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 0])?.color).toBe("white");
      });

      it("should not be able to move away if there is a enemy in the middle", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][0] = new BlackPawn();

        try {
          chessBoard.handleMove([0, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe("white");
        }
      });
      it("should not be able to move away if there is an own piece in the middle", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][0] = new WhitePawn();

        try {
          chessBoard.handleMove([0, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe("white");
        }
      });

      it("should be able to capture if there is a enemy in the target", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][3] = new BlackPawn();
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
        expect(chessBoard.getPosition([3, 3])?.color).toBe("black");

        chessBoard.handleMove([0, 0], [3, 0]);
        chessBoard.nextTurn();
        chessBoard.handleMove([3, 0], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 3])?.color).toBe("white");
      });
    });

    describe("Black Rook", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should not be able to move vertically at start", () => {
        try {
          chessBoard.handleMove([7, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.handleMove([7, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
        }
      });

      it("should be able to move vertically", () => {
        chessBoard.board[6][0] = undefined;

        chessBoard.handleMove([7, 0], [4, 0]);
        expect(chessBoard.getPosition([4, 0])?.color).toBe("black");
        expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([4, 0], [2, 0]);
        expect(chessBoard.getPosition([2, 0])?.color).toBe("black");
        expect(chessBoard.getPosition([2, 0])?.type).toBe("Rook");
      });

      it("should be able to move horizontally", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.handleMove([7, 0], [3, 0]);
        chessBoard.nextTurn();

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([3, 7], [3, 1]);
        expect(chessBoard.getPosition([3, 1])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 1])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way", () => {
        try {
          chessBoard.handleMove([7, 0], [0, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([7, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([7, 0])?.color).toBe("black");
        }
      });

      it("should be able to move horizontally if there is a enemy in the target", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = new WhitePawn();

        chessBoard.handleMove([7, 0], [3, 0]);
        expect(chessBoard.getPosition([3, 0])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 0])?.color).toBe("black");
      });

      it("should not be able to move away if there is a enemy in the middle", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = new WhitePawn();

        try {
          chessBoard.handleMove([7, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe("white");
        }
      });

      it("should not be able to move away if there is an own piece in the middle", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = new BlackPawn();

        try {
          chessBoard.handleMove([7, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([7, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([7, 0])?.color).toBe("black");
        }
      });
      it("should not be able to move away if there is an own piece in the middle while going backward", () => {
        chessBoard.board[4][0] = new BlackRook();
        chessBoard.board[5][0] = new WhitePawn();

        try {
          chessBoard.handleMove([4, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 0])?.color).toBe("black");
        }
      });

      it("should be able to capture if there is a enemy in the target", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][3] = new WhitePawn();
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
        expect(chessBoard.getPosition([3, 3])?.color).toBe("white");

        chessBoard.handleMove([7, 0], [3, 0]);
        chessBoard.nextTurn();
        chessBoard.handleMove([3, 0], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 3])?.color).toBe("black");
      });
    });
  });
});
