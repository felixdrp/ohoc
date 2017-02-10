import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import capitalize from './stringTools'

import { URL_CATEGORIES_LIST, URL_BASE_MULTIMEDIA_IMAGES} from '../links'

class BrowseRecords extends Component {

  categoryData = {
    "academia" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/PhotoAcademy.jpeg' ,
                    orderIndex : 2,
                    copyrightNotice : "(Courtesy of QM Archives)" },
    "civil service" : { src : URL_BASE_MULTIMEDIA_IMAGES + '/PhotoCivilService.jpg' , orderIndex : 4, copyrightNotice : "(Courtesy of IP Office)" },
    "policy formation" : { src : URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPolicyFormation.jpg' , orderIndex : 3, copyrightNotice : "(Courtesy of M. Freegard)" },
    "publications" : { src : URL_BASE_MULTIMEDIA_IMAGES + '/PhotoPublications.jpg' , orderIndex : 5, copyrightNotice : "(Courtesy of Henry Blanco White)" },
    "solicitors and agents" : { src : URL_BASE_MULTIMEDIA_IMAGES + '/PhotoSolicitorsandAgents.jpg' , orderIndex : 1, copyrightNotice : "(Courtesy of Bird&Bird)" },
    "the bar" : { src : URL_BASE_MULTIMEDIA_IMAGES + '/PhotoTheBar.jpg' , orderIndex : 0, copyrightNotice : "(Courtesy of Metropolitan Archives)"  },
  }

  constructor(props) {
    super(props)
    this.state = {
    };
  }



  render() {
    const style = {
      margin: 12,
    };

    return (
      <div>

        {/* <div>
          <TextField
            hintText="Search"
          />
          <br />
        </div> */}

        <Card style = {{paddingTop:20,paddingBottom:10}}>
          {/* <div style={{marginTop:5,marginLeft:80,marginBottom:50,fontSize:35, fontWeight:"bold"}}>
            <span style={{color:"black"}}>Intellectual Property :</span> <span style={{color:"#155196"}}>Oral History Project</span>
          </div> */}

          <div style={{textAlign:"center"}} >
          {
            this.props.templateList && Object.keys(this.props.templateList).sort( (a,b) => this.categoryData[a].orderIndex > this.categoryData[b].orderIndex).map( (e, index) => (
              <Link key={index} to={URL_CATEGORIES_LIST + e} style={{ textDecoration: 'none' }}>
                <Card

                  style={{
                    width: "25%",
                    display: 'inline-block',
                    marginBottom: 10,
                    marginRight: 10,
                    height: 250,
                    backgroundColor: "#cccccc",
                  }}
                  expanded={false}
                  initiallyExpanded={false}
                >
                  <CardMedia
                    overlay={<CardTitle title={capitalize(e)} style={{margin:0,padding:4}} > <span style={{color:"white",fontSize:10}}> {this.categoryData[e].copyrightNotice}</span> </CardTitle>}
                  >
                    <span style={{width:400,height:250}}><img style={{maxHeight: 250 ,maxWidth:"100%"}} src={this.categoryData[e].src} /></span>
                  </CardMedia>


                </Card>
              </Link>
            ))
          }
          </div>


        <div style={{marginLeft:60,fontSize:18}}>
          <div style={{marginTop:30,paddingLeft:80,paddingRight:50, width:"85%", textAlign:"justify"}}>

              The twentieth-century has been a largely unexplored historical period, often consigned to brief references in textbooks or newspapers, and it is our aim to explore the different and dynamic ways in which intellectual property has  evolved in the United Kingdom in recent years. Using personal recollections, artefacts and opinions of those who participated in the making of intellectual property in their different professional capacities as barristers, clerks, civil servants or lecturers this project will augment historical understanding of intellectual property through the creation of a digital archive of open and publicly accessible material that records, preserves and transcribes oral interviews with intellectual property practitioners, lobbyists and civil servants. The archive will be of value to anyone with an interest in contemporary legal history and intellectual property.​
            <br/><br/>

            <span style={{fontSize:15}}>
            <b>Contact details:</b>
            <div style={{margin:20}}>
            José Bellido, University of Kent <a href="mailto:j.a.bellido@kent.ac.uk">j.a.bellido@kent.ac.uk</a> and Lionel Bently, University of Cambridge <a href="mailto:lb329@cam.ac.uk">​lb329@cam.ac.uk</a>
            </div>
            </span>
          </div>
        </div>
        </Card>
{/*
        <Link to={'/record/create'} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Add Record" primary={true} style={style} />
        </Link>
        <Link to={`/record/hola/mlk`} style={{ textDecoration: 'none' }}>
          <RaisedButton label="Go to a record" primary={true} style={style} />
        </Link> */}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseRecords);
