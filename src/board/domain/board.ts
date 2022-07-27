import createMatrix from '@shared/domain/helpers/create-matrix';
import { Piece } from '@shared/domain/piece';

import { BoardInterface } from '../../@shared/domain/interfaces/board.interface';
import { BoardError } from './board.error';
import { Position } from './position';

type PositionType = Position | { row: number; column: number };

export class Board implements BoardInterface {
  private readonly _pieces: (Piece | null)[][];

  constructor(public readonly rows: number, public readonly columns: number) {
    if (rows < 1 || columns < 1) {
      throw new BoardError('Error creating board: there must be at least 1 row and 1 column');
    }
    this._pieces = createMatrix<Piece>(rows)(columns);
  }

  public piece(position: PositionType): Piece | null {
    this.positionValidate(position);
    const { row, column } = position;
    return this._pieces[row][column];
  }

  private positionValidate(position: PositionType): void {
    if (!position || !this.positionExists(position)) {
      throw new BoardError('Position not on the board');
    }
  }

  public positionExists(position: PositionType): boolean {
    const { row, column } = position;
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  public placePiece(piece: Piece, position: Position): void {
    this.placePieceValidate(position);
    const { row, column } = position;
    this._pieces[row][column] = piece;
    piece.position = position;
  }

  private placePieceValidate(position: PositionType): void {
    if (this.thereIsAPiece(position)) {
      throw new BoardError(`There is already a piece on position ${position}`);
    }
  }

  public thereIsAPiece(position: PositionType): boolean {
    this.positionValidate(position);
    return !!this.piece(position);
  }

  public removePiece(position: PositionType): Piece | null {
    this.positionValidate(position);
    const piece = this.piece(position);
    if (piece) {
      piece.position = null;
      this._pieces[position.row][position.column] = null;
    }
    return piece;
  }
}
