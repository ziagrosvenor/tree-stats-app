import React from "react";
import styled from "styled-components";
import "./App.css";
import { TreeStatsPage } from "./pages";

const Header = styled.div`
  padding: 1rem;
`;

function App() {
  return (
    <div className="App">
      <Header>Trees App</Header>
      <TreeStatsPage />
    </div>
  );
}

export default App;
