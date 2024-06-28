import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateUser } from './redux/AuthSlice';
import UserLayouts from './layouts/UserLayouts';
import AdminLayouts from './layouts/AdminLayouts';

function App() {

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser());
  }, [user, dispatch]);

  return (
    <Router>
      <Toaster />
      <div className="App">
        <Routes>

          <Route path='/user' element={<UserLayouts />}>
            <Route index element={<Home />} />
          </Route>

          <Route path='/admin' element={<AdminLayouts />}>
            <Route index element={<Admin />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
