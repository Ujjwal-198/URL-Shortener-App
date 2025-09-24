import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Layout from './Layout.jsx';
import { Home, Signup, Login, Input, About, Services, Contact, Output, Profile } from './pages/index.js';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import { checkAuth } from './features/userSlice.js';
import { useNavigate } from 'react-router-dom';

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(() => {
        navigate("/input");
      })
      .catch(() => {
        navigate("/"); 
      });
  }, [dispatch]);

  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/input" element={<Input />} />
            <Route path="/output" element={<Output />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
  );
};

export default App;