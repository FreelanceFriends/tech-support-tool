import { Snackbar } from '@material-ui/core';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert'
import { bindActionCreators } from 'redux';
import * as AllActions from '../api/api';
import '../css/Login.css';

class Login extends Component {
  
    constructor(props) {
      super(props)
      
      this.state = {
         email:'',
         password:'',
         alertOpen:false,
         errorMsg:"Invalid Creditinal"
      }
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log("sssssss",this.props)
        this?.props?.actions?.loginUser({...this.state})
    }
    handleTextValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
      }

    handleAlertClose = () => {
      this.setState({ alertWarnOpen: false, alertOpen: false })
    }

  render() {
    return (

    <div>
    <div className='header'>Help Desk Online</div>
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form className="formDiv" onSubmit={this.handleLogin}>
        <h3>Login Here</h3>

        <label className="labeldiv" for="username">Username</label>
        <input name="email"
                    placeholder="Email"
                    className="textbox"
                    value={this.state.email}
                    onChange={this.handleTextValueChange} />

        <label className="labeldiv" for="password">Password</label>
        <input name="password"
                    type="password"
                    className="textbox"
                    placeholder="Password"
                    onChange={this.handleTextValueChange}
                    value={this.state.password} />

        <button className="loginbtn" type="submit">Log In</button>
    </form>
    <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={this.handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: "center " }} style={{ top: '87px', right: '16px' }}>
        <Alert onClose={this.handleAlertClose} severity="warning">
            {this.state.errorMsg}
        </Alert>
    </Snackbar>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  //...state
  isLoginPending: state.user.isLoginPending,
  isLoginSuccess: state.user.isLoginSuccess,
  isLoginError: state.user.isLoginError,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AllActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);