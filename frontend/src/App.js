import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import User from './pages/User';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateUser } from './redux/AuthSlice';
import UserLayouts from './layouts/UserLayouts';
import AdminLayouts from './layouts/AdminLayouts';
import BooksCampaign from './pages/BooksCampaign';
import SchoolBuildingForm from './UserComponent/SchoolBuildingForm';
import SchoolBuildingTable from './UserComponent/SchoolBuildingsTable';

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
            <Route index element={<User />} />
            <Route path="bookscampaign" element={<BooksCampaign />} />
            <Route path="schoolbuildingform" element={<SchoolBuildingForm />} />
            <Route path="schoolbuildingtable" element={<SchoolBuildingTable />} />
          </Route>

          <Route path='/admin' element={<AdminLayouts />}>
            <Route index element={<Admin />} />``
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
