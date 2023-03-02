import { Snackbar } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { bindActionCreators } from 'redux';
import * as AllActions from '../api/api';
import '../css/Login.css';

class LoginComponent extends Component {
  
    constructor(props) {
      super(props)
      
      this.state = {
         email:'',
         password:'',
         alertOpen:false,
         errorMsg:"Invalid Creditinal"
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.user.error !== this.props.user.error){
        this.setState({
          ...prevState,
        alertOpen: this.props.user.error,
        errorMsg: this.props.user.errorMessage
      })
    }
      console.log("Updeasdnakdnka")
    }

    handleLogin = (e) => {
        e.preventDefault();
        this?.props?.actions?.loginUser({...this.state}, () => this.props.navigate("/", {replace: true}))
    }
    handleTextValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
      }

    handleAlertClose = () => {
      this.setState({ alertOpen: false, errorMsg: "" })
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

        <label className="labeldiv" htmlFor="username">Username</label>
        <input name="email"
                    placeholder="Email"
                    className="textbox"
                    value={this.state.email}
                    onChange={this.handleTextValueChange} />

        <label className="labeldiv" htmlFor="password">Password</label>
        <input name="password"
                    type="password"
                    className="textbox"
                    placeholder="Password"
                    onChange={this.handleTextValueChange}
                    value={this.state.password} />

        <button className="loginbtn" type="submit">Log In</button>
    </form>
    <Snackbar open={this.state.alertOpen} autoHideDuration={2000} onClose={this.handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: "center" }} style={{ top: '87px', right: '16px' }}>
        <Alert onClose={this.handleAlertClose} severity="warning">
            {this.state.errorMsg}
        </Alert>
    </Snackbar>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AllActions, dispatch)
});

const Login = (props) => {
  const navigate = useNavigate()
  

  return <LoginComponent  {...props} navigate = {navigate}/>
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);