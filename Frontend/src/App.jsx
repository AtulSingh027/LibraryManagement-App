import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/Signup'
import NewBook from './Pages/NewBook'
import LibraryDashboard  from './Pages/LibraryDashboard'


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/LibraryDashboard" element={<LibraryDashboard />} />  {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
