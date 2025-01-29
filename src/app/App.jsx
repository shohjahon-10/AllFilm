import { Outlet } from "react-router-dom";
import { AlluserLayout } from "../layout";

function App() {
  return (
    <>
      <AlluserLayout />
      <Outlet />
    </>
  );
}

export default App;
