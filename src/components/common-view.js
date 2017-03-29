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
  constructor() {
    super()
    this.state = {
      isAMobile: (navigator.userAgent.indexOf('Mobile') > -1)? true : false,
      backColor : "#f2f2f2"
    };
  }


  render() {
    let logoStyle = {height: 50,marginTop:10,marginLeft:5}

    var colors = [
                  "#a9b3bf",
                  "#85aad6",
                  "#bd9d6d",
                  "#f2f2f2",
                  "#779077",
                  "#0079BF",
                  "#155196",
                  "#78a2d4",
                  "#eeecf1",
                  "#607d8b",
                  "#795548",
                  "#a58e50",
                  "#ceb163",
                  "#b7b9bb",
                  "#C63D0F",
                  "#3B3738",
                  "#FDF3E7",
                  "#7E8F7C",
                  "#A8CD1B",
                  "#CBE32D",
                  "#F3FAB6",
                  "#558C89",
                  "#74AFAD",
                  "#D9853B",
                  "#ECECEA",
                  "#7D1935",
                  "#4A96AD",
                  "#F5F3EE",
                  "#FFFFFF",
                  "#E44424",
                  "#67BCDB",
                  "#A2AB58",
                  "#FFFFFF",
                  "#585858",
                  "#118C4E",
                  "#FF9009",
                  ]

    return (
      <div style={{ backgroundColor: this.state.backColor , padding:8, height:"100%"}}>
         <div id="CommonView" style={{marginLeft: "auto", marginRight:"auto", maxWidth:"70%", minWidth:870,}}>

           <Card style={{height:40, marginBottom:10,overflowY:"scroll"}}>
             {colors.map( (elem,i) => <div key={i} style={{backgroundColor:elem,width:35,height:35,margin:3,float:"left"}} onClick={ () => this.setState({backColor: elem})}></div> )}
           </Card>

           <Card style={{height:100, marginBottom:10,paddingTop:20,paddingLeft:20}}>

           {/* <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={logoStyle} /> */}
           <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png" style={{height:55,marginTop:0,marginLeft:5}}/>
           <img src="https://www.cam.ac.uk/sites/www.cam.ac.uk/files/inner-images/logo.jpg" style={{height: 50,marginTop:0,marginLeft:5}} />
           <img src="http://www.cipil.law.cam.ac.uk/sites/www.law.cam.ac.uk/files/images/www.cipil.law.cam.ac.uk/legacy/images/logo_cipil_3.gif" style={{height: 50,marginTop:0,marginLeft:5}} />

           <span style={{float:"right", marginTop: 5}}>
             <h2 style={{margin:"0 0 0 0",marginRight:25, marginTop:-5}}>
               <Link to={URL_BASE} style={{ textDecoration: 'none'}}>
                 <span style={{color:"black"}}>Intellectual Property</span> <br/> <span style={{color:"#155196"}}>Oral History Project</span>
               </Link>
             </h2>
           </span>

           </Card>
           {this.props.children}

           <Card style={{padding:50,paddingTop:1,marginTop:5,paddingBottom:10}}>
            <h3>Copyright statement</h3>
            <span style={{fontSize:14,lineHeight:0}}>
            You may copy and distribute the transcriptions and commentaries in this resource, or parts of such transcriptions and commentaries, in any medium, for non-commercial purposes as long as the source is acknowledged, and you indicate it as Bellido & Bently (eds), Intellectual Property- Oral History Project (<a href={"http://www.iporalhistory.co.uk"}>www.iporalhistory.co.uk</a>). You may not publish any document and photograph for any commercial purposes, including charging a fee for providing access to these documents amd photographs via a network. This licence does not affect your statutory rights of fair dealing. We are unable to grant you the right to reproduce or duplicate some of these photographs or documents in so far as the images or scans are protected by copyright or we have only been able to reproduce them here by giving contractual undertakings.
            <br/><br/>
            <hr/>
            </span>
           <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={logoStyle} />
           <img src="http://www.gla.ac.uk/media/media_434161_en.jpg" style={logoStyle} />
           </Card>
         </div>
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
