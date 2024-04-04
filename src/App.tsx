import { Route, Routes } from "react-router-dom";
import { Landing } from "./layouts/Landing/Landing";
import { Products } from "./layouts/Products/Products";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./layouts/Login/Login";

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Landing />} path="/landing" />
        <Route element={<Products />} path="/" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
