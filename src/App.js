import "./App.css";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Help from "./components/Help";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import DisplayArtist from "./pages/displayArtist";
import DisplayPlaylist from "./pages/displayPlaylist";
import DisplaySingle from "./pages/displaySingle";
import DisplaySearched from "./pages/displaySearched";
import Displayhome from "./components/routescompo/displayhome";
import DisplayAlbum from "./pages/displayAlbums";
import { useRef } from "react";

function App() {
  const displayRef = useRef();

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested routes go here */}
            <Route index element={<Displayhome />} />
            <Route path="card/artist/:id" element={<DisplayArtist />} />
            <Route path="card/playlist/:id" element={<DisplayPlaylist />} />
            <Route path="card/album/:id" element={<DisplayAlbum />} />
            <Route path="card/single/:id" element={<DisplaySingle />} />
            <Route path="card/searched/:query" element={<DisplaySearched />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
