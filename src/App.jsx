import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Credential } from './pages/Credential';
import NotFound from './pages/NotFound'
import { Navbar } from './components/Navbar';


function App() {

  return (
    <main className='h-screen w-screen'>
      <Navbar />
      <Routes>

        {/* <Route index element={<h1>Hello</h1>} /> */}

        <Route index element={<Credential />} />
        {/* <Route path='/vc_credential' element={<Credential />} /> */}

        <Route path='*' element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </main>
  )
}

export default App
