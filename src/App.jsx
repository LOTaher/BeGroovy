import "./App.css";
import { Router, Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
