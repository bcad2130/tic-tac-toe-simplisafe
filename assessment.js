/*
The 'board' object must be a 0-indexed 4x4 matrix (2D-Array), with a character (or NULL) in each cell.
The scorable values are 'X' and 'O'. 
Any other character (lower-case, another character, a blank space, or NULL) are treated as an empty cell.

board = [	
			["O", "", "", "X"],
        	["O", "", "X", ""],
        	["O", "X", "", ""],
        	["X", "O", "", ""]
        ];

I performed testing by passing different boards (like the above) to my functions, and confirming the winners.

I chose to make the functions static since we do not need an instance of TicTacToe.
The TicTacToe class will process any 'board' it is passed. (e.g. TicTacToe.checkWinner(exampleBoard); )
*/

class TicTacToe {

	// Check all win conditions for current board.
	// Return 'X' if the X Player has won, Return 'O' if the O Player has won, or return NULL if neither player has won.
	static checkWinner(board) {

		// Four Corners win check
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

		// Use these trackers to check the win state. 
		// They will be set to false if the method sees that a win possibility is eliminated.
		
		// Vertical Wins trackers
		let columnWinsX = [true, true, true, true];
		let columnWinsO = [true, true, true, true];

		// Horizontal Wins trackers
		let rowWinsX = [true, true, true, true];
		let rowWinsO = [true, true, true, true];

		// Diagonal Wins trackers
		let diagonalLeftRightWinsX = true;
		let diagonalRightLeftWinsX = true;

		let diagonalLeftRightWinsO = true;
		let diagonalRightLeftWinsO = true;

		// Loop through rows
		for (let i = 0; i < 4; i++) {

			// Diagonal win check (from top left corner down)
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

			// Diagonal win check (from top right corner down)
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

			// Loop through columns
			for (let j = 0; j < 4; j++) {

				// Row and Column win check
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

			    // 2x2 Box win check
			    if (i < 3 && j < 3) {
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
		}

		// Diagonal wins return (if any are still true, we have a winner)
		if (diagonalLeftRightWinsX || diagonalRightLeftWinsX) {
			return 'X';
		} else if (diagonalLeftRightWinsO || diagonalRightLeftWinsO) {
			return 'O';
		}

		// Row and Column wins return (if any are still true, we have a winner)
        if (columnWinsO.includes(true) || rowWinsO.includes(true)) {
            return 'O';
    	} else if (columnWinsX.includes(true) || rowWinsX.includes(true)) {
    	    return 'X';
    	}

    	// No winner, return null
    	return null;
	}

	// Returns bool TRUE if there are moves left or bool FALSE if there are no moves left to make.
	static anyMovesLeft(board) {
		// Navigate through rows
		for (let i = 0; i < 4; i++) {
			// Navigate through columns
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
		// Check if the game is over by a player's victory
		let winner = this.checkWinner(board);
		if (winner === 'X' || winner === 'O') {
			return true;
		}

		// Check if the game is over by filling up the board with pieces
		if (!this.anyMovesLeft(board)) {
			return true;
		}

		// If no winner and still moves left, the game is not over
		return false
	}
}
