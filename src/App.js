import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home";
import { UserProvider } from "./Context/userContext";
import GistPage from "./Pages/GistPage";
// import GistUpdateForm from "./Pages/GistUpdateForm";
import UserProfile from "./Pages/UserProfile";
import UserGistDisplay from "./Pages/UserGistDisplay";
import CreateGist from "./Pages/CreateGist";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/GistPage" element={<GistPage />}></Route>
          <Route path="/CreateGist" element={<CreateGist />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/gist/:gistId" element={<UserGistDisplay />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
