import React, { Component } from 'react'
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { Provider } from 'react-redux';
import configureStore from './store';

const initialState = {}

export class App extends Component {
  render() {
    return (
      <Provider store={configureStore(initialState)}>
        <Login />
      </Provider>

    // if ((user.isLoginSuccess === true)) {
    //   return (
    //     <Dashboard/>
    //   )
    // }
    // else if ((user.isLoginSuccess === false)) {
    //   return (
    //     <Login/>
    //   )
    // }
    )
  }
}

export default App
