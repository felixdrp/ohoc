import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import capitalize from './stringTools'

import {GridList, GridTile} from 'material-ui/GridList';

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
      isAMobile: (navigator.userAgent.indexOf('Mobile') > -1)? true : false,
    };
  }

  render() {
    const style = {
      margin: 12,
    };

    return (
      <div>
        <Card style = {{paddingTop:20,paddingBottom:10}}>
          <div style={{textAlign:"center"}} >
            <GridList
                     cols={this.state.isAMobile ? 2 : 3}
                     cellHeight={250}
                     style={{width:"80%",marginLeft:"10%"}}
                   >
          {
            this.props.templateList && Object.keys(this.props.templateList).sort( (a,b) => this.categoryData[a].orderIndex > this.categoryData[b].orderIndex).map(
                (e, index) => (
                    <Link key={index} to={URL_CATEGORIES_LIST + e} style={{ textDecoration: 'none'}}>
                      <GridTile
                        key={index}
                        title={e}
                        subtitle={this.categoryData[e].copyrightNotice}
                        style={{backgroundColor:"rgb(204, 204, 204)"}}
                      >
                        <span style={{width:"100%",height:"100%",textAlign:"center",verticalAlign:"middle"}}><img style={{width:"100%"}} src={this.categoryData[e].src ? this.categoryData[e].src : baseAvatarImage} /></span>
                      </GridTile>
                    </Link>
              )
            )
          }
            </GridList>
          </div>

        <div style={{marginLeft:"10%",fontSize:18}}>
          <div style={{marginTop:30,paddingLeft:0,paddingRight:50, width:"88%", textAlign:"justify"}}>

              The twentieth-century has been a largely unexplored historical period, often consigned to brief references in textbooks or newspapers, and it is our aim to explore the different and dynamic ways in which intellectual property has  evolved in the United Kingdom in recent years. Using personal recollections, artefacts and opinions of those who participated in the making of intellectual property in their different professional capacities as barristers, clerks, civil servants or lecturers this project will augment historical understanding of intellectual property through the creation of a digital archive of open and publicly accessible material that records, preserves and transcribes oral interviews with intellectual property practitioners, lobbyists and civil servants. The archive will be of value to anyone with an interest in contemporary legal history and intellectual property.​
            <br/><br/>

            <span style={{fontSize:15}}>
            <b>Contact details:</b>
            <span style={{marginLeft:10}}>
            José Bellido, University of Kent <a href="mailto:j.a.bellido@kent.ac.uk">j.a.bellido@kent.ac.uk</a> and Lionel Bently, University of Cambridge <a href="mailto:lb329@cam.ac.uk">​lb329@cam.ac.uk</a>
            </span>
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
