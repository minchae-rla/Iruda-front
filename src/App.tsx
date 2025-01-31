import './App.css'
import routes from './routes'
import Login from './pages/main/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-800">
    <Router>
      <Routes>
        <Route/>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  </div>
  )
}

export default App
