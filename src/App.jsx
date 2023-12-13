import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Toaster } from 'react-hot-toast';

import Create from './pages/create';
import Verify from './pages/verify';
import NotFound from './pages/NotFound';
import LandingPage from './pages/landingPage';

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/create" element={<Create />} />
        {/* <Route path="/verify" element={<Verify />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="bottom-left" reverseOrder={false} />
    </main>
  );
}

export default App;
