import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Crud from "./components/Crud/crud";

function App() {
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/crud" element={<Crud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
