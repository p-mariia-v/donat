import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { PieChart } from "./components/PieChart.jsx";
import { data } from "./data/data.js";

function App() {
  const [count, setCount] = useState(0);
  const width = 600;
  const height = 400;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1>My first Pie and Donat charts</h1>
      <PieChart data={data} width={width} height={height} inRadius={0} />
      <PieChart data={data} width={width} height={height} inRadius={100} />
    </div>
  );
}

export default App;
