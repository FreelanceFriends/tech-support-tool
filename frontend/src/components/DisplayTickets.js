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
        comments:'',
        tickets:[],
      }
    }
    componentDidMount =()=>{
      var tickets=[];
      if(this.props.tickets !== null){
        if(this.props.status === "open"){
          tickets = this.props.tickets.filter(function (ticket) {
              return ticket.status === "NEW";
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
    handleResolve=()=>{
      this.setState({
        modalOpen:true,
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
      console.log(this.state.comments);
      this.setState({
        modalOpen:true,
      })
    }
 
  render() {
    return (
        <>
          { this.state.tickets.length !== 0 ? this.state.tickets.map( e =>
            <div className="card">
                <div className="container">
                <h4><b>Title: {e.title}</b></h4> 
                <p>Description: {e.description}</p> 
                <p>Severity: {e.severity}</p> 
                <p>Created At: {e.createdAt.slice(0, 10)}</p> 
                <p>Assigned To: {e.assignedTo != null ? e.assignedTo : "Not Yet Assigned"}</p> 
                {e.status === "CLOSED" && <p>Comments: {e.comments}</p> }
                {this.props.user.userRole === "USER" && <button className='resolvebtn' onClick={this.handleResolve}>Resolve Ticket</button>}
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