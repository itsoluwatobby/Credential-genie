import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NotFound from './pages/NotFound';
import Credential from './pages/Credential';
import LandingPage from './pages/landingPage';

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/create" element={<Credential />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </main>
  );
}

export default App;
