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
        };
    }

    handleMouseOver(i) {
        const squares = this.state.squares.slice();

        squares[i] =  'X';
        this.setState({
            squares: squares,
        });
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onMouseOver={() => this.handleMouseOver(i)}
        />;
    }

    createBoard = () => {
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

    render() {

        const status = 'Draw something nice';

        return (
            <div>
                <div className="status">{status}</div>
                {this.createBoard()}
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
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

