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



    subCategoryData = {
      "Practice" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Practice/Grays Inn Gateway.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "The Bench" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Bench/PortadaBench.jpg' , orderIndex : 2, copyrightNotice : "(Courtesy of...)" },
      "Solicitors and Agents" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Solicitors and Agents/GraysInnSquare001BirdandBird.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Textbooks" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Textbooks/Photograph1.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Barristers" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Barristers/barristers.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Treatises" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Treatises/ShelleyOnPatents.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Clerks" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Clerks/PortadaClerks.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Universities & Polytechnics " : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Academia/PortadaAcademia.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Law Reports" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Law Reports/FSPLR.png' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Chambers" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Chambers/6PumpCourtTres.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Groups and Associations" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Groups and Associations/JB_Photos16_0010.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "EIPR" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/EIPR/PropertyReview.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Civil Service" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Civil Service/PatentOfficeLibrary.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Magazines" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Magazines/TW_0002.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
      "Campaigns" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Campaigns/PublicLendingRight2.jpg' ,orderIndex : 2,copyrightNotice : "(Courtesy of...)" },
    }




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
            title: entries[a].subtype,
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
                      cellHeight={250}
                    >
                      {/* <Subheader>{capitalize(this.props.subcategoryId)}</Subheader> */}
                      {tilesData.map((tile,i) => (
                        <Link key={i} to={tile.src} style={{ textDecoration: 'none'}}>
                          <GridTile

                            title={tile.title}
                            subtitle={this.subCategoryData[tile.title] ? this.subCategoryData[tile.title].copyrightNotice : ""}
                          >
                            <div style={{textAlign:"center",backgroundColor:"#cccccc"}}><img style={{maxHeight: 250}} src={ this.subCategoryData[tile.title] ? this.subCategoryData[tile.title].src : baseAvatarImage} /></div>
                          </GridTile>
                        </Link>
                      ))}
                    </GridList>

          </CardText>
        </Card>
      </Card>
    );
  }
}
