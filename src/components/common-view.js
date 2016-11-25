import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { templateListSet } from '../actions/actions';
import fetchData from '../network/fetch-data';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class CommonView extends Component {
  async componentWillMount() {
    let fetch = new fetchData();
    // Load the templateList
    if (this.props.templateList) {
      return
    }

    // Get and dispatch the template list
    this.props.setTemplateList( await fetch.templateListGet() )
  }

  render() {
    return (
     <div id="CommonView" style={{marginLeft: "8%",marginTop: 20, marginRight:"8%", minWidth:1000 }}>
       <Card>
       <h1 style={{textAlign:"right",verticalAlign:"middle"}}>
         <Link to={`/`} style={{ textDecoration: 'none'}}>
           <span style={{color:"black"}}>Intellectual Property</span> <br/> <span style={{color:"#3399ff"}}>Oral History Project</span>
         </Link>
       </h1>
       </Card>
       <hr/>

       {this.props.children}
     </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  templateList: state.templateList || null,
  // if route contains params
  params: ownProps.params,
  location: ownProps.location
})

const mapDispatchToProps = (dispatch) => ({
  setTemplateList: (templateList) => {
    dispatch(templateListSet(templateList))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonView);
