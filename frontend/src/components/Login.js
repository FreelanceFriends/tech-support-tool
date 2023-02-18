import React, { Component } from 'react'
// import {loginUser} from '../actions/index'
import '../css/Login.css';
class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         email:'',
         password:''
      }
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log("state",this.state)
    }
    handleTextValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
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
    </div>
    )
  }
}

export default Login;