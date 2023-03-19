import React, { Component } from 'react'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@material-ui/core';
import * as AllActions from '../api/api';
import { bindActionCreators } from 'redux';
import '../css/Createticket.css'
import { connect } from 'react-redux';
export class Creatnewticketform extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         description:'',
         severity:'',
         title: '',
         alertOpen: false,
         errorMsg: "",
         alertType: "info",
         firstname:'',
         lastname:'',
         email:'',
         password:'',
         role:'User',
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.ticket !== this.props.ticket) {
        console.log(this.props.ticket)
        this.setState({
          ...prevState,
          errorMsg: this.props.ticket.errorMessage,
          alertOpen: this.props.ticket.error,
          alertType: this.props.ticket.errorType,
        })
      }
    }

    // componentDidMount =() =>{
    //   this.props.actions.getTickets(GET_ALL_TICKET)
    // }

    handleTextValueChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmit = (e) =>{
        e.preventDefault();
        if(this.props.status ==="create"){
        this.props.actions.createTicket({title: this.state.title, description: this.state.description, severity: this.state?.severity?.toLocaleUpperCase})
        }
        else{
        this?.props?.actions?.signupuser({...this.state}, () => this.props.navigate("/login", {replace: true}))
        }

      }

      handleAlertClose = () => {
        this.setState({ alertOpen: false, errorMsg: "", alertType: "info" })
      }

  render() {
    return (
        <>
       {this.props.status ==="create" && <>
       <div className='ticket-header'><strong>Create New Ticket</strong></div>
        <div className='ticket-border'>
            <form className='' onSubmit={this.handleSubmit}>
                <div className='from-display'>
                <div className='label-display'>
                <label className="ticket-lablel"><strong>Title</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" className="ticket-tt" name='title' value={this.state.title} onChange={this.handleTextValueChange} />
                </div>
                <div className='label-display'>
                <label className="ticket-lablel"><strong>Description</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;
                <textarea name='description' value={this.state.description} onChange={this.handleTextValueChange} rows="4" cols="50"></textarea>
                </div>
                <div className='label-display'>
                <label className="ticket-lablel"><strong>Severity</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="ticket-dd" name='severity' value={this.state.severity} onChange={this.handleTextValueChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </div>
                <button className='ticketbtn'>Create Ticket</button>
                </div>
            </form>
        </div></>}

        {this.props.status ==="register" && <>
       <div className='ticket-header'><strong>Register</strong></div>
        <div className='ticket-border'>
            <form className='' onSubmit={this.handleSubmit}>
                <div className='from-display'>
                <div className=''>
                <label className="ticket-lablel"><strong>First Name</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"  name='firstname' value={this.state.firstname} onChange={this.handleTextValueChange} />
                </div>
                <div>
                <label className="ticket-lablel"><strong>Last Name</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"  name='lastname' value={this.state.lastname} onChange={this.handleTextValueChange} />
                </div>
                <div>
                <label className="ticket-lablel"><strong>Email</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text"  name='email' value={this.state.email} onChange={this.handleTextValueChange} />
                </div>
                <div>
                <label className="ticket-lablel"><strong>Password</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="password"  name='password' value={this.state.password} onChange={this.handleTextValueChange} />
                </div>
                <div>
                <label className="ticket-lablel"><strong>Role</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select name='role' value={this.state.role} onChange={this.handleTextValueChange}>
                    <option value="USER">User</option>
                    <option value="TECHNICIAN">Technician</option>
                </select>
                </div>
                <button className='ticketbtn'>Register</button>
                </div>
            </form>
        </div></>}
        <Snackbar open={this.state.alertOpen} autoHideDuration={2000} onClose={this.handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: "center" }} style={{ top: '87px', right: '16px' }}>
        <Alert onClose={this.handleAlertClose} severity={this.state.alertType}>
            {this.state.errorMsg}
        </Alert>
    </Snackbar>
      </>
      
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  ticket: state.ticket
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AllActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Creatnewticketform);