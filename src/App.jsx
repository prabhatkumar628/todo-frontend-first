import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Home } from './components/Home'
import { PageNotFound } from './components/PageNotFound'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </>
  )
}

export default App
