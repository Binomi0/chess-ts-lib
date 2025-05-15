import ChessBoard from "../chessBoard";
import ChessBoardValidations from "../boardValidations";
import GameManager from "../../gameManager";
import PieceDirections from "../../model/directions";
import PieceFactory from "../../model/factory";
import {
  blackKing,
  blackPawn,
  blackQueen,
  whiteKing,
  whiteRook,
} from "../../model/constants";
import TurnManager from "../turnManager";
import { PieceColor, PieceType } from "../../types";

describe("Chess Board Validations", () => {
  let chessBoard: ChessBoard;

  beforeEach(() => {
    const turnManager = new TurnManager();
    const gameManager = new GameManager(turnManager);
    chessBoard = new ChessBoard(gameManager);
  });

  it("should check if a king is in check", () => {
    chessBoard.stateManager.setEmptyBoard();
    chessBoard.stateManager.placePiece([7, 0], blackKing);
    chessBoard.stateManager.placePiece([4, 0], whiteRook);

    expect(
      ChessBoardValidations.isKingInCheck(
        chessBoard.stateManager,
        chessBoard.getBoard(),
        PieceColor.Black,
      ),
    ).toBe(true);
  });

  it("should check if a king is NOT in check", () => {
    chessBoard.stateManager.initializeBoard();
    chessBoard.stateManager.placePiece([3, 3], blackKing);

    expect(
      ChessBoardValidations.isKingInCheck(
        chessBoard.stateManager,
        chessBoard.getBoard(),
        PieceColor.Black,
      ),
    ).toBe(false);
  });

  it("should find the king's position on the board", () => {
    const king = chessBoard.stateManager.findKing(PieceColor.Black);
    expect(king).toEqual([0, 4]);
  });

  it("should check if there are any legal moves for the king", () => {
    chessBoard.stateManager.initializeBoard();
    chessBoard.stateManager.placePiece(
      [7, 0],
      PieceFactory.getPiece(PieceType.King, PieceColor.White),
    );

    chessBoard.stateManager.placePiece(
      [5, 1],
      PieceFactory.getPiece(PieceType.Rook, PieceColor.Black),
    );
    const validMoves = chessBoard.stateManager
      .getCell([7, 0])
      ?.getAllAvailableMoves(
        chessBoard.stateManager,
        [7, 0],
        PieceDirections.King,
      );

    expect(validMoves).toEqual([]);
  });

  it("should determine if the game is over due to a checkmate or stalemate", () => {
    chessBoard.stateManager.setEmptyBoard();
    chessBoard.stateManager.placePiece([7, 0], whiteKing);
    chessBoard.stateManager.placePiece([5, 0], blackPawn);
    chessBoard.stateManager.placePiece([6, 1], blackQueen);

    const checkMate = ChessBoardValidations.isCheckMate(
      chessBoard.stateManager,
      PieceColor.White,
    );
    expect(checkMate).toBe(true);
  });
});
