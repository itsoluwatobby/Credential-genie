import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Credential } from './pages/Credential';


function App() {

  return (
    <main className=''>
      <Routes>
        {/* this first route will be for the landing page */}
        <Route index element={<h1>Hello</h1>} />
        
        <Route path='/vc_credential' element={<Credential />} />
      </Routes>

      <ToastContainer />
    </main>
  )
}

export default App
