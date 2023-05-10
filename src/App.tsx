import "./App.css";
import SideNav from "./components/SideNav";
import { useState } from "react";
import Login from "./components/Login";
import Dijelovi from "./components/Dijelovi";

function App() {
  const [login, setLogin] = useState(localStorage.getItem("login"));

  if (login !== "1") {
    return <Login setLogin={setLogin} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20rem" }}>
        <SideNav setLogin={setLogin} />
      </div>
      <div
        style={{
          width: "calc(100% - 20rem)",
          margin: "2.5rem",
        }}
      >
        <Dijelovi />
      </div>
    </div>
  );
}

export default App;
