import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchData from '../../network/fetch-data';

import PreviewGenerator from './preview-generator'

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/LinearProgress';

// import RichTextEditor from 'react-rte';
import { EditorState, convertFromHTML,convertFromRaw,convertToRaw, ContentState} from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'; // eslint-disable-line import/no-unresolved

// import editorStyles from './editorStyles.css';

import {
  URL_CONTROL_ROOM_EDIT_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_RECORD_UPLOAD_FILE,
} from '../../links'

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

class RecordAddMedia extends Component {
  constructor() {
    super()
      this.state = {
        previewSource : { src : URL_BASE_MULTIMEDIA_IMAGES + 'institution-default.jpg', type : "image/jpeg"},
        dataToSend : {},
        mediaUploaded: false,
        transcriptBuffer: EditorState.createEmpty()
    };

    // Used to store references.
    this._input = {};
  }

  componentWillReceiveProps = (newProps) => {

    var transcript = newProps.prevData ? newProps.prevData.transcript : null

    if ( transcript ){
      try{ // Should be a contentState from raw
        transcript = EditorState.createWithContent(convertFromRaw(JSON.parse(transcript)))

      } catch (e) { //it may be html
        var blocksFromHTML = convertFromHTML(transcript)
        var state = ContentState.createFromBlockArray(
                      blocksFromHTML.contentBlocks,
                      blocksFromHTML.entityMap
                    );
        transcript = EditorState.createWithContent(state)
      }

      // debugger;
      // var blocksFromHTML = convertFromHTML(transcript)
      // var state = ContentState.createFromBlockArray(
      //   blocksFromHTML.contentBlocks,
      //   blocksFromHTML.entityMap
      // );
      // transcript = EditorState.createWithContent(state) //RichTextEditor.createValueFromString(transcript, 'html')
    } else { //then just initialise it.
      transcript = EditorState.createEmpty()
    }


    // debugger
    this.setState({ transcriptBuffer: transcript, dataToSend : newProps.prevData, mediaUploaded: newProps.prevData.src ? true : false, previewSource: {src : newProps.prevData.src, type: newProps.prevData.type } })
  }

  async componentDidMount() {

  }

  progress = (completed) =>  {
    if (completed >= 100) {
      this.setState({completed: 100, mediaUploaded:true});

    } else {
      this.setState({completed, mediaUploaded:false});

    }
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
        previewSource : { ...fileToUpload, src: URL_MULTIMEDIA + fileToUpload.src }

      });

      // debugger
      var dat = thisObject.state.dataToSend
          dat.src = fileToUpload.src
          dat.type = fileToUpload.type
          thisObject.setState({dataToSend : dat})
      //dataToSend: {src: fileToUpload.src, type: fileToUpload.type}

      //console.log(JSON.stringify(thisObject.state))
      // debugger
      // resolve(xhr.response)
    };

    xhr.onerror = function(e) {
      // console.log(xhr.response)
      console.error(e)
    };

    // Listen to the upload progress.
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        console.log('e.loaded>> ' + e.loaded)
        console.log('%>> ' + e.total)

        console.log((e.loaded/e.total)*100)

        thisObject.progress((e.loaded/e.total)*100)
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
      }
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

  onChangeTranscriptText = (value, name) => {

      this.setState({transcriptBuffer : value})
  };

  handleChange(event, index, value, name) {
    var currentData = this.state.dataToSend;

    if ( !currentData ){
      currentData = {}
    }
    currentData[name] = value //.replace(/\n/gm, "<br/>");

    console.log(currentData)
    this.setState({dataToSend : currentData})

  };


  focus = () => {
    // debugger;
    this.editor.focus();
  };

  prepareDataToSend( data ) {
    data.transcript = JSON.stringify(convertToRaw(this.state.transcriptBuffer.getCurrentContent()))
    this.props.mediaAdder(data)
  }

  render() {

    if ( !this.props.enableEditor ){
      return <div></div>
    }


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
        disabled={(!this.state.mediaUploaded)}
        onTouchTap={(e) =>  this.prepareDataToSend( this.state.dataToSend )}
      />,
    ];

    return (
      <Dialog
            title="Upload File"
            actions={actions}
            modal={true}
            open={true}

          >

                <style>{"\
                         .editor {\
                           box-sizing: border-box;\
                           border: 1px solid #ddd;\
                           cursor: text;\
                           padding: 16px;\
                           border-radius: 2px;\
                           margin-bottom: 2em;\
                           box-shadow: inset 0px 1px 8px -3px #ABABAB;\
                           background: #fefefe;\
                         }\
                 "}</style>
                    <style>{"\
                         .editor :global(.public-DraftEditor-content) {\
                           min-height: 140px;\
                         }\
                 "}</style>


      <Card style={{padding:5,height:727,overflowY:"scroll"}}>
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

            <CircularProgress
              mode="determinate"
              value={this.state.completed}
              size={25}
              color={"#76FF03"}
            />

          </form>
        </Card>
        <br/>
        <span style={{fontWeight:"bold"}}>Media Preview: </span>
        <Card style={{textAlign:"center"}}>
          <PreviewGenerator element={this.state.previewSource} style={{height:300,maxWidth:700,maxHeight:300}} />
        </Card>

        <br/>

        <span style={{fontWeight:"bold"}}>Copyright notice: </span><TextField
          hintText="Copyright Notice"
          onChange={ (event, index, value)=>this.handleChange(event, value, index, "copyright")}
          value = {this.state.dataToSend.copyright }
        /><br />

        <span style={{fontWeight:"bold"}}>Title: </span><TextField
          hintText="Media Title"
          onChange={ (event, index, value)=>this.handleChange(event, value, index, "title")}
          value = {this.state.dataToSend.title }
        /><br />

        <span style={{fontWeight:"bold"}}>Transcript: </span>

        {/* <RichTextEditor
          editorClassName="rte-editor"
          autoFocus={true}
          value={this.state.transcriptBuffer}
          onChange={(value)=>this.onChangeTranscriptText(value, "transcript") }
        /> */}
        <div style={{marginLeft:20,marginTop:15,paddingBottom:5,borderBottom:"1px solid #cccccc",height:300,overflowY:"scroll"}} onClick={this.focus}>
          <Editor editorState={this.state.transcriptBuffer}
              onChange={(value)=>this.onChangeTranscriptText(value, "transcript")}
              plugins={[inlineToolbarPlugin]}
              ref={(element) => { this.editor = element; }}
              placeholder={"Start typing here..."}
          />
          <InlineToolbar />
        </div>
        {/* <TextField
         hintText="Transcript Goes Here if applicable"
         multiLine={true}
         rows={5}
         rowsMax={5}
         style={{width:"100%",border: "1px dashed lightgrey"}}
         onChange={ (event, index, value)=>this.handleChange(event, value, index, "transcript")}
         value = { this.state.dataToSend.transcript }
        /> */}

        <br /><br />

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
