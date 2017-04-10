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

import fetchData from '../../network/fetch-data';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

import StarBorder from 'material-ui/svg-icons/toggle/star-border';


import {
  URL_VIEW_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
} from '../../links'

export default class GridView extends Component {

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

  prepareTiles = (entries) => {
    var tiles = [];
    for (var a in entries) {


        tiles.push({
          img: entries[a].data.featuredImage,
          title: entries[a].data.recordName,
          src: URL_VIEW_RECORD + entries[a].id,
        });

        // }
    }
    return tiles;
  }


  adjustImage = (image) =>{

    return <img
        style={ {height:"100%"}}
        src={image ? URL_MULTIMEDIA + image: baseAvatarImage}
      />
  }


  render() {

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

      let tilesData = this.prepareTiles(this.props.entries)

      const baseAvatarImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

      return  <GridList
                cols={tilesData.length < 8 ? (tilesData.length < 4 ? 4 : tilesData.length) : 8}
                style={styles.gridList}
              >

                {tilesData.sort(function(a, b) {
                  // debugger;
                    if ( !a.title || !b.title){
                      return 0;
                    }
                    return a.title.trim().localeCompare(b.title.trim());
                })
              .map((tile,i) => (
                  <Link key={i} to={tile.src} style={{ textDecoration: 'none'}}>
                    <GridTile
                      key={tile.img}
                      title={tile.title}
                      subtitle={""}
                    >
                      <div style={{width:"100%",height:"100%",textAlign:"center",
                         background: 'url("'+URL_MULTIMEDIA+tile.img+'") no-repeat',
                         backgroundSize:"contain",
                         backgroundPosition: "center center"}}>
                      </div>
                    </GridTile>
                  </Link>
                ))}
              </GridList>

  }
}
