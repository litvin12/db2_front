import './App.css'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './components/pages/Home'
// import { Profile } from './components/pages/Profile'
import { Registration } from './components/Registration/Index'
function App() {

  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={ <MainLayout /> }>
          <Route path='/' element={ <Home/> } />
          {/* <Route path='/profile' element={ <Profile /> } /> */}
          <Route path='/registration' element={ <Registration />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
