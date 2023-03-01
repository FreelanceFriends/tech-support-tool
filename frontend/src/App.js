import React, { Component } from 'react'
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import configureStore from './store';
import { Route, Link, Routes } from "react-router-dom";
import Error from './components/Error';
import ProtectedRoute from './routes/ProtectedRoute';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';




export class App extends Component {
  
  render() {
    
    console.log("App rendering")
    return (
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>

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

const mapStateToProps = state => ({
  user: state.user,
  page: state.page,
  isLoginPending: state.user.isLoginPending,
  isLoginSuccess: state.user.isLoginSuccess,
  isLoginError: state.user.isLoginError,
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

