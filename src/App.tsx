// import "./App.css";
import ReactSelect from "react-select";
import UserPage from "./pages/user-page";
import ReactQuery from "./react-query";
import { useState } from "react";

function App() {
  const appData = [
    { label: "React Hook Form", value: "rfh" },
    { label: "React Query", value: "rq" },
  ];
  const [tempComponent, setTempComponent] = useState(appData[1]);
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
          }
        })()}
      </div>
    </>
  );
}

export default App;
