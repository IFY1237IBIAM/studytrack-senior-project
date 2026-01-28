import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import "./css/style.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
