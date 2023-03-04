import { BoardInterface } from './interfaces/board.interface';

const boardToString = (board: BoardInterface): string => {
  const items = board.pieces();
  const rows: string[] = [];
  for (let row = 0; row < board.rows; row++) {
    let fenRow = '';
    let emptySquares = 0;
    for (let column = 0; column < board.columns; column++) {
      const position = { row, column };
      const piece = `${items.get(position)}`;

      if (piece === '') {
        emptySquares++;
      } else {
        if (emptySquares > 0) {
          fenRow += emptySquares;
          emptySquares = 0;
        }
        fenRow += piece;
      }
    }
    if (emptySquares > 0) {
      fenRow += emptySquares;
    }
    rows.push(fenRow);
  }

  return rows.join('/') + ' ';
};

// const getFenRow = (fenRow: string, emptySquares: number, piece: string): string => {
//   if (piece === '') {
//     emptySquares++;
//   } else {
//     if (emptySquares > 0) {
//       fenRow += emptySquares;
//       emptySquares = 0;
//     }
//     fenRow += piece;
//   }

//   return fenRow;
// };

export default boardToString;
