//Contexto
import { useContext } from 'react'
import {AuthContext} from './context/AuthContext'

//Routes
import Home from './components/routes/Home'
import Login from './components/routes/Login'
import Register from './components/routes/Register'


//React Router
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const { user } = useContext(AuthContext);
  

  return (
    <>

      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={user ? <Home /> :  <Login/> } />
        </Routes>
      </Router>


     </>
    
  )
}

export default App