import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { Matrix } from '@shared/domain/matrix/matrix';
import { Piece } from '@shared/domain/piece';

import { ChessPiece } from './chess-piece';
import { ChessPosition, Column, Row } from './chess-position';
import { ChessError } from './chess.error';
import { Color } from './color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';
import ROWS_AMOUNT from './rows-amount';

const COLUMN_AMOUNT = ROWS_AMOUNT;
const switchPlayer = {
  [Color.Black]: Color.White,
  [Color.White]: Color.Black,
};

export class ChessMatch {
  public readonly piecesOnTheBoard: ChessPiece[] = [];
  public readonly capturedPieces: ChessPiece[] = [];

  private readonly _board = new Board(ROWS_AMOUNT, COLUMN_AMOUNT);
  private _turn = 1;
  private _currentPlayer = Color.White;
  private _check = false;
  private _checkMate = false;

  constructor() {
    this.initialSetup();
  }

  get turn(): number {
    return this._turn;
  }

  get currentPlayer(): Color {
    return this._currentPlayer;
  }

  get isCheck(): boolean {
    return this._check;
  }

  get isCheckMate(): boolean {
    return this._checkMate;
  }

  protected get board(): Board {
    return this._board;
  }

  public pieces(): Matrix<ChessPiece> {
    const { rows, columns } = this._board;
    const chessPieces = new Matrix<ChessPiece>(rows, columns);
    const pieces = this._board.pieces();
    chessPieces.fill(pieces as Matrix<ChessPiece>);
    return chessPieces;
  }

  protected initialSetup(): void {
    this.placeWhitePieces();
    this.placeBlackPieces();
  }

  private placeWhitePieces(): void {
    const board = this._board;
    this.placeNewPiece('a', 1, new Rook(board, Color.White));
    this.placeNewPiece('b', 1, new Knight(board, Color.White));
    this.placeNewPiece('c', 1, new Bishop(board, Color.White));
    this.placeNewPiece('d', 1, new Queen(board, Color.White));
    this.placeNewPiece('e', 1, new King(board, Color.White));
    this.placeNewPiece('f', 1, new Bishop(board, Color.White));
    this.placeNewPiece('g', 1, new Knight(board, Color.White));
    this.placeNewPiece('h', 1, new Rook(board, Color.White));
    this.placeNewPiece('a', 2, new Pawn(board, Color.White));
    this.placeNewPiece('b', 2, new Pawn(board, Color.White));
    this.placeNewPiece('c', 2, new Pawn(board, Color.White));
    this.placeNewPiece('d', 2, new Pawn(board, Color.White));
    this.placeNewPiece('e', 2, new Pawn(board, Color.White));
    this.placeNewPiece('f', 2, new Pawn(board, Color.White));
    this.placeNewPiece('g', 2, new Pawn(board, Color.White));
    this.placeNewPiece('h', 2, new Pawn(board, Color.White));
  }

