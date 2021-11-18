import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar'
import { RecoilRoot } from 'recoil';
import Login from './Pages/Login';
import Index from './Pages/Index';
import BeerProfile from './Pages/BeerProfile';
import UserState from './Atoms/UserAtom';
import Profile from './Pages/Profile';
import ShoppingList from './Pages/ShoppingList';
import Register from './Pages/Register';
import BreweryList from './Pages/BreweryList';
import TypeList from './Pages/TypeList';
import BreweryProfile from './Pages/BreweryProfile';
import TypeProfile from './Pages/TypeProfile';


export function initState(snapshot) {
  const data = localStorage.getItem("user")
  if (!data){
    return
  }
  const user = JSON.parse(data)
  snapshot.set(UserState, user)
}

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}

    <RecoilRoot initializeState={initState}>
    <BrowserRouter>
      <Navbar />
      <div style={{width: '95%', margin:'auto'}}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="shoppinglist" element={<ShoppingList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="beer/:id" element={<BeerProfile />} />
          <Route path="breweries" element={<BreweryList />} />
          <Route path="brewery/:id" element={<BreweryProfile />} />
          <Route path="types" element={<TypeList />} />
          <Route path="type/:id" element={<TypeProfile />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
