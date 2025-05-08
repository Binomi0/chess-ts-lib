import ChessBoard from "../../chessBoard";
import ChessBoardValidations from "../boardValidations";
import GameManager from "../../gameManager";
import { PieceColor, PieceType } from "../../piece";
import PieceDirections from "../../pieces/directions";
import PieceFactory from "../../pieces/factory";
import { createFreshBoard } from "../../utils/helpers";

describe("Chess Board Validations", () => {
  let chessBoard: ChessBoard;

  beforeEach(() => {
    const gameManager = new GameManager();
    chessBoard = new ChessBoard(gameManager);
  });

  it("should check if a king is in check", () => {
    chessBoard.board = createFreshBoard();
    chessBoard.board[7][0] = PieceFactory.getPiece(
      PieceType.King,
      PieceColor.Black,
    );
    chessBoard.board[4][0] = PieceFactory.getPiece(
      PieceType.Rook,
      PieceColor.White,
    );
    expect(
      ChessBoardValidations.isKingInCheck(chessBoard.board, PieceColor.Black),
    ).toBe(true);
  });

  it("should find the king's position on the board", () => {
    const king = ChessBoardValidations.findKing(
      chessBoard.board,
      PieceColor.Black,
    );
    expect(king).toEqual([0, 4]);
  });

  it("should validate a turn based on piece color and current position", () => {
    const isValidTurn = ChessBoardValidations.isValidTurn(
      chessBoard.board,
      [0, 4],
      PieceColor.Black,
    );
    expect(isValidTurn).toBe(true); // Assuming the king can move to any adjacent square
  });

  it("should check if there are any legal moves for the king", () => {
    chessBoard.board = createFreshBoard();
    chessBoard.board[7][0] = PieceFactory.getPiece(
      PieceType.King,
      PieceColor.White,
    );
    chessBoard.board[5][1] = PieceFactory.getPiece(
      PieceType.Rook,
      PieceColor.Black,
    );
    const validMoves = chessBoard.board[7][0].getAllAvailableMoves(
      chessBoard.board,
      [7, 0],
      PieceDirections.King,
    );

    expect(validMoves).toEqual([]);
  });

  it("should determine if the game is over due to a checkmate or stalemate", () => {
    chessBoard.board = createFreshBoard();
    chessBoard.board[7][0] = PieceFactory.getPiece(
      PieceType.King,
      PieceColor.White,
    );
    chessBoard.board[5][1] = PieceFactory.getPiece(
      PieceType.Rook,
      PieceColor.Black,
    );
    chessBoard.board[6][1] = PieceFactory.getPiece(
      PieceType.Queen,
      PieceColor.Black,
    );

    const checkMate = ChessBoardValidations.isCheckMate(
      chessBoard.board,
      PieceColor.White,
    );
    expect(checkMate).toBe(true);
  });
});
