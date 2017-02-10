import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/image/navigate-next';

import GridView  from './gridview';
import ListView  from './listview';


import capitalize from '../stringTools'

import fetchData from '../../network/fetch-data';

import {
  URL_VIEW_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
} from '../../links'

export default class SubCategoriesView extends Component {


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
    let selectedSubCategory = entriesBySubtype[this.props.params.subcategoryId]

    if ( !selectedSubCategory ){
      return <div></div>
    }

    let showAsGrid = true

    return (
      <Card style={{paddingBottom:30, minHeight:600}}>
        <CardTitle style={{marginLeft:40}}> <h1> {capitalize(this.props.params.subcategoryId)} </h1> </CardTitle>
        <Card style={{marginLeft:50,marginRight:50,padding:5}}>

          {/* <ListView subcategoryId = {this.props.params.subcategoryId} entries = {selectedSubCategory} /> */}

          <GridView subcategoryId = {this.props.params.subcategoryId} entries = {selectedSubCategory} />

        </Card>
      </Card>
    );
  }
}
