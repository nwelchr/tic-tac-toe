import styled, { createGlobalStyle } from "styled-components";
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
  font-size: 2rem;
`;

function App() {
  return (
    <Background>
      <Grid>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
        <Cell>Hello</Cell>
      </Grid>
    </Background>
  );
}

export default App;
