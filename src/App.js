import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const Background = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WinnerText = styled.h1`
  padding: 10px;
  position: absolute;
  top: -120px;
  font-size: 3rem;
  font-weight: 300;
`;

const PlayerText = styled(WinnerText)`
  color: ${({ player }) => (player === 1 ? "fuchsia" : "turquoise")};
  opacity: 0.8;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  pointer-events: ${({ isGameActive }) => (isGameActive ? "auto" : "none")};
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  cursor: pointer;
  font-size: 3rem;
  color: ${({ children }) => (children === "X" ? "fuchsia" : "turquoise")};
`;

const PlayAgainButton = styled.button`
  border: 1px solid #eee;
  background-color: #111;
  font-size: 2rem;
  color: #eee;
  padding: 10px;
  margin: 20px;
  position: absolute;
  bottom: -100px;
  cursor: pointer;

  &:hover {
    filter: brightness(3);
  }
`;

const stateToCellMap = {
  0: "",
  1: "X",
  2: "O",
};

const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [grid, setGrid] = useState(initialState);
  const [currPlayer, setCurrPlayer] = useState(1);
  const [winner, setWinner] = useState("");

  const isCurrPlayerWinner = (gameGrid, player) => {
    const playerCells = gameGrid.reduce((acc, cellState, gridIdx) => {
      if (cellState === player) acc.push(gridIdx);
      return acc;
    }, []);
    return winningPatterns.some((combination) =>
      combination.every((val) => playerCells.includes(val))
    );
  };

  const takeTurn = (gridIdx) => {
    if (grid[gridIdx] !== 0) return;
    const newGrid = [...grid];
    newGrid[gridIdx] = currPlayer;
    setGrid(newGrid);

    if (isCurrPlayerWinner(newGrid, currPlayer)) {
      setWinner(currPlayer);
    } else if (newGrid.every((cellState) => cellState !== 0)) {
      setWinner("tie");
    } else {
      setCurrPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    }
  };

  const restart = () => {
    setGrid(initialState);
    setCurrPlayer(winner === 1 ? 2 : 1);
    setWinner("");
  };

  return (
    <Background>
      <GameContainer>
        {winner ? (
          <WinnerText>
            {winner === "tie" ? "It's a tie!" : `Player ${winner} won!`}
          </WinnerText>
        ) : (
          <PlayerText player={currPlayer}>
            Player {currPlayer}'s turn
          </PlayerText>
        )}
        <Grid isGameActive={!winner}>
          {grid.map((cellState, gridIdx) => (
            <Cell key={gridIdx} onClick={() => takeTurn(gridIdx)}>
              {stateToCellMap[cellState]}
            </Cell>
          ))}
        </Grid>
        {winner && (
          <PlayAgainButton onClick={restart}>Play Again?</PlayAgainButton>
        )}
      </GameContainer>
    </Background>
  );
}

export default App;
