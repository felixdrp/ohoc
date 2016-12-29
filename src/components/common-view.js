import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { templateListSet } from '../actions/actions';
import fetchData from '../network/fetch-data';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {URL_BASE} from '../links'

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
    let logoStyle = {height: 70,marginTop:15,marginLeft:5}


    return (
     <div id="CommonView" style={{marginLeft: "8%",marginTop: 20, marginRight:"8%", minWidth:1200 }}>
       <Card style={{height:130, marginBottom:10,paddingTop:15,paddingLeft:20}}>

       <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={logoStyle} />
       <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png" style={logoStyle}/>
       <img src="http://www.gla.ac.uk/media/media_434161_en.jpg" style={logoStyle} />
       <img src="http://www.cipil.law.cam.ac.uk/sites/www.law.cam.ac.uk/files/images/www.cipil.law.cam.ac.uk/legacy/images/logo_cipil_3.gif" style={logoStyle} />

       <span style={{float:"right"}}>
         <h1 style={{margin:"0 0 0 0",marginRight:25, marginTop:5}}>
           <Link to={URL_BASE} style={{ textDecoration: 'none'}}>
             <span style={{color:"black"}}>Intellectual Property</span> <br/> <span style={{color:"#3399ff"}}>Oral History Project</span>
           </Link>
         </h1>
       </span>

       </Card>
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