  private placeBlackPieces(): void {
    const board = this._board;
    this.placeNewPiece('a', 8, new Rook(board, Color.Black));
    this.placeNewPiece('b', 8, new Knight(board, Color.Black));
    this.placeNewPiece('c', 8, new Bishop(board, Color.Black));
    this.placeNewPiece('d', 8, new Queen(board, Color.Black));
    this.placeNewPiece('e', 8, new King(board, Color.Black));
    this.placeNewPiece('f', 8, new Bishop(board, Color.Black));
    this.placeNewPiece('g', 8, new Knight(board, Color.Black));
    this.placeNewPiece('h', 8, new Rook(board, Color.Black));
    this.placeNewPiece('a', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('b', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('c', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('d', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('e', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('f', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('g', 7, new Pawn(board, Color.Black));
    this.placeNewPiece('h', 7, new Pawn(board, Color.Black));
  }

  protected placeNewPiece(column: Column, row: Row, piece: ChessPiece): void {
    const position = new ChessPosition(column, row).toPosition();
    this._board.placePiece(piece, position);
    this.piecesOnTheBoard.push(piece);
  }

  public possibleMoves(sourcePosition: ChessPosition): Matrix<boolean> {
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
    const capturedPiece = this.makeMove(source, target) as ChessPiece | null;
    this.addPossibleCapturedPiece(capturedPiece);
    this.verifyIfPutYourselfInCheck(source, target, capturedPiece);
    this.loadStatus();
    this.isCheckMate || this.nextTurn();
    return capturedPiece;
  }

  private validateSourcePosition(position: Position): void {
    if (!this._board.thereIsAPiece(position)) {
      throw new ChessError('There is no piece on source position');
    }
    const piece = this._board.piece(position) as ChessPiece;
    if (this._currentPlayer !== piece.color) {
      throw new ChessError('The chosen piece is not yours');
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
    const piece = this._board.removePiece(source) as ChessPiece;
    piece.increaseMoveCount();
    const capturedPiece = this._board.removePiece(target);
    this._board.placePiece(piece, target);
    return capturedPiece;
  }

  private addPossibleCapturedPiece(piece: ChessPiece | null): void {
    if (piece) {
      this.capturedPieces.push(piece);
      const index = this.piecesOnTheBoard.indexOf(piece);
      if (index > -1) {
        this.piecesOnTheBoard.splice(index, 1);
      }
    }
  }

  private verifyIfPutYourselfInCheck(
    source: Position,
    target: Position,
    capturedPiece: ChessPiece | null
  ): void {
    if (this.testCheck(this._currentPlayer)) {
      this.undoMove(source, target, capturedPiece);
      throw new ChessError(`You can't put yourself in check`);
    }
  }

  private loadStatus(): void {
    const opponent = this.opponent(this._currentPlayer);
    this._check = this.testCheck(opponent);
    this._checkMate = this._check && this.testCheckMate(opponent);
  }

  private testCheck(color: Color): boolean {
    const position = this.king(color).chessPosition.toPosition();
    const opponentPieces = this.piecesOnTheBoard.filter((p) => p.color === this.opponent(color));
    const isCheck = opponentPieces.some((p) => p.possibleMoves().get(position));
    return isCheck;
  }

  private undoMove(source: Position, target: Position, capturedPiece: ChessPiece | null): void {
    const piece = this._board.removePiece(target) as ChessPiece;
    this._board.placePiece(piece, source);

    if (capturedPiece) {
      capturedPiece.decreaseMoveCount();
      this._board.placePiece(capturedPiece, target);
      this.removeCapturedPiece(capturedPiece);
    }
  }

  private removeCapturedPiece(piece: ChessPiece): void {
    this.piecesOnTheBoard.push(piece);
    const index = this.capturedPieces.indexOf(piece);
    if (index > -1) {
      this.capturedPieces.splice(index, 1);
    }
  }

  private nextTurn(): void {
    this._turn++;
    this._currentPlayer = this.opponent(this._currentPlayer);
  }

  private opponent(color: Color): Color {
    return switchPlayer[color];
  }

  private king(color: Color): ChessPiece {
    return this.piecesOnTheBoard.find((p) => p instanceof King && p.color === color) as ChessPiece;
  }

  private testCheckMate(color: Color): boolean {
    return !this.piecesOnTheBoard.some(
      (p) => p.color === color && this.tryPullOutCheckMate(color, p)
    );
  }

  private tryPullOutCheckMate(color: Color, piece: ChessPiece): boolean {
    const possibleMoves = piece.possibleMoves();
    for (let row = 0; row < this._board.rows; row++) {
      for (let column = 0; column < this._board.columns; column++) {
        if (possibleMoves.get({ row, column })) {
          const target = new Position(row, column);
          const isCheck = this.testMoveToPullOutCheckMate(color, piece, target);
          if (!isCheck) return true;
        }
      }
    }
    return false;
  }

  private testMoveToPullOutCheckMate(color: Color, piece: ChessPiece, target: Position): boolean {
    const source = piece.chessPosition.toPosition();
    const capturedPiece = this.makeMove(source, target) as ChessPiece | null;
    const testCheck = this.testCheck(color);
    this.undoMove(source, target, capturedPiece);
    return testCheck;
  }
}
