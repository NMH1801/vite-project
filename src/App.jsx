import { useSelector } from 'react-redux'
import './App.css'
// import MyComponent from './components/MyComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import { Login } from './components/dangnhap/dangnhap'
import { Dashboard } from './components/Dashboard'
export default function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={
          isLoggedIn 
          ? <Dashboard/> 
          : <Navigate to='/login'/>
        } />
        <Route path="login" element={
          !isLoggedIn 
          ? <Login/> 
          : <Navigate to='/dashboard'/>
        } />
      </Routes>
    </BrowserRouter>
    // <MyComponent />
  )
}

