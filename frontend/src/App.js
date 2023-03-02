import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { bindActionCreators } from 'redux';
import './App.css';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';

export class App extends Component {
  
  render() {
  
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
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

