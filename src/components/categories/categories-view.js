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


import GridView  from './gridview';
import ListView  from './listview';

import fetchData from '../../network/fetch-data';

import Halogen from 'halogen';

import {
  URL_VIEW_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_CATEGORIES_LIST,
} from '../../links'

export default class CategoriesView extends Component {
    subCategoryData = {
      "Practice" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Practice/Grays Inn Gateway.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "The Bench" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Bench/PortadaBench.jpg' , orderIndex : 2, copyrightNotice : "" },
      "Barristers" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Barristers/barristers.jpg' ,orderIndex : 1,copyrightNotice : "" },
      "Clerks" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Clerks/PortadaClerks.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Chambers" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Chambers/6PumpCourtTres.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Sketches in Court" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Sketches in Court/Sketches.png' ,orderIndex : 3,copyrightNotice : "" },

      "Solicitors and Agents" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Solicitors and Agents/GraysInnSquare001BirdandBird.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Textbooks" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Textbooks/Photograph1.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Treatises" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Treatises/ShelleyOnPatents.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Universities & Polytechnics " : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Academia/PortadaAcademia.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Law Reports" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Law Reports/FSPLR.png' ,orderIndex : 2,copyrightNotice : "" },
      "Groups and Associations" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Groups and Associations/JB_Photos16_0010.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "EIPR" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/EIPR/PropertyReview.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Civil Service" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Civil Service/PatentOfficeLibrary.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Magazines" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Magazines/TW_0002.jpg' ,orderIndex : 2,copyrightNotice : "" },
      "Campaigns" : {  src : URL_BASE_MULTIMEDIA_IMAGES + '/cat/Campaigns/PublicLendingRight2.jpg' ,orderIndex : 2,copyrightNotice : "" },

    }

  async loadCategoriesList(categoryId) {
    let fetch = new fetchData();
    // Load the templateList
    let categoriesList

    try {
      categoriesList = await fetch.getRecordsByType(categoryId)
      this.setState({categoriesList})
    //  debugger;
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  componentDidMount() {
    console.log('XD')
    return this.loadCategoriesList(this.props.params.categoryId)
  }

  componentWillReceiveProps(nextProps) {
    console.log('mlk')
    return this.loadCategoriesList(nextProps.params.categoryId)
  }

  entriesToSubtypeGroups = (list) => {
    var groupedEntries = {}

    for ( var entry in list ){
      entry = list[entry]
      if ( !groupedEntries[entry.subtype] ){
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
      var loadingIndicator = (<Halogen.MoonLoader color={"blue"}/>)

      if ( !this.state || !this.state.recordData ){
        return <Card style={{minHeight:600,textAlign:"centered"}}>
                  <div style={{width:100,height:100, marginLeft: "auto", marginRight: "auto" ,paddingTop: 30}}>{loadingIndicator}</div>
                </Card>
      }
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


    // this block is to identify the number of subcategories only.
    let subtypes = {}
    for ( var l in list ){
      subtypes[list[l].subtype] = ""
    }
    var onlyOneCategory = Object.keys(subtypes).length == 1;


    // if there is a single category, or we have explicitly selected a subcategory, then we show the records as a grid.
    if ( onlyOneCategory || this.props.params.subcategoryId ){

      let entriesBySubtype = this.entriesToSubtypeGroups(list);
      let selectedType = this.props.params.subcategoryId ? this.props.params.subcategoryId : Object.keys(subtypes)[0]
      let selectedSubCategory =  entriesBySubtype[selectedType]
      let showAsGrid = true

      return (
        <Card style={{paddingBottom:30, minHeight:600}}>
          <CardTitle style={{marginLeft:40}}> <h1> {this.props.params.subcategoryId} </h1> {this.props.params.subcategoryId === "Sketches in Court" ? <span>Sketches in Court: drawings by Sir Kenneth Swan (courtesy of Christopher Morcom, QC)</span> : ""} </CardTitle>
          <Card style={{marginLeft:50,marginRight:50,padding:5}}>
            <GridView subcategoryId = {this.props.params.subcategoryId} entries = {selectedSubCategory} />
          </Card>
        </Card>
      );

    } else { // Here categories are shown if multiple subcategories are present in the data.
        return (
          <Card style={{paddingBottom:30, minHeight:600}}>
            <CardTitle style={{marginLeft:50}}> <h1> {this.props.params.categoryId} </h1> </CardTitle>
            <Card style={{marginLeft:50,marginRight:50}}>
              <CardText>
                      <GridList
                          cols={3}
                          style={styles.gridList}
                          cellHeight={250}
                        >

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
}
