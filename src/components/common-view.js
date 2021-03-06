import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import { templateListSet } from '../actions/actions';
import fetchData from '../network/fetch-data';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import NavigationBar from './navigation-bar/navigation-bar'
import SearchBar from './search-bar/search-bar'

import SearchIcon from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';

import {URL_BASE} from '../links'

import Measure from 'react-measure';
import QueryStore from './query-store';

class CommonView extends Component {
  constructor() {
    super()
    this.state = {
      isAMobile: (navigator.userAgent.indexOf('Mobile') > -1)? true : false,
      showSearchBar: false,
      backColor : "#f2f2f2"
    };
  }

  async componentWillMount() {
    let fetch = new fetchData();
    // Load the templateList
    if (this.props.templateList) {
      return
    }
    // Get and dispatch the template list
    this.props.setTemplateList( await fetch.templateListGet() )
  }

  toggleSearchBar = () => this.setState({showSearchBar: !this.state.showSearchBar})

  commputeWidth = (w, maxw, minw) => {
    var width = Math.round(((-30/1205)*w) + (141500/1205))
    if (width > maxw) {
      width = maxw;
    }
    if (width < minw) {
      width = minw;
    }
    return width;
  }


  render() {
    let logoStyle = {height: 50,marginTop:10,marginLeft:5}

    return (
      <Measure
        onMeasure={(dimensions) => {
            this.setState({dimensions})
        }}
      >
        <div style={{ backgroundColor: this.state.backColor ,  height:"100vh"}}>
           <div id="CommonView" style={{marginLeft: "auto", marginRight:"auto", width: (this.state.dimensions ? this.commputeWidth(this.state.dimensions.width,95,70)+"vw" : "70vw") , height:"100vh"}}>

             {/* <Card style={{height:40, marginBottom:10,overflowY:"scroll"}}>
               {colors.map( (elem,i) => <div key={i} style={{backgroundColor:elem,width:35,height:35,margin:3,float:"left"}} onClick={ () => this.setState({backColor: elem})}></div> )}
             </Card> */}

             <Card
               style={{
                 minHeight:100,
                 marginBottom:10,
                 paddingTop:20,
                 paddingLeft:20,
                 paddingBottom:10
               }}
               containerStyle={{
                 display: 'flex',
                 flexWrap: 'wrap',
                 justifyContent: 'space-between',
               }}
             >
               <div style={{width:"100%"}}>
                 {/* <img src="http://www.create.ac.uk/wp-content/uploads/logos/create_primary_logo_160.jpg" style={logoStyle} /> */}
                 <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/13/University_of_Kent_logo.svg/1280px-University_of_Kent_logo.svg.png" style={{maxHeight:50,marginTop:0,marginLeft:5}}/>
                 <img src="https://www.cam.ac.uk/sites/www.cam.ac.uk/files/inner-images/logo.jpg" style={{maxHeight: 50,marginTop:0,marginLeft:5}} />
                 <img src="http://www.cipil.law.cam.ac.uk/sites/www.law.cam.ac.uk/files/images/www.cipil.law.cam.ac.uk/legacy/images/logo_cipil_3.gif" style={{maxHeight: 50,marginTop:0,marginLeft:5}} />


               <span style={{ marginTop: 5,maxHeight: 50, display: "inline-block", marginLeft:7, float:  this.state.dimensions && (this.state.dimensions.width > 750) ? "right" : "none"}}>
                 <h2 style={{margin:"0 0 0 0",marginRight:25, marginTop:-5}}>
                   <Link to={URL_BASE} style={{ textDecoration: 'none'}} onClick={() => QueryStore.setQuery("")}>
                     <span style={{color:"black"}}>Intellectual Property</span>
                     <br/>
                     <span style={{color:"#155196",marginLeft:35}}>Oral Histories</span>
                   </Link>
                 </h2>
               </span>

                </div>
               <div
                 style={{
                   flexBasis: '100%'
                 }}
               >
                 <NavigationBar />
                 <IconButton
                    // iconStyle={styles.smallIcon}
                    style={{
                      top: 8,
                    }}
                    onClick={this.toggleSearchBar}
                  >
                    <SearchIcon />
                  </IconButton>
               </div>
               <div
                 style={{
                   flexBasis: '100%'
                 }}
               >
                 { this.state.showSearchBar && <SearchBar /> }
               </div>
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
      </Measure>
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
