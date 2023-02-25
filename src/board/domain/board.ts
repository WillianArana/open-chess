import { PositionInterface } from '@shared/domain/interfaces/position.interface';
import { Matrix } from '@shared/domain/matrix';
import { Piece } from '@shared/domain/piece';

import { BoardInterface } from '../../@shared/domain/interfaces/board.interface';
import { BoardError } from './board.error';

type PieceType = Piece & { position: PositionInterface | null };

export class Board implements BoardInterface {
  readonly #pieces: Matrix<Piece | null>;

  constructor(public readonly rows: number, public readonly columns: number) {
    this.#pieces = new Matrix<Piece>(rows, columns);
  }

  public pieces(): Matrix<Piece | null> {
    return this.#pieces;
  }

  public piece(position: PositionInterface): Piece | null {
    this.positionValidate(position);
    return this.#pieces.get(position);
  }

  private positionValidate(position: PositionInterface): void {
    if (!position || !this.positionExists(position)) {
      throw new BoardError('Position not on the board');
    }
  }

  public positionExists(position: PositionInterface): boolean {
    const { row, column } = position;
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  public placePiece(piece: Piece, position: PositionInterface): void {
    this.placePieceValidate(position);
    this.#pieces.set(piece, position);
    (piece as PieceType).position = position;
  }

  private placePieceValidate(position: PositionInterface): void {
    if (this.thereIsAPiece(position)) {
      throw new BoardError(`There is already a piece on position ${position}`);
    }
  }

  public thereIsAPiece(position: PositionInterface): boolean {
    this.positionValidate(position);
    return !!this.piece(position);
  }

  public removePiece(position: PositionInterface): Piece | null {
    this.positionValidate(position);
    const piece = this.piece(position);
    if (piece) {
      (piece as PieceType).position = null;
      this.#pieces.set(null, position);
    }
    return piece;
  }
}
