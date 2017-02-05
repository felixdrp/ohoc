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
  URL_MULTIMEDIA,
} from '../../links'

export default class ListView extends Component {

  // componentWillReceiveProps = (newprops) =>{
  //
  //
  //
  // }
  //
  // entriesToSubtypeGroups = (list) => {
  //
  //
  // }

//subcategoryId = {this.props.params.subcategoryId} entries
  render() {



        let avatarStyle = {height:50}

            const baseAvatarImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

      return <List>
              <Subheader style={{fontWeight:"bolder"}}>{capitalize(this.props.subcategoryId)}</Subheader>
                  {
                    this.props.entries.map( (entry, i) =>{
                      return <Link to={URL_VIEW_RECORD + entry.id} key={i} style={{ textDecoration: 'none'}}> <ListItem
                        primaryText={capitalize(entry.data.recordName)}
                        leftAvatar={

                          <img style={avatarStyle}
                            src={ entry.data.featuredImage? URL_MULTIMEDIA + entry.data.featuredImage: baseAvatarImage }
                          />
                        }
                        rightIcon={<CommunicationChatBubble />}
                      /> </Link>
                    })

                  }
              </List>

    
  }
}
