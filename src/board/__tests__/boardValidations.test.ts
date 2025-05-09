import ChessBoard from "../../chessBoard";
import ChessBoardValidations from "../boardValidations";
import GameManager from "../../gameManager";
import { PieceColor, PieceType } from "../../piece";
import PieceDirections from "../../pieces/directions";
import PieceFactory from "../../pieces/factory";
import { blackKing, whiteRook } from "../../pieces/constants";

describe("Chess Board Validations", () => {
  let chessBoard: ChessBoard;

  beforeEach(() => {
    const gameManager = new GameManager();
    chessBoard = new ChessBoard(gameManager);
  });

  it("should check if a king is in check", () => {
    chessBoard.stateManager.initializeBoard();
    chessBoard.stateManager.placePiece([7, 0], blackKing);
    chessBoard.stateManager.placePiece([4, 0], whiteRook);

    expect(
      ChessBoardValidations.isKingInCheck(
        chessBoard.stateManager,
        chessBoard.stateManager.getBoardSnapshot(),
        PieceColor.Black,
      ),
    ).toBe(true);
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
    chessBoard.stateManager.initializeBoard();
    chessBoard.stateManager.placePiece(
      [7, 0],
      PieceFactory.getPiece(PieceType.King, PieceColor.White),
    );

    chessBoard.stateManager.placePiece(
      [5, 1],
      PieceFactory.getPiece(PieceType.Rook, PieceColor.Black),
    );

    chessBoard.stateManager.placePiece(
      [6, 1],
      PieceFactory.getPiece(PieceType.Queen, PieceColor.Black),
    );

    const checkMate = ChessBoardValidations.isCheckMate(
      chessBoard.stateManager,
      PieceColor.White,
    );
    expect(checkMate).toBe(true);
  });
});
