import React from "react";
import styled from "styled-components";
import "./App.css";
import { TreeStatsRoute } from "./routes";

const Header = styled.div`
  padding: 1rem;
`;

function App() {
  return (
    <div className="App">
      <Header>Trees App</Header>
      <TreeStatsRoute />
    </div>
  );
}

export default App;
