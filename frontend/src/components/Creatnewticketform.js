import React, { Component } from 'react'
import '../css/Createticket.css'
export class Creatnewticketform extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         description:'',
         severity:''
      }
    }

    handleTextValueChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmit = (e) =>{
        console.log(this.state);
      }

  render() {
    return (
        <>
        <div className='ticket-header'><strong>Create New Ticket</strong></div>
        <div className='ticket-border'>
            <form className='' onSubmit={this.handleSubmit}>
                <div className='from-display'>
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
        </div>
      </>
      
    )
  }
}

export default Creatnewticketform