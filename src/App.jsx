import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authServices from './appwrite/auth.js'
import { login,logout } from './store/AuthSlice.js'
import {Header} from './components/index.js'
import {Footer} from './components/index.js'
import { Outlet } from 'react-router-dom'


function App() {
  const[loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
