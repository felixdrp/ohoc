import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchData from '../../network/fetch-data';

import PreviewGenerator from './preview-generator'

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import {
  URL_CONTROL_ROOM_EDIT_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_RECORD_UPLOAD_FILE,
} from '../../links'

class RecordAddMedia extends Component {
  constructor() {
    super()
      this.state = {
        previewSource : { src : URL_BASE_MULTIMEDIA_IMAGES + 'institution-default.jpg', type : "image/jpeg"},
        dataToSend : {}
    };

    // Used to store references.
    this._input = {};
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({ dataToSend : this.props.prevData})
  }

  async componentDidMount() {

  }


  sendFiles(files) {
    let thisObject = this;
    let formData = new FormData()
    let xhr = new XMLHttpRequest();
    xhr.open('POST', URL_RECORD_UPLOAD_FILE + this.props.recordId, true);

    xhr.onload = function(e) {
      console.log(xhr.response)

      var fileToUpload = JSON.parse(xhr.response).upload.files[0]


      thisObject.setState({
        previewSource : { ...fileToUpload, src: URL_MULTIMEDIA + fileToUpload.src },
        dataToSend: {src: fileToUpload.src, type: fileToUpload.type}
      });

      console.log(JSON.stringify(thisObject.state))
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



  handleChange(event, index, value, name) {
    var currentData = this.state.dataToSend;

    if ( !currentData ){
      currentData = {}
    }
    currentData[name] = value.replace(/\n/gm, "<br/>");

    this.setState({dataToSend : currentData})

  };

  render() {

    if ( !this.props.recordId ){
      return <Card style={{padding:30}}> </Card>
    }

    const input = this._input;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={(e) => this.props.mediaAdder()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onTouchTap={(e) => this.props.mediaAdder(this.state.dataToSend)}
      />,
    ];

    return (
      <Dialog
            title="Upload File"
            actions={actions}
            modal={true}
            open={true}
          >
      <Card style={{padding:5}}>
        <Card style={{padding:0}}>
          <form
            name="uploadForm"
            role="form"
            style={{
              marginLeft: 30,
              marginRight: 30,
            }}
            action={ '/api/record/upload/' + this.props.recordId }
            method="POST"
          >
            <input
              type="file"
              multiple="multiple"
              name="uploadImages"
              ref={ (c) => input.uploadList = c }
            />

            <FlatButton
              id="submit"
              style={{backgroundColor:"#e0ebeb"}}
              type="submit"
              onClick={ (e) => this.submitFiles(e) }
            >
              Upload
            </FlatButton>
          </form>
        </Card>
        <br/>
        <span style={{fontWeight:"bold"}}>Media Preview: </span>
        <Card style={{textAlign:"center"}}>
          <PreviewGenerator element={this.state.previewSource} style={{height:300,maxWidth:700}} />
        </Card>

        <br/>

        <span style={{fontWeight:"bold"}}>Copyright notice: </span><TextField
          hintText="Copyright Notice"
          onChange={ (event, index, value)=>this.handleChange(event, value, index, "copyright")}
        /><br />

        <span style={{fontWeight:"bold"}}>Title: </span><TextField
          hintText="Media Title"
          onChange={ (event, index, value)=>this.handleChange(event, value, index, "title")}
        /><br />

        <span style={{fontWeight:"bold"}}>Transcript: </span> <TextField
         hintText="Transcript Goes Here if applicable"
         multiLine={true}
         rows={5}
         rowsMax={10}
         style={{width:790,border: "1px dashed lightgrey"}}
         onChange={ (event, index, value)=>this.handleChange(event, value, index, "transcript")}
        /><br /><br />

      </Card>
      </Dialog>
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
)(RecordAddMedia);
