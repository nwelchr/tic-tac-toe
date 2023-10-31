import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

const Background = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
  border: 2px solid #333;
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

const stateToCellMap = {
  0: "",
  1: "X",
  2: "O",
};

const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function App() {
  const [grid, setGrid] = useState(initialState);
  const [currPlayer, setCurrPlayer] = useState(1);

  const checkIfCurrPlayerWon = () => {
    const currPlayerCells = grid.reduce((acc, cell, idx) => {
      if (cell === currPlayer) acc.push(idx);
      return acc;
    }, []);
  };

  const takeTurn = (idx) => {
    if (grid[idx] !== 0) return;
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[idx] = currPlayer;
      return newGrid;
    });
  };

  useEffect(() => {
    checkIfCurrPlayerWon();
    setCurrPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  }, [grid]);

  return (
    <Background>
      <Grid>
        {grid.map((val, idx) => (
          <Cell key={idx} onClick={() => takeTurn(idx)}>
            {stateToCellMap[val]}
          </Cell>
        ))}
      </Grid>
    </Background>
  );
}

export default App;
