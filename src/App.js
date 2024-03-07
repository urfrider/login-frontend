import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { PrivateRoute } from "./component/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <PrivateRoute authRoles={["USER", "MANAGER"]}>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute authRoles={["MANAGER"]}>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
