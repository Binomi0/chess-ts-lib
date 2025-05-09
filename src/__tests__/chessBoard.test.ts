import ChessBoard, { Position } from "../chessBoard";
import BoardValidations from "../board/boardValidations";
import { PieceColor, PieceType } from "../piece";
import PieceDirections from "../pieces/directions";
import PieceFactory from "../pieces/factory";
import { Pawn } from "../pieces/pawn";
import { Queen } from "../pieces/queen";
import { Knight } from "../pieces/knight";
import GameManager from "../gameManager";
import {
  blackBishop,
  whiteBishop,
  whiteKing,
  whitePawn,
  whiteRook,
} from "../pieces/constants";
import TurnManager from "../board/turnManager";

describe("Chess Board", () => {
  it("should be able to create an instance", () => {
    const gameManager = new GameManager();
    const turnManager = new TurnManager();
    const chessBoard = new ChessBoard(gameManager, turnManager);
    expect(chessBoard).toBeDefined();
  });

  describe("handleMove", () => {
    it("should be defined", () => {
      const gameManager = new GameManager();
      const turnManager = new TurnManager();

      const chessBoard = new ChessBoard(gameManager, turnManager);
      expect(chessBoard.stateManager.movePiece).toBeDefined();
    });

    describe("Black Pawn", () => {
      let chessBoard: ChessBoard;

      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
        chessBoard.nextTurn();
      });

      it("should be able to create a black pawn", () => {
        const blackPawn = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.Black,
        );
        expect(blackPawn).toBeDefined();
        expect(blackPawn.color).toBe(PieceColor.Black);
        expect(blackPawn.type).toBe("Pawn");
      });

      it("should move 1 position from start", () => {
        chessBoard.stateManager.movePiece([1, 0], [2, 0]);
        expect(chessBoard.stateManager.getCell([2, 0])).toHaveProperty(
          "type",
          "Pawn",
        );
        expect(chessBoard.stateManager.getCell([2, 0])).toHaveProperty(
          "color",
          PieceColor.Black,
        );
      });

      it("should move 2 positions from start", () => {
        chessBoard.stateManager.movePiece([1, 0], [3, 0]);
        expect(chessBoard.stateManager.getCell([3, 0])).toBeInstanceOf(Pawn);
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.stateManager.movePiece([1, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move diagonally from start if not enemy", () => {
        try {
          chessBoard.stateManager.movePiece([1, 0], [2, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should be able to move diagonally from start if enemy", () => {
        chessBoard.stateManager.placePiece([2, 1], whitePawn);
        try {
          chessBoard.stateManager.movePiece([1, 0], [2, 1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move out of chessboard", () => {
        try {
          chessBoard.stateManager.movePiece([1, 0], [1, -1]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.stateManager.movePiece([1, 0], [0, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should not be able to move backwards", () => {
        chessBoard.stateManager.placePiece(
          [5, 0],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );
        try {
          chessBoard.stateManager.movePiece([5, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
          expect(chessBoard.stateManager.getCell([4, 0])).toBeUndefined();
          expect(chessBoard.stateManager.getCell([5, 0])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([5, 0])?.color).toBe(
            PieceColor.Black,
          );
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.stateManager.movePiece([1, 0], [1, 1]);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should not be able to move if it's blocked", () => {
        chessBoard.stateManager.movePiece([1, 0], [3, 0]);
        chessBoard.stateManager.movePiece([6, 0], [4, 0]);

        try {
          chessBoard.stateManager.movePiece([3, 0], [4, 0]);
        } catch (error) {
          expect(chessBoard.stateManager.getCell([3, 0])).toHaveProperty(
            "color",
            PieceColor.Black,
          );
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.stateManager.placePiece([2, 0], whitePawn);

        try {
          chessBoard.stateManager.movePiece([1, 0], [3, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.stateManager.getCell([1, 0])?.color).toBe(
            PieceColor.Black,
          );
          expect(chessBoard.stateManager.getCell([2, 0])?.color).toBe(
            PieceColor.White,
          );
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should be able to check", () => {
        chessBoard.stateManager.initializeBoard();

        chessBoard.stateManager.placePiece([7, 0], whiteKing);
        chessBoard.stateManager.placePiece(
          [5, 0],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece(
          [6, 1],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );
        chessBoard.nextTurn();

        expect(
          BoardValidations.isKingInCheck(
            chessBoard.stateManager,
            chessBoard.stateManager.getBoardSnapshot(),
            chessBoard.turn,
          ),
        ).toBe(true);
      });

      it("should be able to checkmate", () => {
        chessBoard.stateManager.initializeBoard();

        chessBoard.stateManager.placePiece([7, 0], whiteKing);
        chessBoard.stateManager.placePiece(
          [5, 0],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );
        chessBoard.nextTurn();
        chessBoard.stateManager.placePiece(
          [6, 1],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );

        expect(
          BoardValidations.isCheckMate(
            chessBoard.stateManager,
            chessBoard.turn,
          ),
        ).toBe(true);
      });
    });

    describe("White Pawn", () => {
      let chessBoard: ChessBoard;

      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
      });

      it("should be able to create a white pawn", () => {
        const whitePawn = PieceFactory.getPiece(
          PieceType.Pawn,
          PieceColor.White,
        );
        expect(whitePawn).toBeDefined();
        expect(whitePawn.type).toBe("Pawn");
        expect(whitePawn.color).toBe(PieceColor.White);
      });

      it("should move 1 position from start", () => {
        chessBoard.stateManager.movePiece([6, 0], [5, 0]);
        expect(chessBoard.stateManager.getCell([5, 0])).toHaveProperty(
          "type",
          "Pawn",
        );
        expect(chessBoard.stateManager.getCell([5, 0])).toHaveProperty(
          "color",
          PieceColor.White,
        );
      });

      it("should move 2 positions from start", () => {
        chessBoard.stateManager.movePiece([6, 0], [4, 0]);
        expect(chessBoard.stateManager.getCell([4, 0])).toHaveProperty(
          "type",
          "Pawn",
        );
        expect(chessBoard.stateManager.getCell([4, 0])).toHaveProperty(
          "color",
          PieceColor.White,
        );
      });

      it("should not be able to move 3 positions from start", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [3, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move diagonal two positions from start", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [4, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move diagonally from start", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [5, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move out of chessboard", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [6, -1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move backwards if target is not empty", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [7, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should not be able to move backwards", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [4, 0]);
          chessBoard.nextTurn();
          chessBoard.stateManager.movePiece([4, 0], [5, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });

      it("should not be able to move lateral", () => {
        try {
          chessBoard.stateManager.movePiece([6, 0], [6, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should be able to capture if target is enemy", () => {
        chessBoard.stateManager.placePiece([5, 2], whitePawn);

        try {
          chessBoard.stateManager.movePiece([6, 1], [5, 2]);
          expect(false).toBe(true);
        } catch (error) {
          console.error(error);
          expect(chessBoard.stateManager.getCell([5, 2])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([5, 2])?.type).toBe("Pawn");
        }
      });

      it("should not be able to jump if it's blocked", () => {
        chessBoard.stateManager.placePiece([5, 0], whitePawn);

        try {
          chessBoard.stateManager.movePiece([6, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect(chessBoard.stateManager.getCell([4, 0])).toBeUndefined();
          expect(chessBoard.stateManager.getCell([5, 0])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([6, 0])?.color).toBe(
            PieceColor.White,
          );
          expect((error as Error).message).toBe("Invalid movement for pawn");
        }
      });
    });

    describe("Black Rook", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
        chessBoard.nextTurn();
      });

      it("should not be able to move vertically at start", () => {
        try {
          chessBoard.stateManager.movePiece([0, 0], [1, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.stateManager.movePiece([0, 0], [0, 1]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should be able to move vertically", () => {
        chessBoard.stateManager.removePiece([1, 0]);

        chessBoard.stateManager.movePiece([0, 0], [4, 0]);
        expect(chessBoard.stateManager.getCell([4, 0])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([4, 0])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.stateManager.movePiece([4, 0], [2, 0]);
        expect(chessBoard.stateManager.getCell([2, 0])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([2, 0])?.type).toBe("Rook");
      });

      it("should be able to move horizontally", () => {
        chessBoard.stateManager.removePiece([1, 0]);
        chessBoard.stateManager.movePiece([0, 0], [3, 0]);
        chessBoard.nextTurn();

        chessBoard.stateManager.movePiece([3, 0], [3, 7]);
        expect(chessBoard.stateManager.getCell([3, 7])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.stateManager.movePiece([3, 7], [3, 1]);
        expect(chessBoard.stateManager.getCell([3, 1])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([3, 1])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way", () => {
        try {
          chessBoard.stateManager.movePiece([0, 0], [7, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
          );
          expect(chessBoard.stateManager.getCell([0, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([0, 0])?.color).toBe(
            PieceColor.Black,
          );
        }
      });

      it("should be able to move horizontally if there is a enemy in the target", () => {
        chessBoard.stateManager.removePiece([1, 0]);
        chessBoard.stateManager.placePiece([3, 0], whitePawn);

        chessBoard.stateManager.movePiece([0, 0], [3, 0]);
        expect(chessBoard.stateManager.getCell([3, 0])?.type).toBe("Rook");
        expect(chessBoard.stateManager.getCell([3, 0])?.color).toBe(
          PieceColor.Black,
        );
      });

      it("should not be able to move away if there is a enemy in the middle", () => {
        chessBoard.stateManager.removePiece([1, 0]);
        chessBoard.stateManager.placePiece([3, 0], whitePawn);

        try {
          chessBoard.stateManager.movePiece([0, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
          );
          expect(chessBoard.stateManager.getCell([0, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([0, 0])?.color).toBe(
            PieceColor.Black,
          );
        }
      });
      it("should not be able to move away if there is an own piece in the middle", () => {
        chessBoard.stateManager.removePiece([1, 0]);
        chessBoard.stateManager.placePiece(
          [3, 0],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        try {
          chessBoard.stateManager.movePiece([0, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
          );
          expect(chessBoard.stateManager.getCell([0, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([0, 0])?.color).toBe(
            PieceColor.Black,
          );
        }
      });

      it("should be able to capture if there is a enemy in the target", () => {
        chessBoard.stateManager.removePiece([1, 0]);
        chessBoard.stateManager.placePiece([3, 3], whitePawn);
        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Pawn");
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.White,
        );

        chessBoard.stateManager.movePiece([0, 0], [3, 0]);
        chessBoard.nextTurn();
        chessBoard.stateManager.movePiece([3, 0], [3, 3]);

        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Rook");
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.Black,
        );
      });
    });

    describe("White Rook", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
      });

      it("should not be able to move vertically at start", () => {
        try {
          chessBoard.stateManager.movePiece([7, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should not be able to move horizontal at start", () => {
        try {
          chessBoard.stateManager.movePiece([7, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
        }
      });

      it("should be able to move vertically", () => {
        chessBoard.stateManager.removePiece([6, 0]);

        chessBoard.stateManager.movePiece([7, 0], [4, 0]);
        expect(chessBoard.stateManager.getCell([4, 0])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([4, 0])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.stateManager.movePiece([4, 0], [2, 0]);
        expect(chessBoard.stateManager.getCell([2, 0])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([2, 0])?.type).toBe("Rook");
      });

      it("should be able to move horizontally", () => {
        chessBoard.stateManager.placePiece([3, 0], whiteRook);

        chessBoard.stateManager.movePiece([3, 0], [3, 7]);
        expect(chessBoard.stateManager.getCell([3, 7])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([3, 7])?.type).toBe("Rook");

        chessBoard.nextTurn();

        chessBoard.stateManager.movePiece([3, 7], [3, 1]);
        expect(chessBoard.stateManager.getCell([3, 1])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([3, 1])?.type).toBe("Rook");
      });

      it("should not be able to move horizontally if there is a piece in the way while moving forward", () => {
        try {
          chessBoard.stateManager.placePiece([4, 5], whitePawn);
          chessBoard.stateManager.placePiece([4, 4], whiteRook);
          chessBoard.stateManager.movePiece([4, 4], [4, 6]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.White,
          );
        }
      });

      it("should not be able to move horizontally if there is a piece in the way while moving backward", () => {
        try {
          chessBoard.stateManager.placePiece([4, 5], whitePawn);
          chessBoard.stateManager.placePiece([4, 6], whiteRook);
          chessBoard.stateManager.movePiece([4, 6], [4, 4]);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
          );
          expect(chessBoard.stateManager.getCell([4, 6])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([4, 6])?.color).toBe(
            PieceColor.White,
          );
        }
      });

      it("should not be able to move horizontally if there is a piece in the way while moving downward", () => {
        try {
          chessBoard.stateManager.placePiece([3, 0], whitePawn);
          chessBoard.stateManager.placePiece([4, 0], whiteRook);
          chessBoard.stateManager.movePiece([4, 0], [2, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
          );
          expect(chessBoard.stateManager.getCell([4, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([4, 0])?.color).toBe(
            PieceColor.White,
          );
        }
      });

      it("should not be able to move if no changes", () => {
        try {
          chessBoard.stateManager.placePiece([4, 0], whiteRook);
          chessBoard.stateManager.movePiece([4, 0], [4, 0]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([4, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([4, 0])?.color).toBe(
            PieceColor.White,
          );
        }
      });

      it("should be able to move horizontally if there is a enemy in the target", () => {
        chessBoard.stateManager.removePiece([6, 0]);
        chessBoard.stateManager.placePiece(
          [3, 0],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        chessBoard.stateManager.movePiece([7, 0], [3, 0]);
        expect(chessBoard.stateManager.getCell([3, 0])?.type).toBe("Rook");
        expect(chessBoard.stateManager.getCell([3, 0])?.color).toBe(
          PieceColor.White,
        );
      });

      it("should not be able to move away if there is a enemy in the middle", () => {
        chessBoard.stateManager.removePiece([6, 0]);
        chessBoard.stateManager.placePiece(
          [3, 0],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        try {
          chessBoard.stateManager.movePiece([7, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.stateManager.getCell([0, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([0, 0])?.color).toBe(
            PieceColor.Black,
          );
        }
      });

      it("should not be able to move away if there is an own piece in the middle", () => {
        chessBoard.stateManager.removePiece([6, 0]);
        chessBoard.stateManager.placePiece([3, 0], whitePawn);

        try {
          chessBoard.stateManager.movePiece([7, 0], [4, 0]);
        } catch (error) {
          expect((error as Error).message).toBe("Invalid move");
          expect(chessBoard.stateManager.getCell([7, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([7, 0])?.color).toBe(
            PieceColor.White,
          );
        }
      });
      it("should not be able to move away if there is an own piece in the middle while going backward", () => {
        chessBoard.stateManager.placePiece([4, 0], whiteRook);
        chessBoard.stateManager.placePiece([5, 0], whitePawn);

        try {
          chessBoard.stateManager.movePiece([4, 0], [6, 0]);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([4, 0])?.type).toBe("Rook");
          expect(chessBoard.stateManager.getCell([4, 0])?.color).toBe(
            PieceColor.White,
          );
        }
      });

      it("should be able to capture if there is a enemy in the target", () => {
        chessBoard.stateManager.removePiece([6, 0]);
        chessBoard.stateManager.placePiece(
          [3, 3],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Pawn");
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.Black,
        );

        chessBoard.stateManager.movePiece([7, 0], [3, 0]);
        chessBoard.nextTurn();
        chessBoard.stateManager.movePiece([3, 0], [3, 3]);

        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Rook");
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.White,
        );
      });
    });

    describe("Black Knight", () => {
      it("should be defined", () => {
        const blackKnight = new Knight(PieceColor.Black);
        expect(blackKnight).toBeDefined();
      });

      describe("move to valid positions", () => {
        let chessBoard: ChessBoard;
        beforeEach(() => {
          const gameManager = new GameManager();
          const turnManager = new TurnManager();
          chessBoard = new ChessBoard(gameManager, turnManager);
          chessBoard.nextTurn();
        });

        it("should be able to move up two squares and left one square", () => {
          chessBoard.stateManager.movePiece([0, 1], [2, 0]);
          expect(chessBoard.stateManager.getCell([2, 0])?.type).toBe("Knight");
          expect(chessBoard.stateManager.getCell([2, 0])?.color).toBe(
            PieceColor.Black,
          );
        });

        it("should be able to move up two squares and right one square", () => {
          chessBoard.stateManager.movePiece([0, 1], [2, 2]);
          expect(chessBoard.stateManager.getCell([2, 2])?.type).toBe("Knight");
          expect(chessBoard.stateManager.getCell([2, 2])?.color).toBe(
            PieceColor.Black,
          );
        });

        it("should not be able to move up three squares and left one square", () => {
          try {
            chessBoard.stateManager.movePiece([0, 1], [3, 0]);
            expect(false).toBe(true);
          } catch (error) {
            expect((error as Error).message).toContain("Invalid move");
            expect(chessBoard.stateManager.getCell([0, 1])?.color).toBe(
              PieceColor.Black,
            );
            expect(chessBoard.stateManager.getCell([0, 1])?.type).toBe(
              "Knight",
            );
          }
        });
      });
    });

    describe("White Knight", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
      });

      it("should be defined", () => {
        const whiteKnight = new Knight(PieceColor.White);
        expect(whiteKnight).toBeDefined();
      });

      describe("move to valid positions", () => {
        it("should be able to move up two squares and left one square", () => {
          chessBoard.stateManager.movePiece([7, 1], [5, 0]);
          expect(chessBoard.stateManager.getCell([5, 0])?.type).toBe("Knight");
          expect(chessBoard.stateManager.getCell([5, 0])?.color).toBe(
            PieceColor.White,
          );
        });

        it("should be able to move up two squares and right one square", () => {
          chessBoard.stateManager.movePiece([7, 1], [5, 2]);
          expect(chessBoard.stateManager.getCell([5, 2])?.type).toBe("Knight");
          expect(chessBoard.stateManager.getCell([5, 2])?.color).toBe(
            PieceColor.White,
          );
        });

        it("should not be able to move up three squares and left one square", () => {
          try {
            chessBoard.stateManager.movePiece([7, 1], [4, 0]);
            expect(false).toBe(true);
          } catch (error) {
            expect((error as Error).message).toMatch(
              /^Invalid move for \w+ from [0-7],[0-7] to [0-7],[0-7]$/,
            );
            expect(chessBoard.stateManager.getCell([7, 1])?.color).toBe(
              PieceColor.White,
            );
            expect(chessBoard.stateManager.getCell([7, 1])?.type).toBe(
              "Knight",
            );
            expect(
              chessBoard.stateManager.getCell([4, 0])?.color,
            ).toBeUndefined();
          }
        });

        it("should not be able to move if target is occupied by a piece of the same color", () => {
          try {
            chessBoard.stateManager.placePiece([5, 2], whitePawn);
            chessBoard.stateManager.movePiece([7, 1], [5, 2]);
            expect(false).toBe(true);
          } catch (error) {
            expect((error as Error).message).toMatch(
              "Invalid move: target cell is occupied",
            );
            expect(chessBoard.stateManager.getCell([5, 2])?.color).toBe(
              PieceColor.White,
            );
            expect(chessBoard.stateManager.getCell([5, 2])?.type).toBe("Pawn");
          }
        });

        it("should be able to capture if target is occupied by a piece of the opposite  color", () => {
          chessBoard.stateManager.placePiece(
            [5, 2],
            PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
          );
          chessBoard.stateManager.movePiece([7, 1], [5, 2]);
          expect(chessBoard.stateManager.getCell([5, 2])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([5, 2])?.type).toBe("Knight");
        });
      });
    });

    describe("White Bishop", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
      });

      it("should be able to move diagonally bottom left", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteBishop);

        chessBoard.stateManager.movePiece([4, 4], [3, 3]);
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top right", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteBishop);

        chessBoard.stateManager.movePiece([4, 4], [5, 5]);
        expect(chessBoard.stateManager.getCell([5, 5])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([5, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top left", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteBishop);

        chessBoard.stateManager.movePiece([4, 4], [5, 3]);
        expect(chessBoard.stateManager.getCell([5, 3])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([5, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally bottom right", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteBishop);

        chessBoard.stateManager.movePiece([4, 4], [3, 5]);
        expect(chessBoard.stateManager.getCell([3, 5])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([3, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteBishop);
        chessBoard.stateManager.placePiece(
          [3, 3],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        chessBoard.stateManager.movePiece([4, 4], [3, 3]);
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Bishop");
      });

      it("should not be able to move diagonally if the target position is occupied by a piece of the same color", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteBishop);
        chessBoard.stateManager.placePiece([3, 3], whitePawn);

        try {
          chessBoard.stateManager.movePiece([4, 4], [3, 3]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe("Bishop");
        }
      });
    });

    describe("Black Bishop", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
        chessBoard.nextTurn();
      });

      it("should be able to move diagonally bottom left", () => {
        chessBoard.stateManager.placePiece([4, 4], blackBishop);

        chessBoard.stateManager.movePiece([4, 4], [3, 3]);
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top right", () => {
        chessBoard.stateManager.placePiece([4, 4], blackBishop);

        chessBoard.stateManager.movePiece([4, 4], [5, 5]);
        expect(chessBoard.stateManager.getCell([5, 5])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([5, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally top left", () => {
        chessBoard.stateManager.placePiece([4, 4], blackBishop);

        chessBoard.stateManager.movePiece([4, 4], [5, 3]);
        expect(chessBoard.stateManager.getCell([5, 3])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([5, 3])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally bottom right", () => {
        chessBoard.stateManager.placePiece([4, 4], blackBishop);

        chessBoard.stateManager.movePiece([4, 4], [3, 5]);
        expect(chessBoard.stateManager.getCell([3, 5])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([3, 5])?.type).toBe("Bishop");
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.stateManager.placePiece([4, 4], blackBishop);
        chessBoard.stateManager.placePiece([3, 3], whitePawn);

        chessBoard.stateManager.movePiece([4, 4], [3, 3]);
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Bishop");
      });

      it("should not be able to move diagonally if the target position is occupied by a piece of the same color", () => {
        chessBoard.stateManager.placePiece([4, 4], blackBishop);
        chessBoard.stateManager.placePiece(
          [3, 3],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        try {
          chessBoard.stateManager.movePiece([4, 4], [3, 3]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
            PieceColor.Black,
          );
          expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.Black,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe("Bishop");
        }
      });
    });

    describe("White Queen", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
      });

      it("should be defined", () => {
        expect(Queen).toBeDefined();
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.White),
        );
        chessBoard.stateManager.placePiece(
          [2, 2],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        chessBoard.stateManager.movePiece([4, 4], [2, 2]);
        expect(chessBoard.stateManager.getCell([2, 2])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([2, 2])?.type).toBe("Queen");
      });
      it("should be able to move horizontally to a target position", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.White),
        );
        chessBoard.stateManager.placePiece(
          [4, 6],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        chessBoard.stateManager.movePiece([4, 4], [4, 6]);
        expect(chessBoard.stateManager.getCell([4, 6])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([4, 6])?.type).toBe("Queen");
      });
      it("should be able to move vertically to a target position", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.White),
        );
        chessBoard.stateManager.placePiece(
          [2, 4],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        chessBoard.stateManager.movePiece([4, 4], [2, 4]);
        expect(chessBoard.stateManager.getCell([2, 4])?.color).toBe(
          PieceColor.White,
        );
        expect(chessBoard.stateManager.getCell([2, 4])?.type).toBe("Queen");
      });

      it("should not be able to move if a piece is blocking the path", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.White),
        );
        chessBoard.stateManager.placePiece([2, 4], whitePawn);
        try {
          chessBoard.stateManager.movePiece([4, 4], [2, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([2, 4])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([2, 4])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe("Queen");
        }
      });
    });

    describe("Black Queen", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
        chessBoard.nextTurn();
      });

      it("should be defined", () => {
        const blackQueen = PieceFactory.getPiece(
          PieceType.Queen,
          PieceColor.Black,
        );
        expect(blackQueen).toBeDefined();
      });

      it("should be able to move diagonally to a target position", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece([2, 2], whitePawn);
        chessBoard.stateManager.movePiece([4, 4], [2, 2]);
        expect(chessBoard.stateManager.getCell([2, 2])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([2, 2])?.type).toBe("Queen");
      });
      it("should be able to move horizontally to a target position", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece([4, 6], whitePawn);
        chessBoard.stateManager.movePiece([4, 4], [4, 6]);
        expect(chessBoard.stateManager.getCell([4, 6])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([4, 6])?.type).toBe("Queen");
      });
      it("should be able to move vertically to a target position", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece([2, 4], whitePawn);
        chessBoard.stateManager.movePiece([4, 4], [2, 4]);
        expect(chessBoard.stateManager.getCell([2, 4])?.color).toBe(
          PieceColor.Black,
        );
        expect(chessBoard.stateManager.getCell([2, 4])?.type).toBe("Queen");
      });

      it("should not be able to move if a piece is blocking the path", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece(
          [2, 4],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );
        try {
          chessBoard.stateManager.movePiece([4, 4], [2, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toMatch(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([2, 4])?.color).toBe(
            PieceColor.Black,
          );
          expect(chessBoard.stateManager.getCell([2, 4])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.Black,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe("Queen");
        }
      });
    });

    describe("Black King", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
        chessBoard.nextTurn();
      });

      it("should be defined", () => {
        const blackKing = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.Black,
        );
        expect(blackKing).toBeDefined();
      });

      it("should move vertically", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.King, PieceColor.Black),
        );
        chessBoard.stateManager.movePiece([4, 4], [3, 4]);

        expect(chessBoard.stateManager.getCell([3, 4])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([3, 4])?.color).toBe(
          PieceColor.Black,
        );
      });

      it("should move horizontally", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.King, PieceColor.Black),
        );
        chessBoard.stateManager.movePiece([4, 4], [4, 3]);

        expect(chessBoard.stateManager.getCell([4, 3])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([4, 3])?.color).toBe(
          PieceColor.Black,
        );
      });

      it("should move diagonally", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.King, PieceColor.Black),
        );
        chessBoard.stateManager.movePiece([4, 4], [3, 3]);

        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.Black,
        );
      });

      it("should not be able to move if there is a piece in the way", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.King, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece(
          [3, 4],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        try {
          chessBoard.stateManager.movePiece([4, 4], [3, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe(
            PieceType.King,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.Black,
          );
          expect(chessBoard.stateManager.getCell([3, 4])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([3, 4])?.color).toBe(
            PieceColor.Black,
          );
        }
      });

      it("should be able to move if there is an enemy in the target", () => {
        chessBoard.stateManager.placePiece(
          [4, 4],
          PieceFactory.getPiece(PieceType.King, PieceColor.Black),
        );
        chessBoard.stateManager.placePiece([3, 4], whitePawn);

        chessBoard.stateManager.movePiece([4, 4], [3, 4]);
        expect(chessBoard.stateManager.getCell([3, 4])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([3, 4])?.color).toBe(
          PieceColor.Black,
        );
      });
    });

    describe("White King", () => {
      let chessBoard: ChessBoard;
      beforeEach(() => {
        const gameManager = new GameManager();
        const turnManager = new TurnManager();
        chessBoard = new ChessBoard(gameManager, turnManager);
      });

      it("should be defined", () => {
        const whiteKing = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White,
        );
        expect(whiteKing).toBeDefined();
      });

      it("should move vertically", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteKing);
        chessBoard.stateManager.movePiece([4, 4], [3, 4]);

        expect(chessBoard.stateManager.getCell([3, 4])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([3, 4])?.color).toBe(
          PieceColor.White,
        );
      });

      it("should move horizontally", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteKing);
        chessBoard.stateManager.movePiece([4, 4], [4, 3]);

        expect(chessBoard.stateManager.getCell([4, 3])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([4, 3])?.color).toBe(
          PieceColor.White,
        );
      });

      it("should move diagonally", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteKing);
        chessBoard.stateManager.movePiece([4, 4], [3, 3]);

        expect(chessBoard.stateManager.getCell([3, 3])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([3, 3])?.color).toBe(
          PieceColor.White,
        );
      });

      it("should not be able to move if there is a piece in the way", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteKing);
        chessBoard.stateManager.placePiece([3, 4], whitePawn);

        try {
          chessBoard.stateManager.movePiece([4, 4], [3, 4]);
          expect(false).toBe(true);
        } catch (error) {
          expect((error as Error).message).toBe(
            "Invalid move: target cell is occupied",
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.type).toBe(
            PieceType.King,
          );
          expect(chessBoard.stateManager.getCell([4, 4])?.color).toBe(
            PieceColor.White,
          );
          expect(chessBoard.stateManager.getCell([3, 4])?.type).toBe("Pawn");
          expect(chessBoard.stateManager.getCell([3, 4])?.color).toBe(
            PieceColor.White,
          );
        }
      });

      it("should be able to move if there is an enemy in the target", () => {
        chessBoard.stateManager.placePiece([4, 4], whiteKing);
        chessBoard.stateManager.placePiece(
          [3, 4],
          PieceFactory.getPiece(PieceType.Pawn, PieceColor.Black),
        );

        chessBoard.stateManager.movePiece([4, 4], [3, 4]);
        expect(chessBoard.stateManager.getCell([3, 4])?.type).toBe(
          PieceType.King,
        );
        expect(chessBoard.stateManager.getCell([3, 4])?.color).toBe(
          PieceColor.White,
        );
      });

      it("should not be able to move if will be in check, DRAW", () => {
        chessBoard.stateManager.initializeBoard();

        const whiteKing = PieceFactory.getPiece(
          PieceType.King,
          PieceColor.White,
        );

        chessBoard.stateManager.placePiece([7, 0], whiteKing);
        chessBoard.stateManager.placePiece(
          [5, 1],
          PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
        );

        const availableMoves = whiteKing.getAllAvailableMoves(
          chessBoard.stateManager,
          [7, 0],
          PieceDirections.King,
        );

        const escapeMoves: Position[] = [];
        for (const move of availableMoves) {
          chessBoard.stateManager.placePiece([move[0], move[1]], whiteKing);
          chessBoard.stateManager.removePiece([7, 0]);

          if (
            !BoardValidations.isKingInCheck(
              chessBoard.stateManager,
              chessBoard.stateManager.getBoardSnapshot(),
              chessBoard.turn,
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
