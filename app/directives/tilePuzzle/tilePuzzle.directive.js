(function () {
    'use strict';

    angular
        .module('app')
        .directive('abtTilePuzzle', tilePuzzleDirective);

    function tilePuzzleDirective() {
        return {
            restrict: 'E',
            scope: {
            },
            controller: tilePuzzleController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: '/app/directives/tilePuzzle/tilePuzzle.html'
        }
    };

    tilePuzzleController.$inject = ['$log', '$window', '$timeout'];

    function tilePuzzleController($log, $window, $timeout) {
        var vm = this;
        
        //Fields
        vm.rows = 5;
        vm.cols = 5;
        vm.won = false;
        
        vm.blankPiece = {
        	row: vm.rows - 1,
        	col: vm.cols - 1
        };
        
        vm.puzzle = null;
        
        //Methods
        vm.clickedTile = clickedTile;
        vm.playAgain = playAgain;
        vm.shuffle = shuffle;
        
        activate();

        return vm;
        //////////
        
        function activate() {
        	vm.puzzle = createPuzzleBoard(vm.rows, vm.cols);
        	scramblePuzzle();
        }
        
        function getRandomBetween(from, to) {
        	return Math.floor((Math.random() * to) + from);
        }
        
        function shuffle() {
        	if(vm.won)
        		return;
        		
        	scramblePuzzle();	
        }
        
        function scramblePuzzle() {
    		for(var i = 0; i < 5000; i++) {
    			var direction = getRandomBetween(1, 4);
    			
    			switch(direction) {
    				case 1: //above
    					if(adjacentToBlankPiece(vm.blankPiece.row - 1, vm.blankPiece.col))
    						swapWithBlankPiece(vm.blankPiece.row - 1, vm.blankPiece.col);
    					break;
    				case 2: //below
    					if(adjacentToBlankPiece(vm.blankPiece.row + 1, vm.blankPiece.col))
    						swapWithBlankPiece(vm.blankPiece.row + 1, vm.blankPiece.col);
    					break;
					case 3: //left
    					if(adjacentToBlankPiece(vm.blankPiece.row, vm.blankPiece.col - 1))
    						swapWithBlankPiece(vm.blankPiece.row, vm.blankPiece.col - 1);
						break;
					case 4: //right
    					if(adjacentToBlankPiece(vm.blankPiece.row, vm.blankPiece.col + 1))
    						swapWithBlankPiece(vm.blankPiece.row, vm.blankPiece.col + 1);
						break;
    			}
    		}    
        }
        
        function clickedTile(row, col) {
        	$log.log(row + "-" + col);
        	
        	if(vm.won)
        		return;
        	
        	if(!adjacentToBlankPiece(row, col)) {
        		$log.log("not adjacent to blank piece");
        		return;
        	}
        	
        	swapWithBlankPiece(row, col);
        	
        	if(isWinState())
        		handleWin();
        }
        
        function isWinState() {
     		for(var y = 0; y < vm.rows; y++) {
     			for(var x = 0; x < vm.cols; x++) {
     				if(y == vm.rows - 1 && x == vm.cols - 1)
     					continue;
     				if(vm.puzzle[y][x] != vm.cols*y + x + 1)
     					return false;
     			}
     		}
     		
     		return true;
        }
        
        function handleWin() {
        	vm.won = true;
        	$timeout(function() { $window.alert("You win!"); }, 100);
        }
        
        function playAgain() {
        	scramblePuzzle();
        	vm.won = false;
        }
        
        function swapWithBlankPiece(row, col) {
   			var pieceValue = vm.puzzle[row][col];
   			
   			vm.puzzle[row][col] = vm.puzzle[vm.blankPiece.row][vm.blankPiece.col];
   			vm.puzzle[vm.blankPiece.row][vm.blankPiece.col] = pieceValue;
   			
   			vm.blankPiece.row = row;
   			vm.blankPiece.col = col;
        }
        
        function adjacentToBlankPiece(row, col) {        	
        	if(row == vm.blankPiece.row && col == vm.blankPiece.col)
        		return false;
        		
        	if(row < 0 || row > vm.rows - 1 || col < 0 || col > vm.cols - 1)
        		return false;	
        		
			if(((row == vm.blankPiece.row - 1 || row == vm.blankPiece.row + 1) && col == vm.blankPiece.col)
				|| ((col == vm.blankPiece.col - 1 || col == vm.blankPiece.col + 1) && row == vm.blankPiece.row))
				return true;       		
        	
        	return false;
        }
        
        function createPuzzleBoard(rows, cols) {
        	var board = [[], [], [], [], []];
        	for(var y = 0; y < rows; y++) {
        		for(var x = 0; x < cols; x++) {
        			if(x == vm.blankPiece.col && y == vm.blankPiece.row)
        				board[y][x] = null;
        			else
        				board[y][x] = rows*y + x + 1;
        		}
        	}
        	return board;
        }
    }
})();