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
        selectedTicket: '',
        alertOpen: false,
         errorMsg: "",
         alertType: "info",
         btnstatus:'',
         technicianname: '',
         technicianList: [],
      }
    }
    componentDidMount =()=>{
      var tickets=[];
      if(this.props.tickets !== null){
        if(this.props.status === "new"){
          tickets = this.props.tickets.filter(function (ticket) {
              return ticket.status === "NEW";
          })
        }else if(this.props.status === "open"){
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

    componentDidUpdate(prevProps, prevState) {
      if(this.props.user !== prevProps.user) {
        // Here you go for update current component state
        // this.props.actions.getTickets(GET_ALL_TICKET)
        this.setState({
          ...prevState,
            alertOpen: this.props.ticket.error,
            alertType: this.props.ticket.errorType,
            errorMsg: this.props.ticket.errorMessage,
            technicianList: this.props.user.technicians
          })
      }
    }

    handleResolve=(index)=>{
      this.setState(prevState => {
        return {
          ...prevState,
        modalOpen:true,
        selectedTicket: index,
        btnstatus:'resolved'
        }
      })
    }

    handleAssign=(index)=>{
      this.setState(prevState => {
        return {
          ...prevState,
        modalOpen:true,
        // selectedTicket: index
        }
      })
    }

    handleAssignTo=(index)=>{
      this.props?.actions?.getTechnicians()
      this.setState(prevState => {
        return {
          ...prevState,
        modalOpen:true,
        selectedTicket: index,
        btnstatus:'assignto'
        }
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
        comments: '',
        selectedTicket: '',
        technicianname:''
      })
    }
    handleSubmit =(e) =>{
      console.log(this.state.comments, this.state.selectedTicket);
      let ticket = this.state.tickets[this.state.selectedTicket]
      let updatedTicket = {description: ticket.description, severity: ticket.severity, title: ticket.title, status:"CLOSED", comment: this.state.comments}
      this.props.actions.updateTicket(updatedTicket, ticket["_id"])
      this.setState({
        modalOpen:false,
        comments: '',
        selectedTicket: ''
      })
    }

    handleAssignSubmit  =(e) =>{
      let selectedTicket = this.state.tickets[this.state.selectedTicket];
      let updateObj = {assigned_to: this.state.technicianname}
      this.props.actions.updateTicket(updateObj, selectedTicket["_id"] )

      this.setState({
        modalOpen:false,
        comments: '',
        selectedTicket: '',
        technicianname:''
      })
    }

    getOption = () => {
      let options = this.state.technicianList.map(technician => 
        <option value={technician?._id}>{`${technician.firstname} ${technician.lastname}`}</option>
      )
      return options;
    }
 
  render() {
    return (
        <>
          { this.state.tickets.length !== 0 ? this.state.tickets.map( (e, index) =>
            <div className="card">
                <div className="container">
                <h4><b>Title: {e.title}</b></h4> 
                <p>Description: {e.description}</p> 
                <p>Severity: {e.severity}</p> 
                <p>Created At: {e.createdAt.slice(0, 10)}</p> 
                <p>Assigned To: {e.assigned_to?.email != null ? e.assigned_to.email : "Not Yet Assigned"}</p> 
                {e.status === "CLOSED" && <p>Comments: {e.comment}</p> }
                {(this.props.user.userRole === "TECHNICIAN" && this.props.status === "open") && <button className='resolvebtn' onClick={()=>this.handleResolve(index)}>Resolve Ticket</button>}
                {/* {(this.props.user.userRole === "TECHNICIAN" && this.props.status === "new") && <button className='resolvebtn' onClick={()=>this.handleAssign(index)}>Assign Me</button>} */}
                {(this.props.user.userRole === "ADMIN" && this.props.status === "new") && <button className='resolvebtn' onClick={()=>this.handleAssignTo(index)}>Assign To</button>}
                </div>
            </div>):<div style={{marginLeft:'45%', marginTop:'50px'}}>No Tickets Found. </div>
          }
                <Dialog open={this.state.modalOpen}>
                       { this.state.btnstatus === "resolved" ?( <><DialogTitle className="dialogTitle">
                            <span><strong> Comments </strong></span>
                        </DialogTitle>
                        <DialogContent dividers>
                            <textarea name='comments' value={this.state.comments} onChange={this.handleTextValueChange} rows="4" cols="50"></textarea><br/><br/>
                            <button className='cmtbtn' onClick={this.handleSubmit}>Resolve</button> &nbsp;&nbsp;
                            <button className='cmtbtn' onClick={this.handleClose}>Close</button>
                        </DialogContent></>):
                        ( <><DialogTitle className="dialogTitle">
                        <span><strong> Assign TO </strong></span>
                    </DialogTitle>
                    <DialogContent dividers>
                    <label className="ticket-lablel"><strong>Technician name</strong></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <select className="ticket-dd" name='technicianname' value={this.state.technicianname} onChange={this.handleTextValueChange}> 
                          {
                            this.getOption()
                            
                          // this.state?.technicianList?.length && this.state.technicianList.map(technician => 
                          //   <option value={technician?._id}>{`${technician.firstname} ${technician.lastname}`}</option>
                          }
                      </select> <br/><br/>
                        <button className='cmtbtn' onClick={this.handleAssignSubmit}>Assign</button> &nbsp;&nbsp;
                        <button className='cmtbtn' onClick={this.handleClose}>Close</button>
                    </DialogContent></>)}
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