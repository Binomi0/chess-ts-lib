import Game from "./game";
import { PieceColor } from "./piece";
import { BlackPawn } from "./pieces/pawn";
import { WhiteQueen } from "./pieces/queen";
import Player from "./player";

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

    game.chessBoard.castlingWhite("king");

    console.log(game.chessBoard.players.get(PieceColor.White));
    console.log(game.chessBoard.players.get(PieceColor.Black));

    // const isCheck = game.chessBoard.isCheck();
    // console.log({ isCheck });
  }
};
const castleWhiteQueenSide = () => {
  if (game.chessBoard) {
    game.chessBoard.board[7][1] = undefined;
    game.chessBoard.board[7][2] = undefined;
    game.chessBoard.board[7][3] = undefined;

    game.chessBoard.castlingWhite("queen");

    console.log(game.chessBoard.players.get(PieceColor.White));
    console.log(game.chessBoard.players.get(PieceColor.Black));

    // const isCheck = game.chessBoard.isCheck();
    // console.log({ isCheck });
  }
};

const canCheck = () => {
  if (game.chessBoard) {
    game.chessBoard.board[1][4] = undefined;
    game.chessBoard.board[0][5] = new BlackPawn();
    game.chessBoard.board[0][3] = new BlackPawn();

    console.log(game.chessBoard.getPosition([0, 4]));
    game.chessBoard.board[6][4] = new WhiteQueen();
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
