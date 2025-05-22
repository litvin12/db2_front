import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './components/pages/Home'
// import { Profile } from './components/pages/Profile'
import { Registration } from './components/Registration/Index'
import { motion, AnimatePresence } from 'framer-motion'
import { Profile } from './components/pages/Profile'
import { AdminPanel } from './components/pages/AdminPanel'
import { useState, useEffect } from 'react'

function App() {
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const spinning = localStorage.getItem('isSpinning') === 'true';
      setIsSpinning(spinning);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <motion.div
      className='containerApp'
      animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
      transition={{
        duration: 2,
        repeat: isSpinning ? Infinity : 0,
        ease: "linear"
      }}
    >
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin-panel' element={<AdminPanel />} />
        </Route>
      </Routes>
    </motion.div>
  )
}

export default App
