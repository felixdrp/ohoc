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

export default class CategoriesView extends Component {
  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let categoriesList

    try {
      categoriesList = await fetch.getRecordsByType(this.props.params.categoryId)
      this.setState({categoriesList})
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
    let list = [];
    let testEntry = {
      id : 1,
      type : "academia",
      subtype : "institutions",
      data: {"featuredImage": null, "recordName": "city university", "media": {"text": [], "audio": [], "video": [], "picture": []}, "fields": [{"data": "City University", "name": "name", "type": "text"}, {"data": "City University", "name": "title", "type": "text"},
            {"data": "Some info about City University, Lorem ipsum dolor sit amet, ius at sensibus molestiae omittantur, eos vidisse nominati ut. Quot voluptatibus duo ei, sea in detracto pericula. Mel te oblique consulatu elaboraret, mea nibh placerat conceptam an. Iriure offendit aliquando et has, nemore corpora quo ea, ei mel alienum urbanitas. His ut nibh consequat. Ut eum labore impetus, per no accumsan urbanitas deterruisset, sed voluptatum deterruisset comprehensam ei.", "name": "work", "type": "text"}
          ]},
    }

    let testEntry2 = {
      id : 1,
      type : "academia",
      subtype : "featured people",
      data: {"featuredImage": null, "recordName": "Boaty Mc Boatface", "media": {"text": [], "audio": [], "video": [], "picture": []}, "fields": [{"data": "City University", "name": "name", "type": "text"}, {"data": "City University", "name": "title", "type": "text"},
            {"data": "Some info about City University, Lorem ipsum dolor sit amet, ius at sensibus molestiae omittantur, eos vidisse nominati ut. Quot voluptatibus duo ei, sea in detracto pericula. Mel te oblique consulatu elaboraret, mea nibh placerat conceptam an. Iriure offendit aliquando et has, nemore corpora quo ea, ei mel alienum urbanitas. His ut nibh consequat. Ut eum labore impetus, per no accumsan urbanitas deterruisset, sed voluptatum deterruisset comprehensam ei.", "name": "work", "type": "text"}
          ]},
    }

    list.push(testEntry);
    list.push(testEntry2);
    list.push(testEntry);
    list.push(testEntry);
    list.push(testEntry2);
    list.push(testEntry);
    list.push(testEntry);
    list.push(testEntry2);
    list.push(testEntry2);
    list.push(testEntry2);

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
                                return <Link to={`/record/`+entry.id+i} key={i} style={{ textDecoration: 'none'}}> <ListItem
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
