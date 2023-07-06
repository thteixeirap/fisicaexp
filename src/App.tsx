import "./App.css";
import { Chart } from "./dashboard";
import ResponsiveAppBar from "./dashboard/components/navbar";
import { ModalContextProvider } from "./dashboard/context/modalContext";

function App() {
  return (
    <>
      <ModalContextProvider>
        <ResponsiveAppBar />
        <Chart />
      </ModalContextProvider>
    </>
  );
}

export default App;
