import React, { Component } from 'react'
import '../css/Dashboard.css'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import Creatnewticketform from './Creatnewticketform'
class Dashboard extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        value_menu:0,
      }
    }
    componentDidMount() {
        document.body.style.backgroundColor = "white"
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

export default Dashboard