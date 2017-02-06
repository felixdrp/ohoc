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

        <Card style = {{paddingTop:20,marginBottom:50,paddingBottom:10}}>
          {/* <div style={{marginTop:5,marginLeft:80,marginBottom:50,fontSize:35, fontWeight:"bold"}}>
            <span style={{color:"black"}}>Intellectual Property :</span> <span style={{color:"#155196"}}>Oral History Project</span>
          </div> */}

          <div style={{textAlign:"center",paddingLeft:"10%",paddingRight:"10%"}} >
          {
            this.props.templateList && Object.keys(this.props.templateList).sort( (a,b) => this.categoryData[a].orderIndex > this.categoryData[b].orderIndex).map( (e, index) => (
              <Link key={index} to={URL_CATEGORIES_LIST + e} style={{ textDecoration: 'none' }}>
                <Card

                  style={{
                    width: 400,
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
                    overlay={<CardTitle title={capitalize(e)} style={{margin:0,padding:4}} > <span style={{color:"white",fontSize:14}}> {this.categoryData[e].copyrightNotice}</span> </CardTitle>}
                  >
                    <span style={{width:400,height:250}}><img style={{maxHeight: 250,maxWidth:400}} src={this.categoryData[e].src} /></span>
                  </CardMedia>


                </Card>
              </Link>
            ))
          }
          </div>


        <div style={{marginLeft:60,fontSize:18}}>
          <div style={{marginTop:30,paddingLeft:80,paddingRight:50, width:"85%", textAlign:"justify"}}>

              There are many layers and paths in the recent history of British intellectual property, particularly in its development throughout the second half of the twentieth century. These were important decades in which the subject became a full academic discipline; international offices in Munich and Alicante were established; the domestic Patent Office moved to Wales and the Patent Bar was renamed as the Intellectual Property Bar. This project is an attempt to trace these and many other histories by recording recollections of those who participated in one way or another in them. Current and retired academics, barristers, solicitors, policy makers, activists and agents recall here their background and reflect on the personal and professional challenges and encounters. Moreover, they talk about what they see now, in retrospect, as the main changes in the law and practice of British intellectual property. The project is funded by a grant from CREATe (University of Glasgow) and the interviews were carried out by Jose Bellido (University of Kent) and Lionel Bently (University of Cambridge).
            <br/><br/>

            <span style={{fontSize:15}}>
            <b>Contact details:</b>
            <div style={{margin:20}}>
              Dr José Bellido, University of Kent <a href="mailto:j.a.bellido@kent.ac.uk">j.a.bellido@kent.ac.uk</a> and <br/>
              Professor Lionel Bently, University of Cambridge <a href="mailto:lb329@cam.ac.uk">​lb329@cam.ac.uk</a>
            </div>
            </span>
          </div>
        </div>
        <hr style={{margin:30}}/>


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
