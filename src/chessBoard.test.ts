import ChessBoard, { Position } from "./chessBoard";
import ChessBoardValidations from "./chessBoardValidations";
import Piece, { PieceColor, PieceType } from "./piece";
import PieceDirections from "./pieces/directions";
import { BlackBishop, WhiteBishop } from "./pieces/bishop";
import PieceFactory from "./pieces/factory";
import { BlackKing, WhiteKing } from "./pieces/king";
import { WhiteKnight, BlackKnight } from "./pieces/knight";
import { Pawn, BlackPawn, WhitePawn } from "./pieces/pawn";
import { BlackQueen, WhiteQueen } from "./pieces/queen";
import { BlackRook, WhiteRook } from "./pieces/rook";
import { createFreshBoard } from "./utils/helpers";

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

    describe("Black Pawn", () => {
      let chessBoard: ChessBoard;

      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be able to create a black pawn", () => {
        const blackPawn = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        expect(blackPawn).toBeDefined();
        expect(blackPawn.color).toBe(PieceColor.Black);
        expect(blackPawn.type).toBe("Pawn");
      });

      it("should move 1 position from start", () => {
        chessBoard.handleMove([1, 0], [2, 0]);
        expect(chessBoard.getPosition([2, 0])).toHaveProperty("type", "Pawn");
        expect(chessBoard.getPosition([2, 0])).toHaveProperty(
          "color",
          PieceColor.Black
        );
      });

      it("should move 2 positions from start", () => {
        chessBoard.handleMove([1, 0], [3, 0]);
        expect(chessBoard.getPosition([3, 0])).toBeInstanceOf(Pawn);
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.handleMove([1, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move diagonally from start if not enemy", () => {
        try {
          chessBoard.handleMove([1, 0], [2, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should be able to move diagonally from start if enemy", () => {
        chessBoard.board[2][1] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        try {
          chessBoard.handleMove([1, 0], [2, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
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
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move backwards", () => {
        chessBoard.board[5][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        try {
          chessBoard.handleMove([5, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
          expect(chessBoard.getPosition([4, 0])).toBeUndefined();
          expect(chessBoard.getPosition([5, 0])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([5, 0])?.color).toBe(PieceColor.Black);
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
            PieceColor.Black
          );
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.board[2][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([1, 0], [3, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.getPosition([1, 0])?.color).toBe(PieceColor.Black);
          expect(chessBoard.getPosition([2, 0])?.color).toBe(PieceColor.White);
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should be able to check", () => {
        chessBoard.board = createFreshBoard();

        chessBoard.board[7][0] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        );
        chessBoard.board[5][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        chessBoard.board[6][1] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );
        chessBoard.nextTurn();

        expect(
          ChessBoardValidations.isKingInCheck(chessBoard.board, chessBoard.turn)
        ).toBe(true);
      });

      it("should be able to checkmate", () => {
        chessBoard.board = createFreshBoard();

        chessBoard.board[7][0] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        );
        chessBoard.board[5][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        chessBoard.nextTurn();
        chessBoard.board[6][1] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );

        expect(
          ChessBoardValidations.isCheckMate(chessBoard.board, chessBoard.turn)
        ).toBe(true);
      });
    });

    describe("White Pawn", () => {
      let chessBoard: ChessBoard;

      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be able to create a white pawn", () => {
        const whitePawn = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        expect(whitePawn).toBeDefined();
        expect(whitePawn.type).toBe("Pawn");
        expect(whitePawn.color).toBe(PieceColor.White);
      });

      it("should move 1 position from start", () => {
        chessBoard.handleMove([6, 0], [5, 0]);
        expect(chessBoard.getPosition([5, 0])).toHaveProperty("type", "Pawn");
        expect(chessBoard.getPosition([5, 0])).toHaveProperty(
          "color",
          PieceColor.White
        );
      });

      it("should move 2 positions from start", () => {
        chessBoard.handleMove([6, 0], [4, 0]);
        expect(chessBoard.getPosition([4, 0])).toHaveProperty("type", "Pawn");
        expect(chessBoard.getPosition([4, 0])).toHaveProperty(
          "color",
          PieceColor.White
        );
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.handleMove([6, 0], [3, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move diagonal two positions from start", () => {
        try {
          chessBoard.handleMove([6, 0], [4, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move diagonally from start", () => {
        try {
          chessBoard.handleMove([6, 0], [5, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move out of chessboard", () => {
        try {
          chessBoard.handleMove([6, 0], [6, -1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Out of bounds");
        }
      });

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.handleMove([6, 0], [7, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.handleMove([6, 0], [4, 0]);
          chessBoard.nextTurn();
          chessBoard.handleMove([4, 0], [5, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.handleMove([6, 0], [6, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should be able to capture if target is enemy", () => {
        chessBoard.board[5][2] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([6, 1], [5, 2]);
          expect(false).toBe(true);
        } catch (error) {
          console.error(error);
          expect(chessBoard.getPosition([5, 2])?.color).toBe(PieceColor.White);
          expect(chessBoard.getPosition([5, 2])?.type).toBe("Pawn");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.board[5][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([6, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.getPosition([4, 0])).toBeUndefined();
          expect(chessBoard.getPosition([5, 0])?.color).toBe(PieceColor.White);
          expect(chessBoard.getPosition([6, 0])?.color).toBe(PieceColor.White);
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
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
          chessBoard.handleMove([0, 0], [1, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.handleMove([0, 0], [0, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
        }
      });

      it("should be able to move vertically", () => {
        chessBoard.board[1][0] = undefined;

        chessBoard.handleMove([0, 0], [4, 0]);
        expect(chessBoard.getPosition([4, 0])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([4, 0], [2, 0]);
        expect(chessBoard.getPosition([2, 0])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([2, 0])?.type).toBe("Rook");
      });

      it("should be able to move horizontally", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.handleMove([0, 0], [3, 0]);
        chessBoard.nextTurn();

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([3, 7], [3, 1]);
        expect(chessBoard.getPosition([3, 1])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([3, 1])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way", () => {
        try {
          chessBoard.handleMove([0, 0], [7, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe(PieceColor.Black);
        }
      });

      it("should be able to move horizontally if there is a enemy in the target", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        chessBoard.handleMove([0, 0], [3, 0]);
        expect(chessBoard.getPosition([3, 0])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 0])?.color).toBe(PieceColor.Black);
      });

      it("should not be able to move away if there is a enemy in the middle", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([0, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe(PieceColor.Black);
        }
      });
      it("should not be able to move away if there is an own piece in the middle", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );

        try {
          chessBoard.handleMove([0, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe(PieceColor.Black);
        }
      });

      it("should be able to capture if there is a enemy in the target", () => {
        chessBoard.board[1][0] = undefined;
        chessBoard.board[3][3] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.White);

        chessBoard.handleMove([0, 0], [3, 0]);
        chessBoard.nextTurn();
        chessBoard.handleMove([3, 0], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.Black);
      });
    });

    describe("White Rook", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
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
        expect(chessBoard.getPosition([4, 0])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([4, 0], [2, 0]);
        expect(chessBoard.getPosition([2, 0])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([2, 0])?.type).toBe("Rook");
      });

      it("should be able to move horizontally", () => {
        chessBoard.board[3][0] = new WhiteRook();

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.handleMove([3, 7], [3, 1]);
        expect(chessBoard.getPosition([3, 1])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 1])?.type).toBe("Rook");
      });

      it("should be able to capture moving forward", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = new WhiteRook();
        chessBoard.board[3][7] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );

        chessBoard.handleMove([3, 0], [3, 7]);
        expect(chessBoard.getPosition([3, 7])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 7])?.type).toBe("Rook");
      });

      it("should be able to capture moving backward", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][7] = new WhiteRook();
        chessBoard.board[3][0] = new BlackRook();

        chessBoard.handleMove([3, 7], [3, 0]);
        expect(chessBoard.getPosition([3, 0])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 0])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way while moving forward", () => {
        try {
          chessBoard.board[4][5] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.White
          );
          chessBoard.board[4][4] = new WhiteRook();
          chessBoard.handleMove([4, 4], [4, 6]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.White);
        }
      });

      it("should not be able to move horizontally if there is a piece in the way while moving backward", () => {
        try {
          chessBoard.board[4][5] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.White
          );
          chessBoard.board[4][6] = new WhiteRook();
          chessBoard.handleMove([4, 6], [4, 4]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([4, 6])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 6])?.color).toBe(PieceColor.White);
        }
      });

      it("should not be able to move horizontally if there is a piece in the way while moving downward", () => {
        try {
          chessBoard.board[3][0] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.White
          );
          chessBoard.board[4][0] = new WhiteRook();
          chessBoard.handleMove([4, 0], [2, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
          );
          expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 0])?.color).toBe(PieceColor.White);
        }
      });

      it("should not be able to move if no changes", () => {
        try {
          chessBoard.board[4][0] = new WhiteRook();
          chessBoard.handleMove([4, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 0])?.color).toBe(PieceColor.White);
        }
      });

      it("should be able to move horizontally if there is a enemy in the target", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );

        chessBoard.handleMove([7, 0], [3, 0]);
        expect(chessBoard.getPosition([3, 0])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 0])?.color).toBe(PieceColor.White);
      });

      it("should not be able to move away if there is a enemy in the middle", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );

        try {
          chessBoard.handleMove([7, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([0, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([0, 0])?.color).toBe(PieceColor.Black);
        }
      });

      it("should not be able to move away if there is an own piece in the middle", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([7, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.getPosition([7, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([7, 0])?.color).toBe(PieceColor.White);
        }
      });
      it("should not be able to move away if there is an own piece in the middle while going backward", () => {
        chessBoard.board[4][0] = new WhiteRook();
        chessBoard.board[5][0] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([4, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 0])?.type).toBe("Rook");
          expect(chessBoard.getPosition([4, 0])?.color).toBe(PieceColor.White);
        }
      });

      it("should be able to capture if there is a enemy in the target", () => {
        chessBoard.board[6][0] = undefined;
        chessBoard.board[3][3] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.Black);

        chessBoard.handleMove([7, 0], [3, 0]);
        chessBoard.nextTurn();
        chessBoard.handleMove([3, 0], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("Rook");
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.White);
      });
    });

    describe("Black Knight", () => {
      it("should be defined", () => {
        const blackKnight = new BlackKnight();
        expect(blackKnight).toBeDefined();
      });

      describe("move to valid positions", () => {
        let chessBoard: ChessBoard;
        beforeEach(() => {
          chessBoard = new ChessBoard();
          chessBoard.nextTurn();
        });

        it("should be able to move up two squares and left one square", () => {
          chessBoard.handleMove([0, 1], [2, 0]);
          expect(chessBoard.getPosition([2, 0])?.type).toBe("Knight");
          expect(chessBoard.getPosition([2, 0])?.color).toBe(PieceColor.Black);
        });

        it("should be able to move up two squares and right one square", () => {
          chessBoard.handleMove([0, 1], [2, 2]);
          expect(chessBoard.getPosition([2, 2])?.type).toBe("Knight");
          expect(chessBoard.getPosition([2, 2])?.color).toBe(PieceColor.Black);
        });

        it("should not be able to move up three squares and left one square", () => {
          try {
            chessBoard.handleMove([0, 1], [3, 0]);
            expect(false).toBe(true);
          } catch (error) {
            expect(chessBoard.getPosition([0, 1])?.color).toBe(
              PieceColor.Black
            );
            expect(chessBoard.getPosition([0, 1])?.type).toBe("Knight");
          }
        });
      });
    });

    describe("White Knight", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be defined", () => {
        const whiteKnight = new WhiteKnight();
        expect(whiteKnight).toBeDefined();
      });

      describe("move to valid positions", () => {
        it("should be able to move up two squares and left one square", () => {
          chessBoard.handleMove([7, 1], [5, 0]);
          expect(chessBoard.getPosition([5, 0])?.type).toBe("Knight");
          expect(chessBoard.getPosition([5, 0])?.color).toBe(PieceColor.White);
        });

        it("should be able to move up two squares and right one square", () => {
          chessBoard.handleMove([7, 1], [5, 2]);
          expect(chessBoard.getPosition([5, 2])?.type).toBe("Knight");
          expect(chessBoard.getPosition([5, 2])?.color).toBe(PieceColor.White);
        });

        it("should not be able to move up three squares and left one square", () => {
          try {
            chessBoard.handleMove([7, 1], [4, 0]);
            expect(false).toBe(true);
          } catch (error) {
            expect((error as Error).message).toMatch(
              /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/
            );
            expect(chessBoard.getPosition([7, 1])?.color).toBe(
              PieceColor.White
            );
            expect(chessBoard.getPosition([7, 1])?.type).toBe("Knight");
            expect(chessBoard.getPosition([4, 0])?.color).toBeUndefined();
          }
        });

        it("should not be able to move if target is occupied by a piece of the same color", () => {
          try {
            chessBoard.board[5][2] = PieceFactory.getPiece(
              PieceType.Pawn,
              PieceColor.White
            );
            chessBoard.handleMove([7, 1], [5, 2]);
            expect(false).toBe(true);
          } catch (error) {
            expect(chessBoard.getPosition([5, 2])?.color).toBe(
              PieceColor.White
            );
            expect(chessBoard.getPosition([5, 2])?.type).toBe("Pawn");
          }
        });

        it("should be able to capture if target is occupied by a piece of the opposite  color", () => {
          chessBoard.board[5][2] = PieceFactory.getPiece(
            PieceType.Pawn,
            PieceColor.Black
          );
          chessBoard.handleMove([7, 1], [5, 2]);
          expect(chessBoard.getPosition([5, 2])?.color).toBe(PieceColor.White);
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
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top right", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [5, 5]);
        expect(chessBoard.getPosition([5, 5])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([5, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top left", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [5, 3]);
        expect(chessBoard.getPosition([5, 3])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([5, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally bottom right", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.handleMove([4, 4], [3, 5]);
        expect(chessBoard.getPosition([3, 5])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.board[3][3] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        chessBoard.handleMove([4, 4], [3, 3]);
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should not be able to move diagonally if the target position is occupied by a piece of the same color", () => {
        chessBoard.board[4][4] = new WhiteBishop();
        chessBoard.board[3][3] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        try {
          chessBoard.handleMove([4, 4], [3, 3]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.White);
          expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.White);
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
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top right", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [5, 5]);
        expect(chessBoard.getPosition([5, 5])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([5, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top left", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [5, 3]);
        expect(chessBoard.getPosition([5, 3])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([5, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally bottom right", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.handleMove([4, 4], [3, 5]);
        expect(chessBoard.getPosition([3, 5])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([3, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.board[3][3] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        chessBoard.handleMove([4, 4], [3, 3]);
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([3, 3])?.type).toBe("Bishop");
      });

      it("should not be able to move diagonally if the target position is occupied by a piece of the same color", () => {
        chessBoard.board[4][4] = new BlackBishop();
        chessBoard.board[3][3] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );

        try {
          chessBoard.handleMove([4, 4], [3, 3]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.Black);
          expect(chessBoard.getPosition([3, 3])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.Black);
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
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.White
        );
        chessBoard.board[2][2] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        chessBoard.handleMove([4, 4], [2, 2]);
        expect(chessBoard.getPosition([2, 2])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([2, 2])?.type).toBe("Queen");
      });
      it("should be able to move horizontally to a target position", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.White
        );
        chessBoard.board[4][6] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        chessBoard.handleMove([4, 4], [4, 6]);
        expect(chessBoard.getPosition([4, 6])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([4, 6])?.type).toBe("Queen");
      });
      it("should be able to move vertically to a target position", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.White
        );
        chessBoard.board[2][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        chessBoard.handleMove([4, 4], [2, 4]);
        expect(chessBoard.getPosition([2, 4])?.color).toBe(PieceColor.White);
        expect(chessBoard.getPosition([2, 4])?.type).toBe("Queen");
      });

      it("should not be able to move if a piece is blocking the path", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.White
        );
        chessBoard.board[2][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        try {
          chessBoard.handleMove([4, 4], [2, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.getPosition([2, 4])?.color).toBe(PieceColor.White);
          expect(chessBoard.getPosition([2, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.White);
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
        const blackQueen = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );
        expect(blackQueen).toBeDefined();
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );
        chessBoard.board[2][2] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        chessBoard.handleMove([4, 4], [2, 2]);
        expect(chessBoard.getPosition([2, 2])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([2, 2])?.type).toBe("Queen");
      });
      it("should be able to move horizontally to a target position", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );
        chessBoard.board[4][6] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        chessBoard.handleMove([4, 4], [4, 6]);
        expect(chessBoard.getPosition([4, 6])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([4, 6])?.type).toBe("Queen");
      });
      it("should be able to move vertically to a target position", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );
        chessBoard.board[2][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );
        chessBoard.handleMove([4, 4], [2, 4]);
        expect(chessBoard.getPosition([2, 4])?.color).toBe(PieceColor.Black);
        expect(chessBoard.getPosition([2, 4])?.type).toBe("Queen");
      });

      it("should not be able to move if a piece is blocking the path", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );
        chessBoard.board[2][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        );
        try {
          chessBoard.handleMove([4, 4], [2, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.getPosition([2, 4])?.color).toBe(PieceColor.Black);
          expect(chessBoard.getPosition([2, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.Black);
          expect(chessBoard.getPosition([4, 4])?.type).toBe("Queen");
        }
      });
    });

    describe("Black King", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
        chessBoard.nextTurn();
      });

      it("should be defined", () => {
        const blackKing = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black
        );
        expect(blackKing).toBeDefined();
      });

      it("should move vertically", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black
        ); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 4]);

        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe(PieceColor.Black);
      });

      it("should move horizontally", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black
        ); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [4, 3]);

        expect(chessBoard.getPosition([4, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([4, 3])?.color).toBe(PieceColor.Black);
      });

      it("should move diagonally", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black
        ); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.Black);
      });

      it("should not be able to move if there is a piece in the way", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black
        ); // Place the king at position (4, 4)
        chessBoard.board[3][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        ); // Place the king at position (4, 4)

        try {
          chessBoard.handleMove([4, 4], [3, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("King");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.Black);
          expect(chessBoard.getPosition([3, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([3, 4])?.color).toBe(PieceColor.Black);
        }
      });

      it("should be able to move if there is an enemy in the target", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black
        );
        chessBoard.board[3][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        );

        chessBoard.handleMove([4, 4], [3, 4]);
        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe(PieceColor.Black);
      });
    });

    describe("White King", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        chessBoard = new ChessBoard();
      });

      it("should be defined", () => {
        const whiteKing = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        );
        expect(whiteKing).toBeDefined();
      });

      it("should move vertically", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        ); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 4]);

        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe(PieceColor.White);
      });

      it("should move horizontally", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        ); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [4, 3]);

        expect(chessBoard.getPosition([4, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([4, 3])?.color).toBe(PieceColor.White);
      });

      it("should move diagonally", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        ); // Place the king at position (4, 4)
        chessBoard.handleMove([4, 4], [3, 3]);

        expect(chessBoard.getPosition([3, 3])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 3])?.color).toBe(PieceColor.White);
      });

      it("should not be able to move if there is a piece in the way", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        ); // Place the king at position (4, 4)
        chessBoard.board[3][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White
        ); // Place the king at position (4, 4)

        try {
          chessBoard.handleMove([4, 4], [3, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Can't capture own piece");
          expect(chessBoard.getPosition([4, 4])?.type).toBe("King");
          expect(chessBoard.getPosition([4, 4])?.color).toBe(PieceColor.White);
          expect(chessBoard.getPosition([3, 4])?.type).toBe("Pawn");
          expect(chessBoard.getPosition([3, 4])?.color).toBe(PieceColor.White);
        }
      });

      it("should be able to move if there is an enemy in the target", () => {
        chessBoard.board[4][4] = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        ); // Place the king at position (4, 4)
        chessBoard.board[3][4] = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black
        ); // Place the king at position (4, 4)

        chessBoard.handleMove([4, 4], [3, 4]);
        expect(chessBoard.getPosition([3, 4])?.type).toBe("King");
        expect(chessBoard.getPosition([3, 4])?.color).toBe(PieceColor.White);
      });

      it("should not be able to move if will be in check, DRAW", () => {
        chessBoard.board = createFreshBoard();

        const whiteKing = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White
        );

        chessBoard.board[7][0] = whiteKing;
        chessBoard.board[5][1] = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black
        );

        const availableMoves = whiteKing.getAllAvailableMoves(
          chessBoard.board,
          [7, 0],
          PieceDirections.King
        );

        const escapeMoves: Position[] = [];
        for (const move of availableMoves) {
          chessBoard.board[move[0]][move[1]] = whiteKing;
          chessBoard.board[7][0] = undefined;

          if (
            !ChessBoardValidations.isKingInCheck(
              chessBoard.board,
              chessBoard.turn
            )
          ) {
            escapeMoves.push(move);
          }
        }

        expect(escapeMoves.length).toBe(0);
      });
    });
  });
});
