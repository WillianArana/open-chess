import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import createMatrix from '@shared/domain/helpers/create-matrix';
import { Piece } from '@shared/domain/piece';

import { ChessPiece } from './chess-piece';
import { ChessPosition, Column, Row } from './chess-position';
import { ChessError } from './chess.error';
import { Color } from './color';
import { King } from './pieces/king';
import { Rook } from './pieces/rook';
import ROWS_AMOUNT from './rows-amount';

const COLUMN_AMOUNT = ROWS_AMOUNT;

export class ChessMatch {
  private readonly _board: Board;

  constructor() {
    this._board = new Board(ROWS_AMOUNT, COLUMN_AMOUNT);
    this.initialSetup();
  }

  public pieces(): ChessPiece[][] {
    const { rows, columns } = this._board;
    const matrix = createMatrix<ChessPiece>(rows)(columns);
    this.fillPieces(matrix);
    return matrix;
  }

  private fillPieces(pieces: ChessPiece[][]): void {
    const { rows, columns } = this._board;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        pieces[i][j] = this._board.piece({ row: i, column: j }) as ChessPiece;
      }
    }
  }

  private initialSetup(): void {
    const board = this._board;

    //#region WHITE PIECES
    this.placeNewPiece('e', 1, new King(board, Color.White));
    this.placeNewPiece('e', 2, new Rook(board, Color.White));
    //#endregion

    //#region BLACK PIECES
    this.placeNewPiece('e', 8, new King(board, Color.Black));
    this.placeNewPiece('b', 6, new Rook(board, Color.White));
    //#endregion
  }

  private placeNewPiece(column: Column, row: Row, piece: ChessPiece): void {
    const position = new ChessPosition(column, row).toPosition();
    this._board.placePiece(piece, position);
  }

  public possibleMoves(sourcePosition: ChessPosition): boolean[][] {
    const position = sourcePosition.toPosition();
    this.validateSourcePosition(position);
    return (this._board.piece(position) as Piece).possibleMoves();
  }

  public performChessMove(
    sourcePosition: ChessPosition,
    targetPosition: ChessPosition
  ): ChessPiece | null {
    const source = sourcePosition.toPosition();
    const target = targetPosition.toPosition();
    this.validateSourcePosition(source);
    this.validateTargetPosition(source, target);
    return this.makeMove(source, target) as ChessPiece | null;
  }

  private validateSourcePosition(position: Position): void {
    if (!this._board.thereIsAPiece(position)) {
      throw new ChessError('There is no piece on source position');
    }
    if (!this._board.piece(position)?.isThereAnyPossibleMove()) {
      throw new ChessError('There is no possible moves for the chosen piece');
    }
  }

  private validateTargetPosition(source: Position, target: Position): void {
    if (!this._board.piece(source)?.possibleMove(target)) {
      throw new ChessError(`There chose piece can't move to target position`);
    }
  }

  private makeMove(source: Position, target: Position): Piece | null {
    const piece = this._board.removePiece(source) as Piece;
    const capturedPiece = this._board.removePiece(target);
    this._board.placePiece(piece, target);
    return capturedPiece;
  }
}
