// import "./App.css";
import ReactSelect from "react-select";
import UserPage from "./pages/user-page";
import ReactQuery from "./react-query";
import { useState } from "react";
import ZustandDemo from "./zustand";
import ReactCharts from "./charts";

function App() {
  const appData = [
    { label: "React Hook Form", value: "rfh" },
    { label: "React Query", value: "rq" },
    { label: "Zustand Demo", value: "zd" },
    { label: "React Chart", value: "rc" },
  ];
  const [tempComponent, setTempComponent] = useState(appData[3]);
  return (
    <>
      <div style={{ width: "30%", margin: "1rem 3rem" }}>
        <ReactSelect
          options={appData}
          onChange={(data) => setTempComponent(data as typeof tempComponent)}
          value={tempComponent}
        />
      </div>
      <div style={{ margin: "1rem 25rem" }}>
        {(() => {
          switch (tempComponent.value) {
            case "rfh":
              return <UserPage />;
            case "rq":
              return <ReactQuery />;
            case "zd":
              return <ZustandDemo />;
            case "rc":
              return <ReactCharts />;
          }
        })()}
      </div>
    </>
  );
}

export default App;
