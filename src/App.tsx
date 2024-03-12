import { Route, Routes } from "react-router-dom";
import { Landing } from "./layouts/Landing/Landing";

function App() {
  return <>
  <Routes>
    <Route element={<Landing/>} path="/landing"/>
    <Route element={<Landing/>} path="/"/>
    
  </Routes>
  </>
}

export default App;
