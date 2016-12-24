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

export default class CategoriesView extends Component {
  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let categoriesList

    try {
      categoriesList = await fetch.getRecordsByType(this.props.params.categoryId)
      this.setState({categoriesList})
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

    if ( !this.state || !this.state.categoriesList ){
      return <div></div>
    }


    let list = this.state.categoriesList.recordsByType;

    let entriesBySubtype = this.entriesToSubtypeGroups(list);

    return (
      <Card style={{paddingBottom:20}}>
        <CardTitle style={{marginLeft:50}}> <h1> {capitalize(this.props.params.categoryId)} </h1> </CardTitle>
        <Card style={{marginLeft:50,marginRight:50}}>
          <CardText>
            {
              Object.keys(entriesBySubtype).map( (group,g) =>{

                  group = entriesBySubtype[group]


                      return <List key={g}>
                        <Subheader style={{fontWeight:"bolder"}}>{capitalize(Object.keys(entriesBySubtype)[g])}</Subheader>

                            {
                              group.map( (entry, i) =>{
                                return <Link to={`/record/`+entry.id} key={i} style={{ textDecoration: 'none'}}> <ListItem
                                  primaryText={capitalize(entry.data.recordName)}
                                  leftAvatar={<Avatar src="http://localhost:3001/images/institution-default.jpg" />}
                                  rightIcon={<CommunicationChatBubble />}
                                /> </Link>
                              })

                            }

                        </List>

            } )
          }
          </CardText>
        </Card>
      </Card>
    );
  }
}