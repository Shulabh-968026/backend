
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateUserForm from './components/CreateUserForm';
import Header from './components/Header';
import UserList from './components/UserList';

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path='/add' element={<CreateUserForm/>}/>
        <Route path='/edit/:id' element={<CreateUserForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
