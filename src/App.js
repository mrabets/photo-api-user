import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import axios from 'axios'
import './App.css';
import PhotoList from './PhotoList/PhotoList'
import SignIn from './Users/SignIn'
import SignUp from './Users/SignUp'
import Navbar from './Navbar/Navbar'

class App extends Component {

  render() {
    return (
      <div className="App">  

        <Navbar />
        <Routes>
          <Route exact path="/" element={<PhotoList/>} />
          <Route exact path="/sign_in" element={<SignIn/>} />
          <Route exact path="/sign_up" element={<SignUp/>} />
        </Routes>
      </div>
    );
  }
}

export default App;
