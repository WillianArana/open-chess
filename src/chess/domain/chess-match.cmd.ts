import { ChessMatch } from './chess-match';
import { Column } from './chess-position';
import { Color } from './color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

export class ChessMatchCMD extends ChessMatch {
  //@Override
  protected placeWhitePieces(): void {
    const board = this.board;
    const color = Color.White;
    this.placeNewPiece('a', 1, new Rook(board, color));
    this.placeNewPiece('b', 1, new Knight(board, color));
    this.placeNewPiece('c', 1, new Bishop(board, color));
    this.placeNewPiece('d', 1, new Queen(board, color));
    this.placeNewPiece('e', 1, new King(board, color, this));
    this.placeNewPiece('f', 1, new Bishop(board, color));
    this.placeNewPiece('g', 1, new Knight(board, color));
    this.placeNewPiece('h', 1, new Rook(board, color));

    for (const column of 'abcdefgh') {
      this.placeNewPiece(column as Column, 2, new Pawn(board, color, this));
    }
  }

  //@Override
  protected placeBlackPieces(): void {
    const board = this.board;
    const color = Color.Black;
    this.placeNewPiece('a', 8, new Rook(board, color));
    this.placeNewPiece('b', 8, new Knight(board, color));
    this.placeNewPiece('c', 8, new Bishop(board, color));
    this.placeNewPiece('d', 8, new Queen(board, color));
    this.placeNewPiece('e', 8, new King(board, color, this));
    this.placeNewPiece('f', 8, new Bishop(board, color));
    this.placeNewPiece('g', 8, new Knight(board, color));
    this.placeNewPiece('h', 8, new Rook(board, color));

    for (const column of 'abcdefgh') {
      this.placeNewPiece(column as Column, 7, new Pawn(board, color, this));
    }
  }
}
