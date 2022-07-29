import { Position } from '@src/board/domain/position';

import { BoardInterface } from '@shared/domain/interfaces/board.interface';
import { Piece } from '@shared/domain/piece';

import { Color } from './color';

export abstract class ChessPiece extends Piece {
  public readonly color: Color;
  constructor(board: BoardInterface, color: Color) {
    super(board);
    this.color = color;
  }

  public get isWhite(): boolean {
    return this.color === Color.White;
  }

  protected setPossibleMoves(
    possibleMoves: boolean[][],
    createPosition: (row: number, column: number) => Position
  ): void {
    const piecePosition = this.position as Position;
    let position = createPosition(piecePosition.row, piecePosition.column);
    while (this.canMoveInEmptyPosition(position)) {
      const { row, column } = position;
      possibleMoves[row][column] = true;
      position = createPosition(row, column);
    }
    if (this.canMoveInOpponentPosition(position)) {
      possibleMoves[position.row][position.column] = true;
    }
  }

  protected canMoveInEmptyPosition(position: Position): boolean {
    return this.board.positionExists(position) && !this.board.thereIsAPiece(position);
  }

  protected canMoveInOpponentPosition(position: Position): boolean {
    return this.board.positionExists(position) && this.isThereOpponentPiece(position);
  }

  protected isThereOpponentPiece(position: Position): boolean {
    const piece = this.board.piece(position) as ChessPiece | null;
    return piece?.color !== this.color;
  }
}
