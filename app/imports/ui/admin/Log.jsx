import { withTracker } from 'meteor/react-meteor-data';
import React, { Component, Fragment } from 'react';
import { AppLogs } from '../../api/collections';
import moment from 'moment';

class LogCells extends Component {

  getDate(date){
    return moment(date).format("MM-DD-YYYY hh:mm:ss");
  }

  render() {
    
    return ( 
      <tbody>
      { this.props.logs.map( (log, index) => (
        <tr key={ log._id }>
          <td scope="row">{ index+1 }</td>
          <td>{ this.getDate(log.date) }</td>
          <td>{ log.userId }</td>
          <td>{ log.message }</td>
          <td>{ JSON.stringify(log.additional.before, Object.keys(log.additional.before).sort(), 2) }</td>
          <td>{ JSON.stringify(log.additional.after, Object.keys(log.additional.after).sort(), 2) }</td>
        </tr>
      ))}
      </tbody>
    )
  }
}

class Log extends Component {

  render() {
    let content;
    content = (
      <Fragment>
        <h5 className="card-header">Liste des logs</h5>
        <table id="log" className="table table-striped">
            <thead>
              <tr>
                <th scope="col" style={ { width: "5%" } }>#</th>
                <th scope="col" style={ { width: "10%" } }>Date</th>
                <th scope="col" style={ { width: "10%" } }>Sciper</th>
                <th scope="col" style={ { width: "15%" } }>Message</th>
                <th scope="col" style={ { width: "30%" } }>Avant</th>
                <th scope="col" style={ { width: "30%" } }>Après</th>
              </tr>
            </thead>
            <LogCells logs={ this.props.logs } />
          </table>
      </Fragment>
    );
    return content;
  }
}
export default withTracker(() => {
  Meteor.subscribe('log.list');
  return {
    logs: AppLogs.find({}, {sort: {date: -1}}).fetch(),
  };
})(Log);