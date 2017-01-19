import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/image/navigate-next';

import capitalize from '../stringTools'

import fetchData from '../../network/fetch-data';

import {
  URL_VIEW_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_CONTROL_ROOM_EDIT_RECORD,
} from '../../links'

export default class BrowserToEdit extends Component {
  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let templateList, allRecordsList

    try {
      templateList = await fetch.templateListGet()
      allRecordsList = await fetch.getAllRecords()

      this.setState({
        templateList: templateList.templateList,
        allRecordsList: allRecordsList.recordsAllList,
      })
    //  debugger;
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  entriesToSubtypeGroups = (list) => {

    var groupedEntries = {}
    for ( var entry in list){
      entry = list[entry]
      if( !groupedEntries[entry.subtype] ){
        groupedEntries[entry.subtype] = []
      }

      groupedEntries[entry.subtype].push(entry)

    }

    return groupedEntries;
  }


  render() {
    const style = {
      margin: 12,
    };

    const state = this.state

    const baseAvatarImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

    if ( !this.state || !this.state.allRecordsList ){
      return <div></div>
    }



    // let list = this.state.categoriesList.recordsByType;
    //
    // let entriesBySubtype = this.entriesToSubtypeGroups(list);

    return (
      <Card style={{paddingBottom:20}}>
        <CardTitle style={{marginLeft:50}}> <h1> {capitalize(this.props.params.categoryId)} </h1> </CardTitle>

        <Card style={{marginLeft:50,marginRight:50}}>
          <CardText>
          {
            Object.keys(state.templateList).map( (group, g) => (
              <List key={g}>
                <Subheader style={{fontWeight:"bolder"}}>
                  { capitalize(group)}
                  {/* { capitalize(Object.keys(state.)[g])} */}
                </Subheader>
                {
                  Object.keys(state.templateList[group]).map( (subType, j) => (
                    <div key={j}>
                      <h5
                        key={j}
                        style={{
                          color: 'rgba(51, 51, 51, 0.6)',
                          fontWeight:"bolder",
                          marginTop: 0,
                          marginBottom: 5,
                          marginLeft: 18,
                        }}
                      >
                        {capitalize(state.templateList[group][subType])}
                      </h5>
                      {
                        state.allRecordsList
                          .filter(
                            entry => (
                              entry.type == group &&
                              entry.subtype == state.templateList[group][subType]
                            )
                          )
                          .map( (entry, i) => (
                            <Link
                              to={URL_CONTROL_ROOM_EDIT_RECORD + entry.id}
                              key={i}
                              style={{ textDecoration: 'none'}}
                            >
                              <ListItem
                                primaryText={capitalize(entry.data.recordName)}
                                leftAvatar={<Avatar src={ baseAvatarImage } />}
                                rightIcon={<CommunicationChatBubble />}
                              />
                            </Link>
                          )
                        )
                      }
                    </div>
                  ))
                }
              </List>
            ))
          }
          </CardText>
        </Card>
      </Card>
    );
  }
}
