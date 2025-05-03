import ChessBoard from "./chessBoard";
import { BlackBishop, WhiteBishop } from "./pieces/bishop";
import { BlackKing, WhiteKing } from "./pieces/king";
import { WhiteKnight, BlackKnight } from "./pieces/knight";
import { Pawn, BlackPawn, WhitePawn } from "./pieces/pawn";
import { BlackQueen, WhiteQueen } from "./pieces/queen";
import { BlackRook, WhiteRook } from "./pieces/rook";

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
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
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
        chessBoard.board[2][1] = new BlackPawn();
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
          expect((error as Error).message).toBe("Out of bounds");
        }
      });

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.handleMove([1, 0], [0, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([1, 0], [3, 0]);
          chessBoard.handleMove([6, 0], [5, 0]);
          chessBoard.handleMove([3, 0], [2, 0]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([2, 0])).toBeUndefined();
          expect(chessBoard.getPosition([3, 0])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([3, 0])?.color).toBe("white");
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([1, 0], [1, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
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
        expect(chessBoard.getPosition([5, 0])).toHaveProperty("type", "Pawn");
        expect(chessBoard.getPosition([5, 0])).toHaveProperty("color", "black");
      });

      it("should move 2 positions from start", () => {
        chessBoard.handleMove([6, 0], [4, 0]);
        expect(chessBoard.getPosition([4, 0])).toHaveProperty("type", "Pawn");
        expect(chessBoard.getPosition([4, 0])).toHaveProperty("color", "black");
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.handleMove([6, 0], [3, 0]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
        }
      });

      it("should not be able to move diagonally from start", () => {
        try {
          chessBoard.handleMove([6, 0], [5, 1]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
        }
      });

      it("should not be able to move out of chessboard", () => {
        try {
          chessBoard.handleMove([6, 0], [6, -1]);
        } catch (error) {
          expect((error as Error).message).toBe("Out of bounds");
        }
      });

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.handleMove([6, 0], [7, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([6, 0], [4, 0]);
          chessBoard.nextTurn();
          chessBoard.handleMove([4, 0], [5, 0]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([6, 0], [6, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should be able to capture if target is enemy", () => {
        chessBoard.board[5][2] = new WhitePawn();

        try {
          chessBoard.handleMove([6, 1], [5, 2]);
        } catch (error) {
          console.error(error);
          expect(chessBoard.getPosition([5, 2])?.color).toBe("black");
          expect(chessBoard.getPosition([5, 2])?.type).toBe("Pawn");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.board[5][0] = new WhitePawn();

        try {
          chessBoard.handleMove([6, 0], [4, 0]);
        } catch (error) {
          expect(chessBoard.getPosition([4, 0])).toBeUndefined();
          expect(chessBoard.getPosition([5, 0])?.color).toBe("white");
          expect(chessBoard.getPosition([6, 0])?.color).toBe("black");
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
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
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.handleMove([0, 0], [0, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
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
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
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
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
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
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
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
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.handleMove([7, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
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
        chessBoard.board[3][0] = new BlackRook();

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([3, 7], [3, 1]);
        expect(chessBoard.getPosition([3, 1])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 1])?.type).toBe("Rook");
      });

      it("should be able to capture moving forward", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = new BlackRook();
        chessBoard.board[3][7] = new WhiteRook();

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([3, 7], [3, 1]);
        expect(chessBoard.getPosition([3, 1])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 1])?.type).toBe("Rook");
      });

      it("should be able to capture moving backward", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][7] = new BlackRook();
        chessBoard.board[3][0] = new WhiteRook();

        chessBoard.handleMove([3, 7], [3, 0]);
        expect(chessBoard.getPosition([3, 0])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 0])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way while moving forward", () => {
        try {
          chessBoard.board[4][5] = new BlackPawn();
          chessBoard.board[4][4] = new BlackRook();
          chessBoard.handleMove([4, 4], [4, 6]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("black");
        }
      });

      it("should not be able to move horizontally if there is a piece in the way while moving backward", () => {
        try {
          chessBoard.board[4][5] = new BlackPawn();
          chessBoard.board[4][6] = new BlackRook();
          chessBoard.handleMove([4, 6], [4, 4]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([4, 6])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 6])?.color).toBe("black");
        }
      });

      it("should not be able to move horizontally if there is a piece in the way while moving downward", () => {
        try {
          chessBoard.board[3][0] = new BlackPawn();
          chessBoard.board[4][0] = new BlackRook();
          chessBoard.handleMove([4, 0], [2, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 0])?.color).toBe("black");
        }
      });

      it("should not be able to move if no changes", () => {
        try {
          chessBoard.board[4][0] = new BlackRook();
          chessBoard.handleMove([4, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 0])?.color).toBe("black");
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
          expect((error as Error).message).toBe("Can't capture own piece");
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

    describe("White Knight", () => {
      it("should be defined", () => {
        const whiteKnight = new WhiteKnight();
        expect(whiteKnight).toBeDefined();
      });

      describe("move to valid positions", () => {
        let chessBoard: ChessBoard;
        beforeEach(() => {
          chessBoard = new ChessBoard();
        });

        it("should be able to move up two squares and left one square", () => {
          chessBoard.handleMove([0, 1], [2, 0]);
          expect(chessBoard.getPosition([2, 0])?.type).toBe("Knight");
          expect(chessBoard.getPosition([2, 0])?.color).toBe("white");
        });

        it("should be able to move up two squares and right one square", () => {
          chessBoard.handleMove([0, 1], [2, 2]);
          expect(chessBoard.getPosition([2, 2])?.type).toBe("Knight");
          expect(chessBoard.getPosition([2, 2])?.color).toBe("white");
        });

        it("should not be able to move up three squares and left one square", () => {
          try {
            chessBoard.handleMove([0, 1], [3, 0]);
            expect(false).toBe(true);
          } catch (error) {
            expect(chessBoard.getPosition([0, 1])?.color).toBe("white");
            expect(chessBoard.getPosition([0, 1])?.type).toBe("Knight");
          }
        });
      });
    });

    describe("Black Knight", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be defined", () => {
        const blackKnight = new BlackKnight();
        expect(blackKnight).toBeDefined();
      });

      describe("move to valid positions", () => {
        it("should be able to move up two squares and left one square", () => {
          chessBoard.handleMove([7, 1], [5, 0]);
          expect(chessBoard.getPosition([5, 0])?.type).toBe("Knight");
          expect(chessBoard.getPosition([5, 0])?.color).toBe("black");
        });

        it("should be able to move up two squares and right one square", () => {
          chessBoard.handleMove([7, 1], [5, 2]);
          expect(chessBoard.getPosition([5, 2])?.type).toBe("Knight");
          expect(chessBoard.getPosition([5, 2])?.color).toBe("black");
        });

        it("should not be able to move up three squares and left one square", () => {
          try {
            chessBoard.handleMove([7, 1], [4, 0]);
            expect(chessBoard.getPosition([7, 1])?.color).toBe("black");
            expect(chessBoard.getPosition([7, 1])?.type).toBe("Knight");
            expect(chessBoard.getPosition([4, 0])?.color).toBeUndefined();
          } catch (error) {
            expect(chessBoard.getPosition([7, 1])?.color).toBe("black");
            expect(chessBoard.getPosition([7, 1])?.type).toBe("Knight");
            expect(chessBoard.getPosition([4, 0])?.color).toBeUndefined();
          }
        });

        it("should not be able to move if target is occupied by a piece of the same color", () => {
          try {
            chessBoard.board[5][2] = new BlackPawn();
            chessBoard.handleMove([7, 1], [5, 2]);
            expect(false).toBe(true);
          } catch (error) {
            expect(chessBoard.getPosition([5, 2])?.color).toBe("black");
            expect(chessBoard.getPosition([5, 2])?.type).toBe("Pawn");
          }
        });

        it("should be able to capture if target is occupied by a piece of the opposite  color", () => {
          chessBoard.board[5][2] = new WhitePawn();
          chessBoard.handleMove([7, 1], [5, 2]);
          expect(chessBoard.getPosition([5, 2])?.color).toBe("black");
          expect(chessBoard.getPosition([5, 2])?.type).toBe("Knight");
        });
      });
    });

    describe("White Bishop", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be able to move diagonally bottom left", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [3, 3]);
        expect(chessBoard.getPosition([3, 3])?.color).toBe("white");
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top right", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [5, 5]);
        expect(chessBoard.getPosition([5, 5])?.color).toBe("white");
        expect(chessBoard.getPosition([5, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top left", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [5, 3]);
        expect(chessBoard.getPosition([5, 3])?.color).toBe("white");
        expect(chessBoard.getPosition([5, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally bottom right", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [3, 5]);
        expect(chessBoard.getPosition([3, 5])?.color).toBe("white");
        expect(chessBoard.getPosition([3, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.board[3][3] = new BlackPawn();
        chessBoard.handleMove([4, 4], [3, 3]);
        expect(chessBoard.getPosition([3, 3])?.color).toBe("white");
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should not be able to move diagonally if the target position is occupied by a piece of the same color", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.board[3][3] = new WhitePawn();

        try {
          chessBoard.handleMove([4, 4], [3, 3]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([3, 3])?.color).toBe("white");
          expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("white");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Bishop");
        }
      });
    });

    describe("Black Bishop", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be able to move diagonally bottom left", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [3, 3]);
        expect(chessBoard.getPosition([3, 3])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top right", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [5, 5]);
        expect(chessBoard.getPosition([5, 5])?.color).toBe("black");
        expect(chessBoard.getPosition([5, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top left", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [5, 3]);
        expect(chessBoard.getPosition([5, 3])?.color).toBe("black");
        expect(chessBoard.getPosition([5, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally bottom right", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [3, 5]);
        expect(chessBoard.getPosition([3, 5])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.board[3][3] = new WhitePawn();
        chessBoard.handleMove([4, 4], [3, 3]);
        expect(chessBoard.getPosition([3, 3])?.color).toBe("black");
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should not be able to move diagonally if the target position is occupied by a piece of the same color", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.board[3][3] = new BlackPawn();

        try {
          chessBoard.handleMove([4, 4], [3, 3]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([3, 3])?.color).toBe("black");
          expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("black");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Bishop");
        }
      });
    });

    describe("White Queen", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be defined", () => {
        expect(WhiteQueen).toBeDefined();
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = new WhiteQueen();
        chessBoard.board[2][2] = new BlackPawn();
        chessBoard.handleMove([4, 4], [2, 2]);
        expect(chessBoard.getPosition([2, 2])?.color).toBe("white");
        expect(chessBoard.getPosition([2, 2])?.type).toBe("Queen");
      });
      it("should be able to move horizontally to a target position", () => {
        chessBoard.board[4][4] = new WhiteQueen();
        chessBoard.board[4][6] = new BlackPawn();
        chessBoard.handleMove([4, 4], [4, 6]);
        expect(chessBoard.getPosition([4, 6])?.color).toBe("white");
        expect(chessBoard.getPosition([4, 6])?.type).toBe("Queen");
      });
      it("should be able to move vertically to a target position", () => {
        chessBoard.board[4][4] = new WhiteQueen();
        chessBoard.board[2][4] = new BlackPawn();
        chessBoard.handleMove([4, 4], [2, 4]);
        expect(chessBoard.getPosition([2, 4])?.color).toBe("white");
        expect(chessBoard.getPosition([2, 4])?.type).toBe("Queen");
      });

      it("should not be able to move if a piece is blocking the path", () => {
        chessBoard.board[4][4] = new WhiteQueen();
        chessBoard.board[2][4] = new WhitePawn();
        try {
          chessBoard.handleMove([4, 4], [2, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.getPosition([2, 4])?.color).toBe("white");
          expect(chessBoard.getPosition([2, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("white");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Queen");
        }
      });
    });

    describe("Black Queen", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be defined", () => {
        const blackQueen = new BlackQueen();
        expect(blackQueen).toBeDefined();
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = new BlackQueen();
        chessBoard.board[2][2] = new WhitePawn();
        chessBoard.handleMove([4, 4], [2, 2]);
        expect(chessBoard.getPosition([2, 2])?.color).toBe("black");
        expect(chessBoard.getPosition([2, 2])?.type).toBe("Queen");
      });
      it("should be able to move horizontally to a target position", () => {
        chessBoard.board[4][4] = new BlackQueen();
        chessBoard.board[4][6] = new WhitePawn();
        chessBoard.handleMove([4, 4], [4, 6]);
        expect(chessBoard.getPosition([4, 6])?.color).toBe("black");
        expect(chessBoard.getPosition([4, 6])?.type).toBe("Queen");
      });
      it("should be able to move vertically to a target position", () => {
        chessBoard.board[4][4] = new BlackQueen();
        chessBoard.board[2][4] = new WhitePawn();
        chessBoard.handleMove([4, 4], [2, 4]);
        expect(chessBoard.getPosition([2, 4])?.color).toBe("black");
        expect(chessBoard.getPosition([2, 4])?.type).toBe("Queen");
      });

      it("should not be able to move if a piece is blocking the path", () => {
        chessBoard.board[4][4] = new BlackQueen();
        chessBoard.board[2][4] = new BlackPawn();
        try {
          chessBoard.handleMove([4, 4], [2, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.getPosition([2, 4])?.color).toBe("black");
          expect(chessBoard.getPosition([2, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("black");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Queen");
        }
      });
    });

    describe("White King", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be defined", () => {
        const whiteKing = new WhiteKing();
        expect(whiteKing).toBeDefined();
      });

      it("should move vertically", () => {
        chessBoard.board[4][4] = new WhiteKing(); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 4]);

        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe("white");
      });

      it("should move horizontally", () => {
        chessBoard.board[4][4] = new WhiteKing(); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [4, 3]);

        expect(chessBoard.getPosition([4, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([4, 3])?.color).toBe("white");
      });

      it("should move diagonally", () => {
        chessBoard.board[4][4] = new WhiteKing(); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 3])?.color).toBe("white");
      });

      it("should not be able to move if there is a piece in the way", () => {
        chessBoard.board[4][4] = new WhiteKing(); // Place the king at position (4, 4)
        chessBoard.board[3][4] = new WhitePawn(); // Place the king at position (4, 4)

        try {
          chessBoard.handleMove([4, 4], [3, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("King");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("white");
          expect(chessBoard.getPosition([3, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([3, 4])?.color).toBe("white");
        }
      });

      it("should be able to move if there is an enemy in the target", () => {
        chessBoard.board[4][4] = new WhiteKing();
        chessBoard.board[3][4] = new BlackPawn();

        chessBoard.handleMove([4, 4], [3, 4]);
        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe("white");
      });

      it("should be able to castling to queen side if there are no enemy in the way", () => {
        chessBoard.board[0][1] = undefined;
        chessBoard.board[0][2] = undefined;
        chessBoard.board[0][3] = undefined;

        const whiteKing = new WhiteKing();
        const castling = whiteKing.canCastle(chessBoard.board, "queen");
        chessBoard.castlingWhite("queen");

        expect(castling).toBe(true);

        expect(chessBoard.board[0][1]).toHaveProperty("type", "Rook");
        expect(chessBoard.board[0][2]).toHaveProperty("type", "King");
        expect(chessBoard.board[0][3]).toBe(undefined);
        expect(chessBoard.board[0][4]).toBe(undefined);
        expect(chessBoard.board[0][0]).toBe(undefined);
      });

      it("should be able to castling to king side if there are no enemy in the way", () => {
        chessBoard.board[0][6] = undefined;
        chessBoard.board[0][5] = undefined;

        const whiteKing = new WhiteKing();
        const castling = whiteKing.canCastle(chessBoard.board, "king");

        expect(castling).toBe(true);
      });

      it("should not be able to castling to king side if there is an enemy in the way", () => {
        chessBoard.board[0][6] = undefined;
        chessBoard.board[0][5] = new BlackPawn();

        const whiteKing = new WhiteKing();
        const castling = whiteKing.canCastle(chessBoard.board, "king");

        expect(castling).toBe(false);
      });

      it("should not be able to castling to king side if its blocked", () => {
        chessBoard.board[0][6] = undefined;
        chessBoard.board[0][5] = new BlackPawn();

        const whiteKing = new WhiteKing();
        const castling = whiteKing.canCastle(chessBoard.board, "king");

        expect(castling).toBe(false);
      });
    });

    describe("Black King", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be defined", () => {
        const blackKing = new BlackKing();
        expect(blackKing).toBeDefined();
      });

      it("should move vertically", () => {
        chessBoard.board[4][4] = new BlackKing(); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 4]);

        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe("black");
      });

      it("should move horizontally", () => {
        chessBoard.board[4][4] = new BlackKing(); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [4, 3]);

        expect(chessBoard.getPosition([4, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([4, 3])?.color).toBe("black");
      });

      it("should move diagonally", () => {
        chessBoard.board[4][4] = new BlackKing(); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 3])?.color).toBe("black");
      });

      it("should not be able to move if there is a piece in the way", () => {
        chessBoard.board[4][4] = new BlackKing(); // Place the king at position (4, 4)
        chessBoard.board[3][4] = new BlackPawn(); // Place the king at position (4, 4)

        try {
          chessBoard.handleMove([4, 4], [3, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("King");
          expect(chessBoard.getPosition([4, 4])?.color).toBe("black");
          expect(chessBoard.getPosition([3, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([3, 4])?.color).toBe("black");
        }
      });

      it("should be able to move if there is an enemy in the target", () => {
        chessBoard.board[4][4] = new BlackKing(); // Place the king at position (4, 4)
        chessBoard.board[3][4] = new WhitePawn(); // Place the king at position (4, 4)

        chessBoard.handleMove([4, 4], [3, 4]);
        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe("black");
      });

      it("should be able to castling to queen side if there are no enemy in the way", () => {
        chessBoard.board[7][3] = undefined;
        chessBoard.board[7][2] = undefined;
        chessBoard.board[7][1] = undefined;

        const blackKing = new BlackKing();
        const castling = blackKing.canCastle(chessBoard.board, "queen");

        expect(castling).toBe(true);
      });

      it("should be able to castling to king side if there are no enemy in the way", () => {
        chessBoard.board[7][6] = undefined;
        chessBoard.board[7][5] = undefined;

        const blackKing = new BlackKing();
        const castling = blackKing.canCastle(chessBoard.board, "king");

        expect(castling).toBe(true);
      });

      it("should not be able to castling to king side if there is an enemy in the way", () => {
        chessBoard.board[0][6] = undefined;
        chessBoard.board[0][5] = new BlackPawn();

        const blackKing = new BlackKing();
        const castling = blackKing.canCastle(chessBoard.board, "king");
        expect(castling).toBe(false);
      });

      it("should not be able to castling to king side if its blocked", () => {
        chessBoard.board[0][6] = undefined;
        chessBoard.board[0][5] = new BlackPawn();

        const blackKing = new BlackKing();

        const castling = blackKing.canCastle(chessBoard.board, "king");
        expect(castling).toBe(false); // This should never be true
      });
    });
  });
});
