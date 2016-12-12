import React, { Component } from 'react';
import { connect } from 'react-redux'

import fetchData from '../../network/fetch-data';
import TextField from 'material-ui/TextField';


import capitalize from '../stringTools'

import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class RecordEdit extends Component {
  constructor() {
    super()
    this.state = {
    };

    // Used to store references.
    this._input = {};
  }

  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let recordData

    try {

      recordData = await fetch.getRecordData(this.props.params.recordId)
// debugger

    } catch(error) {
      console.error('fetching record data > ' + error)
    }

    this.setState({
      recordData,
      submitted: false
    })
  }


  sendFiles(files) {
    let formData = new FormData()
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/record/upload/' + this.props.params.recordId, true);

    xhr.onload = function(e) {
      console.log(xhr.response)
      // debugger
      // resolve(xhr.response)
    };

    xhr.onerror = function(e) {
      // console.log(xhr.response)
      console.error(e)
    };

    // Listen to the upload progress.
    xhr.upload.onprogress = function(e) {
      // if (e.lengthComputable) {
      //   // console.log('e.loaded>> ' + e.loaded)
      //   // console.log('%>> ' + e.total)
      //
      //   // Update uploadList
      //   uploadList[uploadId].finishPercentage = (addFileNumber * 100 ) / totalFiles,
      //   uploadList[uploadId].sizeUploaded = sizeUploaded,
      //
      //   // Send data to ALL the uploaders Objects
      //   updateAllUploaders()
      //
      //   // If upload end
      //   if (uploadList[uploadId].finishPercentage == 100) {
      //     uploadList[uploadId].state = UPLOAD_STATUS_FINISHED
      //   }
      // }
    };

    for (let file of files) {
      formData.append('uploadedImages[]', file);
    }

    xhr.send(formData);
  }

  submitFiles = (e) => {
    e.nativeEvent.preventDefault();
    const input = this._input;
    let data
    let files = Array.from(input.uploadList.files)

    if (files.length == 0) {
      return
    }

    this.sendFiles(files)
  }

  async updateRecord() {
    let fetch = new fetchData();
    // Data to upload


    let dataToSend = {
              featuredImage : null,
              recordName :  this.state.dataToSend.name,
              media : [],
              fields : [],
              };

     for ( var k in Object.keys(this.state.dataToSend) ){

       var key = Object.keys(this.state.dataToSend)[k]

       dataToSend.fields.push({name: key, data : this.state.dataToSend[key], type : "text"});

     }


    try {
      var recordData = await fetch.setRecordData(this.props.params.recordId, dataToSend)
      this.setState({ submitted: true})
    } catch(error) {
      console.error('fetching record update data > ' + error)
    }
  }

  handleChange(event, index, value, name) {
    var currentData = this.state.dataToSend;

    if ( !currentData ){
      currentData = {}
    }

    currentData[name] = value

    this.setState({dataToSend : currentData})

  };

  render() {
    const style = {
      margin: 12,
    };

    if( this.state && this.state.submitted){
      return <div> <h1> New Record Submitted! </h1> </div>
    }

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    let currentRecord = this.state.recordData.recordById[0];

    const input = this._input;

    return (
      <Card style={{padding:30}}>

        <h1> Adding new  {currentRecord.type+" / "+currentRecord.subtype} </h1>

        {
          !!currentRecord.structure && 'info' in currentRecord.structure &&
          currentRecord.structure.info.map( (item, i) => {
            return <div key={i}> <span style={{marginRight:15}}>{capitalize(item.name)+":"}</span>
              <TextField hintText={item.name} onChange={ (event, index, value)=>this.handleChange(event, value, index,  item.name)} />
            </div>
          } )
        }

        <RaisedButton
          label="Submit"
          primary={true}
          style={style}
          onClick={() => this.updateRecord()}
        />
        <form
          name="uploadForm"
          role="form"
          style={{
            marginLeft: 30,
            marginRight: 30,
          }}
          action={ '/api/record/upload/' + this.props.params.recordId }
          method="POST"
        >
          <input
            type="file"
            multiple="multiple"
            // accept="image/*"
            name="uploadImages"
            ref={ (c) => input.uploadList = c }
            // onChange={ () => { this.newFilesSelected(); } }
            style={{
              // display: 'none',
            }}
          />
          {/* <FlatButton
            // Select files
            id="files"
            style={{
            // ...style.button1,
            backgroundColor: 'linear-gradient(135deg, red, #3F51B5)',
            color: '#222',
            }}
            type="button"
            onClick={ () => input.uploadList.click() }
            >
            Choose Files
          </FlatButton> */}
          <FlatButton
            id="submit"
            style={style.button1}
            type="submit"
            onClick={ (e) => this.submitFiles(e) }
          >
            Submit
          </FlatButton>
        </form>
      </Card>
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
    dispatch(push('/controlRoom/record/edit/' + newRecordId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEdit);
