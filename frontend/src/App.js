import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import './App.css';
import Home from './Home';
import Login from './Loginn';
import Newcenter from './Newcenter';

import Signup from './Signup';
function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route> 
      <Route path='/Home' element={<Home/>}></Route> 
      <Route path='/Admin' element={<Admin/>}></Route> 
      <Route path='/center' element={<Newcenter/>}></Route> 
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
