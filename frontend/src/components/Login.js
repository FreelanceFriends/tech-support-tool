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
         firstname:'',
         lastname:'',
         email:'',
         password:'',
         alertOpen:false,
         alertType: "info",
         errorMsg: "",
         statusLogin: true,
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.user !== this.props.user){
        this.setState({
          ...prevState,
        alertOpen: this.props.user.error,
        alertType: this.props.user.errorType,
        errorMsg: this.props.user.errorMessage
      })
    }
    }

    handleLogin = (e) => {
        e.preventDefault();
        this?.props?.actions?.loginUser({email:this.state.email, password:this.state.password}, () => this.props.navigate("/", {replace: true}))
    }

    handleRegister = (e) => {
      e.preventDefault();
      this?.props?.actions?.signupuser({...this.state}, () => this.props.navigate("/login", {replace: true}))
      console.log(this.state);
  }
    handleTextValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
      }

    handleAlertClose = () => {
      this.setState({ alertOpen: false, errorMsg: "", alertType: "" })
    }
    statusLogin =()=>{
      this.setState({ statusLogin:!this.state.statusLogin })
    }

    

  render() {
    return (

    <div>
    <div className='header'>Help Desk Online</div>
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
        {this.state.statusLogin === true ?
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
          <br/>
         <p>Don't have an account? <span style={{"textDecorationLine": "underline"}}onClick={this.statusLogin}>Register</span></p>
        </form>:
        <form className="formDiv" onSubmit={this.handleRegister}>
          <h3>Register Here</h3>

          <label className="labeldiv" >First Name</label>
          <input name="firstname"
                      placeholder="First Name"
                      className="textboxreg"
                      value={this.state.fname}
                      onChange={this.handleTextValueChange} />

          <label className="labeldiv" >Last Name</label>
          <input name="lastname"
                      placeholder="Last Name"
                      className="textboxreg"
                      onChange={this.handleTextValueChange}
                      value={this.state.lname} />
          <label className="labeldiv" >Email</label>
          <input name="email"
                      placeholder="Email"
                      className="textboxreg"
                      onChange={this.handleTextValueChange}
                      value={this.state.email} />
          <label className="labeldiv" >Password</label>
          <input name="password"
                      placeholder="Password"
                      type="password"
                      className="textboxreg"
                      onChange={this.handleTextValueChange}
                      value={this.state.password} />

          <button className="regbtn" type="submit">Register</button><br/>
         <p>Already have an account? <span style={{"textDecorationLine": "underline"}} onClick={this.statusLogin}>Login</span></p>
        </form>
        }
    
    <Snackbar open={this.state.alertOpen} autoHideDuration={2000} onClose={this.handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: "center" }} style={{ top: '87px', right: '16px' }}>
        <Alert onClose={this.handleAlertClose} severity={this.state.alertType}>
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