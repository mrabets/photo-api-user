import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import {SignIn} from './Pages/SignIn';
import {SignUp} from './Pages/SignUp';
import Homepage from './Pages/Homepage';
import NotFound from './Pages/NotFound';
import Layout from './Layout/Layout';


const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="sign_in" element={<SignIn />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </div>
);

export default App;
