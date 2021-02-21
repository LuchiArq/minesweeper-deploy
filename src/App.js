import {BrowserRouter as Router, Route} from 'react-router-dom';
import React,{useEffect} from 'react';
import Table from './components/Table/Table.jsx'
import  Home from './components/Home/Home.jsx'
import  Profile from './components/Profile/Profile.jsx'
import {useDispatch} from 'react-redux';
import {AllDataUser} from './redux/actions/userActions';
import {LoadStateLocalStorage} from './helpers/localStorage'



function App() {

    let datauser = LoadStateLocalStorage('dataUser') && LoadStateLocalStorage('dataUser')
    const dispatch = useDispatch()

  useEffect(()=>{
    datauser && dispatch(AllDataUser(datauser))
  },[])

  return ( 
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <Route exact path="/" component={Home}/> 
        <Route exact path="/game" component={Table} />
        <Route exact path="/profile" component={Profile} />
    </Router>
  );
}

export default App;
