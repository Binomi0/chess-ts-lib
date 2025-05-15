import Game from "./game";
import Player from "./player";
import { blackPawn, whiteQueen } from "./model/constants";
// import CastlingManager from "./castlingManager";
// import { PieceColor } from "./piece";
// import { Castling } from "./chessBoard";

const game = new Game();

const player1 = new Player("Alice");
const player2 = new Player("Bob");

game.manager.addPlayer(player1);
game.manager.addPlayer(player2);
game.start();

// const castleWhiteKingSide = () => {
//   if (game.chessBoard) {
//     game.chessBoard.stateManager.removePiece([7, 6]);
//     game.chessBoard.stateManager.removePiece([7, 5]);

//     CastlingManager.castle(
//       game.chessBoard.stateManager,
//       PieceColor.White,
//       Castling.King,
//     );

//     console.log(game.manager.players.get(PieceColor.White));
//     console.log(game.manager.players.get(PieceColor.Black));
//   }
// };

// const castleWhiteQueenSide = () => {
//   if (game.chessBoard) {
//     game.chessBoard.stateManager.removePiece([7, 1]);
//     game.chessBoard.stateManager.removePiece([7, 2]);
//     game.chessBoard.stateManager.removePiece([7, 3]);

//     CastlingManager.castle(
//       game.chessBoard.stateManager,
//       PieceColor.White,
//       Castling.Queen,
//     );

//     console.log(game.manager.players.get(PieceColor.White));
//     console.log(game.manager.players.get(PieceColor.Black));
//   }
// };

const canCheck = () => {
  if (game.board) {
    game.board.stateManager.removePiece([1, 4]);
    game.board.stateManager.placePiece([0, 5], blackPawn);
    game.board.stateManager.placePiece([0, 3], blackPawn);

    console.log(game.board.stateManager.getCell([0, 4]));
    game.board.stateManager.placePiece([6, 4], whiteQueen);
    game.manager.turnManager.switchTurn();

    const isCheck = game.board.isKingInCheck();
    if (isCheck) {
      console.log({ isCheck });
      const isCheckMate = game.board.isCheckMate();
      console.log({ isCheckMate });
    }
  }
};

canCheck();
