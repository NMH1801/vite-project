import { useSelector } from 'react-redux'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Dashboard } from './components/layout/Dashboard'
import { LoginV2 } from "./components/login/Login"
import {HeaderAdmin} from "./components/layout/DashboardHeader"
export default function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={
          isLoggedIn
            ? <Dashboard />
            : <Navigate to='/loginV2' />
        } />
        <Route path="loginV2" element={
          !isLoggedIn
            ? <LoginV2 />
            : <Navigate to='/dashboard' />
        } />
        <Route path="/*" element={
          <Navigate to='/loginV2' />
        } />
        <Route path="/dashboard-header" element={<HeaderAdmin/>}>

        </Route>
        {/* <Route path="loginV2" element={<LoginV2/>}/> */}
      </Routes>
    </BrowserRouter>
    // <MyComponent />
  )
}

