class TicTacToe {

	/*
	The 'board' object must be a 0-indexed 4x4 matrix, with a character in each cell.
	The scorable values are 'X' and 'O'. 
	Any other character (lower-case, another character, a blank space, or NULL) are treated as an empty cell.
	*/


	// Check all win conditions for current board.
	// Return 'X' if the X Player has won, Return 'O' if the O Player has won, or return NULL if neither player has won.
	static checkWinner(board) {

		// Diagonal Win
		let diagonalLeftRightWinsX = true;
		let diagonalRightLeftWinsX = true;

		let diagonalLeftRightWinsO = true;
		let diagonalRightLeftWinsO = true;


		for (let i = 0; i < 4; i++) {
			switch (board[i][i]) {
				case 'X':
					diagonalLeftRightWinsO = false;
					break;
				case 'O':
					diagonalLeftRightWinsX = false;
					break;
				default:
					diagonalLeftRightWinsO = false;
					diagonalLeftRightWinsX = false;
			}

			switch (board[i][3-i]) {
				case 'X':
					diagonalRightLeftWinsO = false;
					break;
				case 'O':
					diagonalRightLeftWinsX = false;
					break;
				default:
					diagonalRightLeftWinsO = false;
					diagonalRightLeftWinsX = false;
			}
		}

		if (diagonalLeftRightWinsX || diagonalRightLeftWinsX) {
			return 'X';
		}

		if (diagonalLeftRightWinsO || diagonalRightLeftWinsO) {
			return 'O';
		}

		// Four Corners Win
		if (board[0][0] === 'X' && 
			board[0][3] === 'X' &&
			board[3][0] === 'X' &&
			board[3][3] === 'X') {
			return 'X';
		}

		if (board[0][0] === 'O' && 
			board[0][3] === 'O' &&
			board[3][0] === 'O' &&
			board[3][3] === 'O') {
			return 'O';
		}

		// Vertical Win
		let columnWinsX = [true, true, true, true];
		let columnWinsO = [true, true, true, true];

		// Horizontal Win
		let rowWinsX = [true, true, true, true];
		let rowWinsO = [true, true, true, true];

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {

			    switch (board[i][j]) {

			        case 'X':
			    		rowWinsO[i] = false;
			            columnWinsO[j] = false;
			            break;

			        case 'O':
			            rowWinsX[i] = false;
			            columnWinsX[j] = false;
			            break;

			        default:
			            rowWinsX[i] = false;
			            rowWinsO[i] = false;
			            columnWinsX[j] = false;
			            columnWinsO[j] = false;
			    }
			}
		}

        if (columnWinsO.includes(true) || rowWinsO.includes(true)) {
            return 'O';
    
    	} else if (columnWinsX.includes(true) || rowWinsX.includes(true)) {
    	    return 'X';
    	}

		// 2x2 Box
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] === 'X' && 
					board[i+1][j] === 'X' &&
					board[i][j+1] === 'X' &&
					board[i+1][j+1] === 'X') {
					return 'X';
				}

				if (board[i][j] === 'O' && 
					board[i+1][j] === 'O' &&
					board[i][j+1] === 'O' &&
					board[i+1][j+1] === 'O') {
					return 'O';
				}
			}
		}

    	// No winner, return null
    	return null;
	}

	// Returns bool TRUE if there are moves left or bool FALSE if there are no moves left to make.
	static anyMovesLeft(board) {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (board[i][j] != 'X' && board[i][j] != 'O') {
					return true;
				}
			}
		}

		// If every cell is an X or O, then the board is full and there are no moves left.
		return false;
	}

	// Check if there is a winner on the board. If not, check if there are any moves left to make. If either are true, the
	static isGameOver(board) {
		// let winner = checkWinner(board);
		// if (winner === 'X' || winner === 'O') {
		// 	return true;
		// }

		// TODO check if this is the correct way to pass a method to a switch statement
		switch (winner = checkWinner(board)) {
			case 'X':
				// X wins!
			case 'O':
				// O wins!
				return true;
				break;
			default:
				// No winner (yet)
		}

		if (!anyMovesLeft(board)) {
			return true;
		}

		// If no winner and still moves left, the game is not over
		return false
	}
}
