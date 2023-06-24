import { useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { DashboardHeader } from "./components/layout/DashboardHeader";
import { LoginV2 } from "./components/login/Login";
import { Species } from "./components/views/Species"; // Import component Species
import { SpeciesForm } from "./components/views/SpeciesForm";

export default function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            !isLoggedIn ? (
              <Navigate to="/loginV2" />
            ) : (
              <Navigate to="/dashboard/species" />
            )
          }
        />
        <Route
          path="/loginV2"
          element={!isLoggedIn ? <LoginV2 /> : <Navigate to="/dashboard/species" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <SpeciesOutlet /> : <Navigate to="/loginV2" />}
        >
          <Route path="species" element={<Species />} />
          <Route path="species/insert" element={<SpeciesForm formActive="insert" />} />
          {/* <Route path="species/edit/*" element={<SpeciesForm formActive="edit" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function SpeciesOutlet() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}
