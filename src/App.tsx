import "./App.css";
import DatabaseTable from "./components/DatabaseTable";
import SideNav from "./components/SideNav";
import { useState } from "react";
import { Simulate } from "react-dom/test-utils";
import Login from "./components/Login";

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
        <DatabaseTable
          name={"Dijelovi"}
          labels={["sifraDijela", "nazivDijela", "kolicinaNaLageru"]}
        />
      </div>
    </div>
  );
}

export default App;
