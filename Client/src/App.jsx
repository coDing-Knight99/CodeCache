import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
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
      {/* <ConfirmDelete/> */}
      {/* {/* <ViewSnippet Code="//hello"/> */}
      {/* <EditSnippet Snippet={{
    "title": "Basic Express Server",
    "description": "Sets up a minimal Express.js server with a single route.",
    "language": "JavaScript (Node.js)",
    "code": "import express from 'express';\n const app = express();\napp.get('/', (req, res) => res.send('Hello World'));\napp.listen(3000, () => console.log('Server running on port 3000'));",
    "tags": "Node.js,Express,Backend"
  }}/> */}

      {/* <SnippetCard/> */}
    </>
  )
}

export default App
