import GameManager from "../../gameManager";
import {
  blackKing,
  blackQueen,
  blackRook,
  whiteKing,
  whiteRook,
} from "../../model/constants";
import { Castling, PieceColor, PieceType } from "../../types";
import CastlingManager from "../castlingManager";
import ChessBoard from "../chessBoard";
import MovementManager from "../movementManager";
import StateManager from "../stateManager";
import TurnManager from "../turnManager";

describe("ChessBoard", () => {
  it("should create a new ChessBoard instance", () => {
    const turnManager = new TurnManager();
    const gameManager = new GameManager(turnManager);
    const stateManager = new StateManager();
    const moveManager = new MovementManager(stateManager, turnManager);
    const chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
    expect(chessBoard).toBeDefined();
  });

  describe("nextTurn", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      chessBoard.stateManager.initializeBoard();
    });
    it("should be defined", () => {
      expect(chessBoard.nextTurn).toBeInstanceOf(Function);
    });

    it("should switch the turn correctly", () => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      expect(turnManager.getCurrentTurn()).toBe(PieceColor.White);
      chessBoard.nextTurn();
      expect(turnManager.getCurrentTurn()).toBe(PieceColor.Black); // Assuming player 2 is next
    });
  });

  describe("isKingInCheck", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      chessBoard.stateManager.initializeBoard();
    });

    it("should be defined", () => {
      expect(chessBoard.isKingInCheck).toBeInstanceOf(Function);
    });
    it("should return true if the king is in check", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([7, 0], whiteKing);
      chessBoard.stateManager.placePiece([4, 0], blackQueen);

      expect(chessBoard.isKingInCheck()).toBe(true); // King on [7, 0] is under attack by Queen on [4, 0]
    });
  });

  describe("isCheckMate", () => {
    let chessBoard: ChessBoard;
    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      chessBoard.stateManager.initializeBoard();
    });

    it("should be defined", () => {
      expect(chessBoard.isCheckMate).toBeInstanceOf(Function);
    });

    it("should return true if the king is in checkmate", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([7, 0], whiteKing);
      chessBoard.stateManager.placePiece([4, 1], blackRook);
      chessBoard.stateManager.placePiece([6, 1], blackQueen);
      expect(chessBoard.isCheckMate()).toBe(true); // King on [7, 0] is under attack by Queen on [4, 0]
    });

    it("should return false if the king is not in checkmate", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([7, 0], whiteKing);
      chessBoard.stateManager.placePiece([5, 0], blackQueen); // King on [7, 0] is not under attack by Queen on [5, 0]
      expect(chessBoard.isCheckMate()).toBe(false);
    });
  });

  describe("getBoard", () => {
    let chessBoard: ChessBoard;
    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      chessBoard.stateManager.initializeBoard();
    });
    it("should return the current board state", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([0, 0], whiteKing);
      const expectedBoard = [
        [
          whiteKing,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
        [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
        ],
      ];

      expect(chessBoard.getBoard()).toEqual(expectedBoard);
    });
  });

  describe("getPosition", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      chessBoard.stateManager.initializeBoard();
    });
    it("should return the correct cell at a given position", () => {
      const expectedCell = chessBoard.getPosition([0, 0]);
      expect(expectedCell).toHaveProperty("type", PieceType.Rook);
      expect(expectedCell).toHaveProperty("color", PieceColor.Black);
    });
  });

  describe("handleMove", () => {
    let chessBoard: ChessBoard;
    beforeEach(() => {
      const turnManager = new TurnManager();
      const gameManager = new GameManager(turnManager);
      const stateManager = new StateManager();
      const moveManager = new MovementManager(stateManager, turnManager);
      chessBoard = new ChessBoard(gameManager, stateManager, moveManager);
      chessBoard.stateManager.initializeBoard();
    });
    it("should be a function", () => {
      expect(typeof chessBoard.handleMove).toBe("function");
    });

    it("should handle a valid move", () => {
      chessBoard.stateManager.setEmptyBoard();
      chessBoard.stateManager.placePiece([5, 6], blackKing);
      chessBoard.stateManager.placePiece([0, 4], whiteKing);
      chessBoard.stateManager.placePiece([0, 0], whiteRook);
      chessBoard.handleMove([0, 0], [7, 0]);
      expect(chessBoard.getPosition([0, 0])).toBe(undefined);
      expect(chessBoard.getPosition([7, 0])).toHaveProperty(
        "type",
        PieceType.Rook,
      );
      expect(chessBoard.getPosition([7, 0])).toHaveProperty(
        "color",
        PieceColor.White,
      );
    });
  });

  describe("castling", () => {
    let chessBoard: ChessBoard;

    beforeEach(() => {
      const _turnManager = new TurnManager();
      const _gameManager = new GameManager(_turnManager);
      const _stateManager = new StateManager();
      const moveManager = new MovementManager(_stateManager, _turnManager);
      chessBoard = new ChessBoard(_gameManager, _stateManager, moveManager);
      chessBoard.stateManager.setEmptyBoard();
      CastlingManager.castlingRights.black = true;
      CastlingManager.castlingRights.white = true;
    });

    it("should handle a valid castling move for black king on queen side", () => {
      chessBoard.stateManager.placePiece([0, 0], blackRook);
      chessBoard.stateManager.placePiece([0, 4], blackKing);
      chessBoard.castling(Castling.Queen, PieceColor.Black);
      expect(chessBoard.getPosition([0, 3])).toHaveProperty(
        "type",
        PieceType.Rook,
      );
      expect(chessBoard.getPosition([0, 3])).toHaveProperty(
        "color",
        PieceColor.Black,
      );
      expect(chessBoard.getPosition([0, 2])).toHaveProperty(
        "type",
        PieceType.King,
      );
      expect(chessBoard.getPosition([0, 2])).toHaveProperty(
        "color",
        PieceColor.Black,
      );
    });

    it("should handle a valid castling move for black king on king side", () => {
      chessBoard.stateManager.placePiece([0, 7], blackRook);
      chessBoard.stateManager.placePiece([0, 4], blackKing);
      chessBoard.castling(Castling.King, PieceColor.Black);

      expect(chessBoard.getPosition([0, 5])).toHaveProperty(
        "type",
        PieceType.Rook,
      );
      expect(chessBoard.getPosition([0, 5])).toHaveProperty(
        "color",
        PieceColor.Black,
      );
      expect(chessBoard.getPosition([0, 6])).toHaveProperty(
        "type",
        PieceType.King,
      );
      expect(chessBoard.getPosition([0, 6])).toHaveProperty(
        "color",
        PieceColor.Black,
      );
    });

    it("should handle a valid castling move for white king on queen side", () => {
      chessBoard.stateManager.placePiece([7, 0], whiteRook);
      chessBoard.stateManager.placePiece([7, 4], whiteKing);
      chessBoard.castling(Castling.Queen, PieceColor.White);
      expect(chessBoard.getPosition([7, 3])).toHaveProperty(
        "type",
        PieceType.Rook,
      );
      expect(chessBoard.getPosition([7, 3])).toHaveProperty(
        "color",
        PieceColor.White,
      );
      expect(chessBoard.getPosition([7, 2])).toHaveProperty(
        "type",
        PieceType.King,
      );
      expect(chessBoard.getPosition([7, 2])).toHaveProperty(
        "color",
        PieceColor.White,
      );
    });

    it("should handle a valid castling move for white king on king side", () => {
      chessBoard.stateManager.placePiece([7, 7], whiteRook);
      chessBoard.stateManager.placePiece([7, 4], whiteKing);
      chessBoard.nextTurn();
      chessBoard.castling(Castling.King, PieceColor.White);

      console.log(chessBoard.getBoard());
      expect(chessBoard.getPosition([7, 5])).toHaveProperty(
        "type",
        PieceType.Rook,
      );
      expect(chessBoard.getPosition([7, 5])).toHaveProperty(
        "color",
        PieceColor.White,
      );
      expect(chessBoard.getPosition([7, 6])).toHaveProperty(
        "type",
        PieceType.King,
      );
      expect(chessBoard.getPosition([7, 6])).toHaveProperty(
        "color",
        PieceColor.White,
      );
    });
  });
});
