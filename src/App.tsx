import "./App.css";
import SideNav from "./components/SideNav";
import { useState } from "react";
import Dijelovi from "./components/Dijelovi";
import Projekti from "./components/Projekti";

type ITab = "Dijelovi" | "Alati" | "Strojevi" | "Projekti" | undefined;

function App() {
  const [selectedTab, setSelectedTab] = useState<ITab>("Dijelovi");

  const selectedTabContent = () => {
    if (selectedTab === "Dijelovi") {
      return <Dijelovi />;
    }
    if (selectedTab === "Alati") {
      return <p>Alat</p>;
    }
    if (selectedTab === "Strojevi") {
      return <p>Strojevi</p>;
    }
    if (selectedTab === "Projekti") {
      return <Projekti />;
    }
    return <p>Odaberite tab</p>;
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20rem" }}>
        <SideNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div
        style={{
          width: "calc(100% - 20rem)",
          margin: "2.5rem",
        }}
      >
        {selectedTabContent()}
      </div>
    </div>
  );
}

export default App;
