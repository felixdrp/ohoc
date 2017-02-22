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

class BrowserToEdit extends Component {
  state = { over: null };
  async componentDidMount() {
    await this.loadRecords()
  }

  overHandler = (recordId) => { this.setState({over: recordId}) }
  leaveHandler = (recordId) => { this.setState({over: null}) }
  deleteRecord = async (recordId) => {
    let fetch = new fetchData();
    let deleteRecord
    try {
      deleteRecord = await fetch.deleteRecord(recordId)

      this.setState({
        over: null
      })

      await this.loadRecords()
    } catch(error) {
      console.error('Delete record error > ' + error)
    }
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
    //  debugger;
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  async createRecord(template, subtemplate) {

    if (!template || !subtemplate) {
      return
    }

    let newRecordId
    let fetch = new fetchData();
    // Get and dispatch the template list
    newRecordId = await fetch.createRecord({
      template: template,
      subtemplate: subtemplate,
    })

    this.props.editNewRecord(newRecordId.recordId)
    // console.log(newRecordId)
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
        <CardTitle style={{marginLeft:50}}> <h1> {this.props.params.categoryId} </h1> </CardTitle>

        <Card style={{marginLeft:50,marginRight:50}}>
          <CardText>
          {
            Object.keys(state.templateList).map( (group, g) => (
              <List key={g}>
                <Subheader style={{fontWeight:"bolder"}}>
                  { group}
                </Subheader>
                {
                  Object.keys(state.templateList[group]).map( (subType, j) => (
                    <div
                      key={j}
                      style={{
                        marginLeft: 18,
                      }}
                    >
                      <h5
                        style={{
                          color: 'rgba(51, 51, 51, 0.6)',
                          fontWeight:"bolder",
                          marginTop: 0,
                          marginBottom: 5,
                          marginLeft: 18,
                        }}
                      >
                        {state.templateList[group][subType]}
                        <FlatButton
                          label="Add record"
                          primary={true}
                          style={{
                            marginLeft: 10,
                          }}
                          onClick={
                            () => this.createRecord(
                                    group,
                                    state.templateList[group][subType]
                                  )
                          }
                          // icon={<ActionAndroid />}
                        />
                      </h5>
                      {
                        // Records List
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
                              onMouseOver={() => this.overHandler(entry.id)}
                              onMouseLeave={() => this.leaveHandler(entry.id)}
                            >
                              <ListItem
                                primaryText={entry.data.recordName}
                                leftAvatar={
                                  <Avatar
                                    src={ entry.data.featuredImage? URL_MULTIMEDIA + entry.data.featuredImage: baseAvatarImage }
                                  />
                                }
                                rightIcon={<CommunicationChatBubble />}
                              >
                                {
                                  state.over == entry.id?
                                    <span
                                      style={{float:'right'}}
                                      onClick={
                                        (event) => {
                                          console.log('delete')
                                          event.preventDefault()
                                          this.deleteRecord(entry.id)
                                        }
                                      }
                                    >
                                      <Delete />
                                    </span>
                                  : ''
                                }
                              </ListItem>
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
)(BrowserToEdit);
