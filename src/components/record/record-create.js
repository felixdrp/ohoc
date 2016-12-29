import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import fetchData from '../../network/fetch-data';

import {URL_CONTROL_ROOM_EDIT_RECORD} from '../../links'


class RecordCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // New record states
      template: '',
      subtemplate: '',
    };
  }

  async createRecord() {
    let state = this.state
    // Load the templateList
    if (!state.template) {
      return
    }

    let newRecordId
    let fetch = new fetchData();
    // Get and dispatch the template list
    newRecordId = await fetch.createRecord({
      template: state.template,
      subtemplate: state.subtemplate,
    })

    this.props.editNewRecord(newRecordId.recordId)
    // console.log(newRecordId)
  }

  handleChangeCategorie = (event, index, value) => this.setState({template: value});
  handleChangeSubcategorie = (event, index, value) => this.setState({subtemplate: value});

  render() {
    const style = {
      margin: 12,
    };

    return (
      <div>
        <h1>
          Add Record
        </h1>

        <SelectField
          floatingLabelText="Categories"
          hintText="Please, select a template"
          errorText=""
          errorStyle={{}}
          value={this.state.template}
          onChange={this.handleChangeCategorie}
        >
          {
            this.props.templateList &&
            Object.keys(this.props.templateList).map(
              (element, index) => <MenuItem key={index} value={element} primaryText={element} />
            )
          }
        </SelectField>

        {
          !!this.state.template &&
          (
            <div>
              <SelectField
                floatingLabelText="Subcategories"
                hintText="Please, select a "
                errorText=""
                errorStyle={{}}
                value={this.state.subtemplate}
                onChange={this.handleChangeSubcategorie}
              >
                {
                  this.props.templateList[this.state.template].map(
                    (element, index) => <MenuItem key={index} value={element} primaryText={element} />
                  )
                }
              </SelectField>
            </div>
          )
        }

        <div>
          <RaisedButton
            label="Add Record"
            primary={true}
            style={style}
            disabled={ !(!!this.state.template && !!this.state.subtemplate) }
            onClick={ () => this.createRecord() }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  templateList: state.templateList || null,
  // if route contains params
  params: ownProps.params,
  location: ownProps.location
})

const mapDispatchToProps = (dispatch) => ({
  editNewRecord(newRecordId) {
    dispatch(push(URL_CONTROL_ROOM_EDIT_RECORD + newRecordId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordCreate);
