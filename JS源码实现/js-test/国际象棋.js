/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
    let R = {
        x: 0,
        y: 0
    };
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++ ) {
            if(board[i][j] === 'R') {
                R.x = i;
                R.y = j;
                break;
            }
        }
    }

    let total = 0;

    // 上
    for (let i = R.x - 1; i >= 0; i--) {
        if (board[i][R.y] === 'B') {
            break;
        } else if(board[i][R.y] === 'p') {
            total += 1;
            break;
        }
    }
    console.log(total, 'top')

    // 下
    for (let i = R.x + 1; i < board.length ; i++) {
        if (board[i][R.y] === 'B') {
            break;
        } else if(board[i][R.y] === 'p') {
            total += 1;
            break;
        }
    }
       console.log(total, 'bottom')

    // 左
    for (let j = R.y - 1; j >= 0 ; j--) {
        if (board[R.x][j] === 'B') {
            break;
        } else if(board[R.x][j] === 'p') {
            total += 1;
            break;
        }
    }
       console.log(total, 'left')
    // 右
     for (let j = R.y + 1; j < board[R.x].length ; j++) {
        if (board[R.x][j] === 'B') {
            break;
        } else if(board[R.x][j] === 'p') {
            total += 1;
            break;
        }
    }
       console.log(total, 'right')

    return total;


};

numRookCaptures([[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]])