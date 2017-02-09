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
    let logoStyle = {height: 50,marginTop:10,marginLeft:5}


    return (
     <div id="CommonView" style={{marginLeft: "8%", marginRight:"8%", minWidth:1500 }}>
       <Card style={{height:100, marginBottom:10,paddingTop:20,paddingLeft:20}}>

       {/* <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={logoStyle} /> */}
       <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png" style={{height:55,marginTop:0,marginLeft:5}}/>
       <img src="https://www.cam.ac.uk/sites/www.cam.ac.uk/files/inner-images/logo.jpg" style={{height: 50,marginTop:0,marginLeft:5}} />
       <img src="http://www.cipil.law.cam.ac.uk/sites/www.law.cam.ac.uk/files/images/www.cipil.law.cam.ac.uk/legacy/images/logo_cipil_3.gif" style={{height: 50,marginTop:0,marginLeft:5}} />

       <span style={{float:"right"}}>
         <h2 style={{margin:"0 0 0 0",marginRight:25, marginTop:-5}}>
           <Link to={URL_BASE} style={{ textDecoration: 'none'}}>
             <span style={{color:"black"}}>Intellectual Property</span> <br/> <span style={{color:"#155196"}}>Oral History Project</span>
           </Link>
         </h2>
       </span>

       </Card>
       {this.props.children}

       <Card style={{padding:20,paddingTop:1,marginTop:-40}}>
        <h3>Copyright statement</h3>
        <span style={{fontSize:14,lineHeight:0}}>
        You may copy and distribute the translations and commentaries in this resource, or parts of such translations and commentaries, in any medium,	for non-commercial purposes as long as the authorship of the commentaries and translations is acknowledged, and you indicate the source as Bently & Kretschmer (eds), Primary Sources on Copyright (1450-1900) (www.copyrighthistory.org).
        You may not publish these documents for any commercial purposes, including charging a fee for providing access to these documents via a network. This licence does not affect your statutory rights of fair dealing.
        Although the original documents in this database are in the public domain, we are unable to grant you the right to reproduce or duplicate some of these documents in so far as the images or scans are protected by copyright or we have only been able to reproduce them here by giving contractual undertakings. For the status of any particular images, please consult the information relating to copyright in the bibliographic records.
        <br/><br/>
        <hr/>
        </span>
       <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={logoStyle} />
       <img src="http://www.gla.ac.uk/media/media_434161_en.jpg" style={logoStyle} />
       </Card>
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
