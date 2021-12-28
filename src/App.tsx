import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import {SignIn} from './Pages/SignIn';
import {SignUp} from './Pages/SignUp';
import {Homepage} from './Pages/Homepage';
import {NotFound} from './Pages/NotFound';
import {Layout} from './Layout/Layout';
import { useAuth } from './hooks/use-auth';
import { PhotoList } from './PhotoList/PhotoList';

const App: React.FC = () => {
  const {isAuth} = useAuth()

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          {
            !isAuth && 
            <>
              <Route path="sign_in" element={<SignIn />} />
              <Route path="sign_up" element={<SignUp />} />
            </>
          }
          <Route path="photos/:user_id" element={<PhotoList />} /> 
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
};

export default App;
