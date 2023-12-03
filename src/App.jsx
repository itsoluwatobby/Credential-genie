// import { useCredentialContext } from "./context/useCredentialContext"
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


function App() {
  // const { webConnect } = useCredentialContext()

  return (
    <main>
      <Routes>
        <Route index element={<h1>Hello</h1>} />
      </Routes>

      <ToastContainer />
    </main>
  )
}

export default App
