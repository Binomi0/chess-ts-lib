import CastlingManager from "./castlingManager";
import Game from "./game";
import { PieceColor } from "./piece";
import Player from "./player";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Castling } from "./chessBoard";

const game = new Game();

const player1 = new Player("Alice");
const player2 = new Player("Bob");

game.addPlayer(player1);
game.addPlayer(player2);
game.start();

const castleWhiteKingSide = () => {
  if (game.chessBoard) {
    game.chessBoard.board[7][6] = undefined;
    game.chessBoard.board[7][5] = undefined;

    CastlingManager.castle(
      game.chessBoard.board,
      PieceColor.White,
      Castling.King,
    );

    console.log(game.chessBoard.players.get(PieceColor.White));
    console.log(game.chessBoard.players.get(PieceColor.Black));
  }
};

const castleWhiteQueenSide = () => {
  if (game.chessBoard) {
    game.chessBoard.board[7][1] = undefined;
    game.chessBoard.board[7][2] = undefined;
    game.chessBoard.board[7][3] = undefined;

    CastlingManager.castle(
      game.chessBoard.board,
      PieceColor.White,
      Castling.Queen,
    );

    console.log(game.chessBoard.players.get(PieceColor.White));
    console.log(game.chessBoard.players.get(PieceColor.Black));
  }
};

const canCheck = () => {
  if (game.chessBoard) {
    game.chessBoard.board[1][4] = undefined;
    game.chessBoard.board[0][5] = new Pawn(PieceColor.Black);
    game.chessBoard.board[0][3] = new Pawn(PieceColor.Black);

    console.log(game.chessBoard.getPosition([0, 4]));
    game.chessBoard.board[6][4] = new Queen(PieceColor.White);
    game.chessBoard.nextTurn();

    const isCheck = game.chessBoard.isKingInCheck();
    if (isCheck) {
      console.log({ isCheck });
      const isCheckMate = game.chessBoard.isCheckMate();
      console.log({ isCheckMate });
    }
  }
};

canCheck();
