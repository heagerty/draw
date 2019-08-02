import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var number = window.prompt("Enter board size: ");

function Square(props) {
    return (
        <button className="square" onMouseOver={props.onMouseOver}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {




    static numberOfRows = number;
    static boardSize = (Board.numberOfRows*Board.numberOfRows);

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(Board.boardSize).fill(null),
            xIsNext: true,
        };
    }

    handleMouseOver(i) {
        const squares = this.state.squares.slice();

        squares[i] =  'X';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onMouseOver={() => this.handleMouseOver(i)}
        />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status = 'Draw something nice';

        }


        // const rows = [];
        // for (var i = 0; i < Board.boardSize; i++) {
        //     rows.push(i);
        // }


        // let boxes = rows.map(function(row) {
        //     return "{this.renderSquare(" + row + ")}"
        // });
        //let boxes = [];
        // for (row of rows) {
        //     boxes.push({this.renderSquare(row)});
        // }

        ///////////////
        let createBoard = () => {
            let table = []

            // Outer loop to create parent
            for (let i = 0; i < Board.numberOfRows; i++) {
                let children = []
                //Inner loop to create children
                for (let j = 0; j < Board.numberOfRows; j++) {
                    children.push(this.renderSquare(i*Board.numberOfRows+j))
                }
                //Create the parent and add the children
                table.push(<div className="board-row">{children}</div>)
            }
            return table
        }
        ///////////////

        return (
            <div>
                <div className="status">{status}</div>
                {createBoard()}


            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

