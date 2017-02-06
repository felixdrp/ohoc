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


import {GridList, GridTile} from 'material-ui/GridList';
import capitalize from '../stringTools'

import fetchData from '../../network/fetch-data';

import {
  URL_VIEW_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_CATEGORIES_LIST,
} from '../../links'

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

  prepareTiles = (entries) => {
    var tiles = [];

    var subtypesInTiles = []

    for (var a in entries) {

        if ( !subtypesInTiles.includes(entries[a].subtype) ){

          tiles.push({
            img: URL_BASE_MULTIMEDIA_IMAGES + 'institution-default.jpg',
            title: capitalize(entries[a].subtype),
            src: URL_CATEGORIES_LIST + this.props.params.categoryId+ "/" + entries[a].subtype,
          });

          subtypesInTiles.push(entries[a].subtype)
        }

    }
    return tiles;
  }

  render() {
    const style = {
      margin: 12,
    };

    const baseAvatarImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

    if ( !this.state || !this.state.categoriesList ){
      return <div></div>
    }

    let styles = {
          root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          },
          gridList: {

            overflowY: 'auto',
          },
        };


    let list = this.state.categoriesList.recordsByType;
    let tilesData = this.prepareTiles(list)


    return (
      <Card style={{paddingBottom:30, minHeight:600}}>
        <CardTitle style={{marginLeft:50}}> <h1> {capitalize(this.props.params.categoryId)} </h1> </CardTitle>
        <Card style={{marginLeft:50,marginRight:50}}>
          <CardText>
                  <GridList
                      cols={3}
                      style={styles.gridList}
                    >
                      {/* <Subheader>{capitalize(this.props.subcategoryId)}</Subheader> */}
                      {tilesData.map((tile,i) => (
                        <Link key={i} to={tile.src} style={{ textDecoration: 'none'}}>
                          <GridTile
                            key={tile.img}
                            title={tile.title}
                            subtitle={""}
                          >
                            <img src={tile.img ? tile.img : baseAvatarImage} />
                          </GridTile>
                        </Link>
                      ))}
                    </GridList>

            {/* {
              Object.keys(entriesBySubtype).map( (group,g) =>{

                  group = entriesBySubtype[group]


                      return <List key={g}>
                        <Subheader style={{fontWeight:"bolder"}}>{capitalize(Object.keys(entriesBySubtype)[g])}</Subheader>

                            {
                              group.map( (entry, i) =>{
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

            } )
          } */}
          </CardText>
        </Card>
      </Card>
    );
  }
}
