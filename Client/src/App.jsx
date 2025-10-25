import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './pages/Login.jsx'
import Navbar from './components/Navbar'
import  SnippetFilter from './components/Search'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import SnippetCard from './components/SnippetCard'
import AddSnippet from './components/AddSnippet'
import EditSnippet from './components/EditSnippet'
import ViewSnippet from './components/ViewSnippet'
import { View } from 'lucide-react'
import ConfirmDelete from './components/ConfirmDelete'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <>
    {/* <AddSnippet/> */}
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<ProtectedRoute>
        <Home/>
      </ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
