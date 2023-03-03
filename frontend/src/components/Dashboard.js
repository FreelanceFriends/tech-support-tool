import React, { Component } from 'react'
import '../css/Dashboard.css'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import Creatnewticketform from './Creatnewticketform'
import { bindActionCreators } from 'redux'
import * as AllActions from '../api/api';
import { connect } from 'react-redux'
import { GET_ALL_TICKET } from '../constants/constants'
class Dashboard extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        value_menu:0,
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
        console.log("Dashboard tickets ", this.props.ticket.tickets)
      }
    }

    handleChangeSubTab = (event, value_menu) => {
        this.setState({ value_menu });
    };

  render() {
    
    return (
    <>
        <div className='headerDiv'>Help Desk Online</div>
        <AppBar position="static" color="default" >
            <Tabs value={this.state.value_menu} onChange={this.handleChangeSubTab}>
                <Tab label="Create" />
                <Tab label="Open" />
                <Tab label="Closed" />
            </Tabs>
        </AppBar>
        {this.state.value_menu ===0 && <Creatnewticketform/>}
        <div className='footer'>© 2023 copyright by Help Desk Team</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)