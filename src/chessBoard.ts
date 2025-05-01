import Piece from "./piece";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Knight from "./pieces/knight";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";

type BoardCell = Piece | undefined;

class ChessBoard {
  private board: BoardCell[][];

  constructor() {
    this.board = Array(8)
      .fill(undefined)
      .map(() => Array(8).fill(undefined));

    this.initializeBoard();
  }

  getBoard(): BoardCell[][] {
    return [...this.board];
  }

  getPosition(coords: [number, number]) {
    return this.board[coords[0]][coords[1]];
  }

  handleMove(from: [number, number], to: [number, number]) {
    if (this.isValidMove(from, to)) {
      const pieceToMove = this.board[from[0]][from[1]];
      this.board[to[0]][to[1]] = pieceToMove;
      this.board[from[0]][from[1]] = undefined;
    } else {
      throw new Error("Invalid move");
    }
  }

  private isValidMove(from: [number, number], to: [number, number]): boolean {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // Implementa la lógica para validar el movimiento aquí
    if (this.board[fromRow][fromCol] === undefined) {
      return false; // La ficha no existe en esa posición
    }
    const pieceToMove = this.board[fromRow][fromCol];

    const destinationPiece = this.board[toRow][toCol];
    if (destinationPiece && destinationPiece.color === pieceToMove.color) {
      console.log("Can't capture own piece");
      return false;
    }

    if (!this.isInBounds(from) || !this.isInBounds(to)) {
      console.log("Out of bounds");
      return false;
    }

    const piece = this.board[fromRow][fromCol];
    const isWhite = piece.color === "white";

    switch (piece.type) {
      case "Pawn": // Peón
        if (isWhite) {
          return Pawn.validateWhiteMove(this.board, from, to);
        } else {
          return Pawn.validateBlackMove(this.board, from, to);
        }
      case "Rook": // Torre
        for (let i = fromRow + 1; i < 8; i++) {
          if (this.board[i][fromCol] !== undefined) {
            break;
          }
        }
        for (let i = fromRow - 1; i >= 0; i--) {
          if (this.board[i][fromCol] !== undefined) {
            break;
          }
        }
        for (let i = fromCol + 1; i < 8; i++) {
          if (this.board[fromRow][i] !== undefined) {
            break;
          }
        }
        for (let i = fromCol - 1; i >= 0; i--) {
          if (this.board[fromRow][i] !== undefined) {
            break;
          }
        }
        return true;
      case "Knight": // Caballo
        const directions = [
          [2, 1],
          [2, -1],
          [-2, 1],
          [-2, -1],
          [1, 2],
          [1, -2],
          [-1, 2],
          [-1, -2],
        ];
        for (const [dx, dy] of directions) {
          const newRow = fromRow + dx;
          const newCol = fromCol + dy;
          if (
            newRow >= 0 &&
            newRow < 8 &&
            newCol >= 0 &&
            newCol < 8 &&
            this.board[newRow][newCol] !== undefined
          ) {
            return true;
          }
        }
        break;
      case "Bishop": // Bispo
        for (let i = fromRow + 1, j = fromCol + 1; i < 8 && j < 8; i++, j++) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow - 1, j = fromCol - 1; i >= 0 && j >= 0; i--, j--) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow + 1, j = fromCol - 1; i < 8 && j >= 0; i++, j--) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow - 1, j = fromCol + 1; i >= 0 && j < 8; i--, j++) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        return true;
      case "Queen": // Reina
        for (let i = fromRow + 1, j = fromCol + 1; i < 8 && j < 8; i++, j++) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow - 1, j = fromCol - 1; i >= 0 && j >= 0; i--, j--) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow + 1, j = fromCol - 1; i < 8 && j >= 0; i++, j--) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow - 1, j = fromCol + 1; i >= 0 && j < 8; i--, j++) {
          if (this.board[i][j] !== undefined) {
            break;
          }
        }
        for (let i = fromRow + 1; i < 8; i++) {
          if (this.board[i][fromCol] !== undefined) {
            break;
          }
        }
        for (let i = fromRow - 1; i >= 0; i--) {
          if (this.board[i][fromCol] !== undefined) {
            break;
          }
        }
        for (let i = fromCol + 1; i < 8; i++) {
          if (this.board[fromRow][i] !== undefined) {
            break;
          }
        }
        for (let i = fromCol - 1; i >= 0; i--) {
          if (this.board[fromRow][i] !== undefined) {
            break;
          }
        }
        return true;
      case "King": // Rey
        const kingDirections = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [-1, 1],
          [1, -1],
          [-1, -1],
        ];
        for (const [dx, dy] of kingDirections) {
          const newRow = fromRow + dx;
          const newCol = fromCol + dy;
          if (
            newRow >= 0 &&
            newRow < 8 &&
            newCol >= 0 &&
            newCol < 8 &&
            this.board[newRow][newCol] !== undefined
          ) {
            return true;
          }
        }
        break;
      default:
        return false;
    }

    return false;
  }

  isInBounds([x, y]: [number, number]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  private initializeBoard() {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (row === 0) {
          if (col === 0) {
            this.board[row][col] = new Rook("white");
          } else if (col === 1) {
            this.board[row][col] = new Knight("white");
          } else if (col === 2) {
            this.board[row][col] = new Bishop("white");
          } else if (col === 3) {
            this.board[row][col] = new Queen("white");
          } else if (col === 4) {
            this.board[row][col] = new King("white");
          } else if (col === 5) {
            this.board[row][col] = new Bishop("white");
          } else if (col === 6) {
            this.board[row][col] = new Knight("white");
          } else if (col === 7) {
            this.board[row][col] = new Rook("white");
          }
        } else if (row === 1) {
          this.board[row][col] = new Pawn("white");
        } else if (row === 6) {
          this.board[row][col] = new Pawn("black");
        } else if (row === 7) {
          if (col === 0) {
            this.board[row][col] = new Rook("black");
          } else if (col === 1) {
            this.board[row][col] = new Knight("black");
          } else if (col === 2) {
            this.board[row][col] = new Bishop("black");
          } else if (col === 3) {
            this.board[row][col] = new Queen("black");
          } else if (col === 4) {
            this.board[row][col] = new King("black");
          } else if (col === 5) {
            this.board[row][col] = new Bishop("black");
          } else if (col === 6) {
            this.board[row][col] = new Knight("black");
          } else if (col === 7) {
            this.board[row][col] = new Rook("black");
          }
        }
      }
    }
  }
}

export default ChessBoard;
