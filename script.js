var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0);
};
function isPossible(board,i,j,num){
    for(let x=0;x<9;x++){
        if(board[i][x]==num){
            return false;
        }
    }
        for(let x=0;x<9;x++){
        if(board[x][j]==num){
            return false;
        }
    }
    
    let matrow=i-i%3;
    let matcol=j-j%3;
    for(let x=matrow;x<matrow+3;x++){
        for(let y=matcol;y<matcol+3;y++){
            if(board[x][y]==num)return false;
        }
    }
    return true;

}

function SudokuSolver(board, i, j) {
    if(i==9){
        FillBoard(board);
        return true;
    }
    if(j==9){
        return SudokuSolver(board,i+1,0);
        }
    if(board[i][j]!=0){
        return SudokuSolver(board,i,j+1);
    }
    
    
       for( let num=1;num<=9;num++){
                if(isPossible(board,i,j,num)){
                    board[i][j]=num;
                   if( SudokuSolver(board,i,j+1))return true;
                    board[i][j]=0;
                
                }
            }
    return false;
        
    
    

}
