import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer
      hideProgressBar
      autoClose={3000}
      transition={Zoom}
      theme="colored"
    />
    <App />
  </BrowserRouter>
);
