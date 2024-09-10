import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/login'
import Home from './pages/Home'
import About from './pages/About'
import Fatos from './pages/Fatos'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>

      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/fatos' element={<Fatos />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
