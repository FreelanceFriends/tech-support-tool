import React, { Component } from 'react'
import '../css/DisplayTickets.css'
import { bindActionCreators } from 'redux'
import * as AllActions from '../api/api';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'

class DisplayTickets extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        modalOpen:false,
        ticket_details:'',
        comments:'',
        tickets:[],
      }
    }
    componentDidMount =()=>{
      var tickets=[];
      if(this.props.tickets !== null){
        if(this.props.status === "open"){
          tickets = this.props.tickets.filter(function (ticket) {
              return ticket.status === "OPEN";
          })
        }
        else{
          tickets = this.props.tickets.filter(function (ticket) {
            return ticket.status === "CLOSED";
          })
        } 
      }
      this.setState({
        tickets:tickets
      })
    }

    handleTextValueChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleClose =(e)=>{
      this.setState({
        modalOpen:false,
      })
    }
    handleSubmit =(e) =>{
      console.log(this.state);
      // Action to close the ticket
      this.setState({
        modalOpen:false,
      })
    }
 
  render() {
    return (
        <>
          { this.state.tickets.length !== 0 ? this.state.tickets.map( k =>
            <div className="card">
                <div className="container">
                <h4><b>Title: {k.title}</b></h4> 
                <p>Description: {k.description}</p> 
                <p>Severity: {k.severity}</p> 
                <p>Created At: {k.createdAt.slice(0, 10)}</p> 
                <p>Assigned To: {k.assigned_to.email != null ? k.assigned_to.email : "Not Yet Assigned"}</p> 
                {k.status === "CLOSED" && <p>Comments: {k.comments}</p> }
                {this.props.user.userRole === "TECHNICIAN" && <button className='resolvebtn' onClick={ e =>{ this.setState({modalOpen:true,ticket_details:k})}}>Resolve Ticket</button>}
                </div>
            </div>):<div>Loading ... </div>
          }
                <Dialog open={this.state.modalOpen}>
                        <DialogTitle className="dialogTitle">
                            <span><strong> Comments </strong></span>
                        </DialogTitle>
                        <DialogContent dividers>
                            <textarea name='comments' value={this.state.comments} onChange={this.handleTextValueChange} rows="4" cols="50"></textarea><br/><br/>
                            <button className='cmtbtn' onClick={this.handleSubmit}>Resolve</button> &nbsp;&nbsp;
                            <button className='cmtbtn' onClick={this.handleClose}>Close</button>
                        </DialogContent>
                    </Dialog>
        </>
    )
  }
}

DisplayTickets.propTypes = {
  classes: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  user: state.user,
  ticket: state.ticket
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AllActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTickets)