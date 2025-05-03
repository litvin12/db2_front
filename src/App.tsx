import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './components/pages/Home'
// import { Profile } from './components/pages/Profile'
import { Registration } from './components/Registration/Index'
import { motion } from 'framer-motion'
import { Profile } from './components/pages/Profile'
import { AdminPanel } from './components/pages/AdminPanel'
function App() {

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className='container'>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin-panel' element={<AdminPanel />} />
          </Route>
        </Routes>
      </div>
    </motion.div>
  )
}

export default App
