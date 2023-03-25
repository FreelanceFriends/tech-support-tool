import React, { Component } from 'react'
import '../css/Dashboard.css'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import Creatnewticketform from './Creatnewticketform'
import { bindActionCreators } from 'redux'
import * as AllActions from '../api/api';
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { GET_ALL_TICKET } from '../constants/constants'
import DisplayTickets from './DisplayTickets'
import Alert from '@mui/material/Alert';
import { Snackbar } from '@material-ui/core';
import LogoutIcon from '@mui/icons-material/Logout';
// import BASE_URL from '../constants'
class Dashboardcomp extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        value_menu:0,
        openTickets:'',
        alertOpen: false,
         errorMsg: "",
         alertType: "info"
      }
    }
    componentDidMount() {
      // get tikets y id
      // this.props.actions.getTickets(GET_ALL_TICKET, "64017ae63bdb8a55fff5ed82")
      
      // get all tickets
      this.props.actions.getTickets(GET_ALL_TICKET)

      document.body.style.backgroundColor = "white"
    }
    /*
     Sample Get Tickets response. This response by default sorted by createdAt in desc order
    [
      {
          "_id": "64017ae63bdb8a55fff5ed82",
          "title": "Kiasdkadslk",
          "description": "KLJlkasjab",
          "created_by": {
              "firstname": "Kilsjdkj",
              "lastname": "ansdbiwej",
              "email": "jack.asdkl@ho.com"
          },
          "status": "NEW",
          "severity": "LOW",
          "ticket_id": "INC598096",
          "createdAt": "2023-03-03T04:43:18.097Z",
          "updatedAt": "2023-03-03T04:43:18.097Z",
          "__v": 0
      },
    ]

    */

    componentDidUpdate(prevProps, prevState) {
      if(this.props.ticket !== prevProps.ticket) {
        // Here you go for update current component state
        // this.props.actions.getTickets(GET_ALL_TICKET)
        this.setState({
          ...prevState,
            alertOpen: this.props.ticket.error,
            alertType: this.props.ticket.errorType,
            errorMsg: this.props.ticket.errorMessage
          })
        console.log("Dashboard tickets ", this.props.ticket.tickets)
      }
    }

    handleChangeSubTab = (event, value_menu) => {
        this.setState({ value_menu });
    };


    handleAlertClose = () => {
      this.setState({ alertOpen: false, errorMsg: "", alertType: "info" })
    }
    handleLogout=()=>{
      this?.props?.actions?.logoutuser(() => this.props.navigate("/login", {replace: true}))
      // this.props.navigate("/login", {replace: true})
    }

  render() {
    // console.log("tickets",this.props.ticket.tickets);
    return (
    <>
        <div className='headerDiv'><span style={{marginLeft:'500px'}}>Help Desk Online</span><LogoutIcon onClick={this.handleLogout} style={{marginLeft:'500px'}}/></div>
        <AppBar position="static" color="default" >
            <Tabs value={this.state.value_menu} onChange={this.handleChangeSubTab}>
           { this.props.user.userRole ==="USER" && <Tab label="Create" />}
           { this.props.user.userRole ==="ADMIN" && <Tab label="Register" />}
                <Tab label="New" />
                <Tab label="Open" />
                <Tab label="Closed" />
            </Tabs>
        </AppBar>
        {this.props.user.userRole === "USER" &&
        (<>{(this.state.value_menu ===0) && <Creatnewticketform status={"create"}/>}
        {this.state.value_menu ===1 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"new"}/>}
        {this.state.value_menu ===2 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"open"}/>}
        {this.state.value_menu ===3 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"closed"}/>}</>)}
        
        {this.props.user.userRole === "TECHNICIAN" &&
        (<>{this.state.value_menu ===0 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"new"}/>}
        {this.state.value_menu ===1 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"open"}/>}
        {this.state.value_menu ===2 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"closed"}/>}</>)
        }
        {this.props.user.userRole === "ADMIN" &&
        (<>{this.state.value_menu ===0 && <Creatnewticketform status={"register"}/>}
        {this.state.value_menu ===1 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"new"}/>}
        {this.state.value_menu ===2 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"open"}/>}
        {this.state.value_menu ===3 && <DisplayTickets tickets={this.props?.ticket.tickets} status={"closed"}/>}</>)
        }
        <div className='footer'>© 2023 copyright by Help Desk Team</div>
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

const Dashboard = (props) => {
  const navigate = useNavigate()
  

  return <Dashboardcomp  {...props} navigate = {navigate}/>
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)