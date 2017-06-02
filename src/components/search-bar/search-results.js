import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/image/navigate-next';
import Delete from 'material-ui/svg-icons/action/delete';

import fetchData from '../../network/fetch-data';

import {
  URL_VIEW_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_CONTROL_ROOM_EDIT_RECORD,
} from '../../links'

class SearchResults extends Component {
  state = { over: null };
  async componentDidMount() {
    await this.loadRecords()
  }

  overHandler = (recordId) => { this.setState({over: recordId}) }
  leaveHandler = (recordId) => { this.setState({over: null}) }

  foundQuery = (entry, query) => {

    if ( query.length < 2 ){
      return false;
    }

    var queryTerms = query.toLowerCase().trim().split(/[ ,]+/)

    if ( entry && entry.data && entry.data.recordName ){
      // var shouldReturn = false;
      //debugger

      for (var a in queryTerms){
        if ( entry.data.recordName.toLowerCase().includes(queryTerms[a])  ){
          return {found: true, where: "recordName" };
        }
      }

      //Didn't find anything on the normal fields Let's look at the transcripts
      var foundInTranscripts = this.findQueryInTranscripts(entry.data,queryTerms);
      if ( foundInTranscripts.length > 0){
        return {found: true, where: "transcripts", transcripts: foundInTranscripts };;
      }

    }

    return {found: false};;
  }

  findQueryInTranscripts = (entry,queryTerms) => {

    var foundInTranscripts = [];

    if( entry.media && entry.media.audio){
          for( var i in entry.media.audio){

              var audioTranscript = JSON.parse(entry.media.audio[i].transcript)
              for ( var b in audioTranscript.blocks){

                    for(var t in queryTerms){
                        var found = audioTranscript.blocks[b].text.toLowerCase().includes(queryTerms[t])
                        if ( found ){ // We only care if we find one of the terms. Just very very simple matching. No Ranking.
                          //return true;
                          foundInTranscripts.push(entry.media.audio[i])
                        }
                    }
              }
          }

        }
    return foundInTranscripts
  }


  loadRecords = async () => {
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

    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }




  render() {
    const style = {
      margin: 12,
    };

    const state = this.state

    const baseAvatarImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

    if ( !this.state || !this.state.allRecordsList || !this.props.searchText){
      return <div></div>
    }

    for ( var e in state.allRecordsList ){
      var res = this.foundQuery(state.allRecordsList[e],this.props.searchText)
      state.allRecordsList[e].filterData = res;
      //debugger;
    }

    let filteredResults = state.allRecordsList
      .filter(
        entry => (
          entry.filterData.found
        )
      )

    return (
        <Card style={{marginRight:50,width:this.props.customWith ? this.props.customWith : "90%",position:"absolute"}}>
          <CardText>
            <List>
          {
            Object.keys(state.templateList).map( (group, g) => (
                <span key={g} >
                {
                  Object.keys(state.templateList[group]).map( (subType, j) => (
                    <span
                      key={j}
                      style={{
                        marginLeft: 18,
                      }}
                    >
                      {
                        // Records List
                        filteredResults
                          .filter(
                            entry => (
                              entry.type == group &&
                              entry.subtype == state.templateList[group][subType]
                            )
                          )
                          .map( (entry, i) => (
                            <Link
                              to={URL_VIEW_RECORD + entry.id}
                              key={i}
                              style={{ textDecoration: 'none'}}
                              onMouseOver={() => this.overHandler(entry.id)}
                              onMouseLeave={() => this.leaveHandler(entry.id)}
                            >
                              <ListItem
                                primaryText={entry.data.recordName + " -- " +entry.filterData.where}
                                leftAvatar={
                                  <Avatar
                                    src={ entry.data.featuredImage ? URL_MULTIMEDIA + entry.data.featuredImage: baseAvatarImage }
                                  />
                                }
                                rightIcon={<CommunicationChatBubble />}
                              >
                              </ListItem>
                            </Link>
                          )
                        )
                      }
                    </span>
                  ))
                }

            </span>))
          }
            </List>
          </CardText>
        </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => ({
  editNewRecord(newRecordId) {
    dispatch(push(URL_CONTROL_ROOM_EDIT_RECORD + newRecordId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
