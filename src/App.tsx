import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
