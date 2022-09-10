import { Position } from '@src/board/domain/position';

import { BoardInterface } from '@shared/domain/interfaces/board.interface';
import { Matrix } from '@shared/domain/matrix';
import { Piece } from '@shared/domain/piece';

import { ChessPosition } from './chess-position';
import { Color } from './color';

export abstract class ChessPiece extends Piece {
  public readonly color: Color;
  private _moveCount = 0;
  constructor(board: BoardInterface, color: Color) {
    super(board);
    this.color = color;
  }

  public get isWhite(): boolean {
    return this.color === Color.White;
  }

  public get chessPosition(): ChessPosition {
    const piecePosition = this.position as Position;
    return ChessPosition.fromPosition(piecePosition);
  }

  public get moveCount(): number {
    return this._moveCount;
  }

  public increaseMoveCount(): void {
    this._moveCount++;
  }

  public decreaseMoveCount(): void {
    this._moveCount--;
  }

  protected setPossibleMoves(
    possibleMoves: Matrix<boolean>,
    createPosition: (row: number, column: number) => Position
  ): void {
    if (this.position) {
      let position = createPosition(this.position.row, this.position.column);
      while (this.canMoveInEmptyPosition(position)) {
        possibleMoves.set(true, position);
        position = createPosition(position.row, position.column);
      }
      if (this.canMoveInOpponentPosition(position)) {
        possibleMoves.set(true, position);
      }
    }
  }

  protected canMoveInEmptyPosition(position: Position): boolean {
    return this.board.positionExists(position) && !this.board.thereIsAPiece(position);
  }

  protected canMoveInOpponentPosition(position: Position): boolean {
    return this.board.positionExists(position) && this.isThereOpponentPiece(position);
  }

  private isThereOpponentPiece(position: Position): boolean {
    const piece = this.board.piece(position) as ChessPiece | null;
    return !!piece && piece.color !== this.color;
  }
}
