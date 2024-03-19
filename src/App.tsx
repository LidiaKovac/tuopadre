import { Route, Routes } from "react-router-dom";
import { Landing } from "./layouts/Landing/Landing";
import { Products } from "./layouts/Products/Products";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Landing />} path="/landing" />
        <Route element={<Products />} path="/" />
      </Routes>
    </>
  );
}

export default App;
