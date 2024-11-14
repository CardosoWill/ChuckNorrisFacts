import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/login'
import Piadas from './pages/Piadas'
import User from './pages/User'
import Fatos from './pages/Fatos'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './auth/Context'
import PrivateRoute from './routes/PrivateRoute'

function App() {

  const location = useLocation();

  const showElement = location.pathname === '/login' ||  location.pathname === '/register' || location.pathname ==='/'

  return (
    <AuthProvider>
    
    {!showElement?<Header/>:null}

      <Routes>
      <Route path='/' element={<Welcome/>} />
        
        <Route element={<PrivateRoute />}>
        <Route path='/piadas' element={<Piadas />} />
        <Route path='/user' element={<User />} />
        <Route path='/fatos' element={<Fatos />} />
        </Route>
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      {!showElement?<Footer/>:null}
    </AuthProvider>
  )
}

export default App
