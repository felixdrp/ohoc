import React, { Component } from 'react';
import { connect } from 'react-redux'

import fetchData from '../../network/fetch-data';
import TextField from 'material-ui/TextField';

import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
//import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'; // eslint-disable-line import/no-unresolved

import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved

import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AddMedia from './record-addMedia'
import RecordMediaPreviewer from './record-mediaPreviewer'

import { MultipleRowInput } from '../multiple-row-input'

import { Link } from 'react-router'

import 'draft-js-inline-toolbar-plugin/lib/plugin.css'; // eslint-disable-line import/no-unresolved

import {
  URL_CONTROL_ROOM_EDIT_RECORD,
  URL_CONTROL_ROOM_CREATE_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_RECORD_UPLOAD_FILE,
  URL_CONTROL_ROOM,
  URL_VIEW_RECORD,
} from '../../links'




//const sideToolbarPlugin = createSideToolbarPlugin();

class RecordEdit extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      toolbarPlugins : {},
      // value: RichTextEditor.createEmptyValue(),
      // value: RichTextEditor.createValueFromString(markup, 'html'),
    };

    // Used to store references.
    this._input = {};
  }

  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let recordData
    var dataToSend = {}

    try {
      recordData = await fetch.getRecordData(this.props.params.recordId)
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
    // debugger;

    if ( recordData === undefined ){
      return
    }

    recordData = recordData.recordById[0];

    // If it is a new record, the fields and media arrays do not exist. So we create them here:
    if (Object.keys(recordData.data).length < 1 ){
      recordData.data.fields = []

      for( var fieldKey in recordData.structure.info ){
        var infoField = recordData.structure.info[fieldKey]
        recordData.data.fields.push({data:"", type: infoField.type, name: infoField.name})
      }

      recordData.data.media = JSON.parse(JSON.stringify(recordData.structure.media));

    } else{
      // Else if we are editing, we need to populate the dataToSend variable, since onchange may not be executed on the textfields.
      // Load featuredImage
      dataToSend['featuredImage'] = recordData.data.featuredImage
      // load fields
      var itemList = recordData.data.fields
      for ( var a in itemList){
        // if (recordData.structure.info[a] && recordData.structure.info[a].type == 'text') {
        //   dataToSend[itemList[a].name] = itemList[a].data && itemList[a].data.replace("<br/>","\n");
        // } else {
          dataToSend[itemList[a].name] = itemList[a].data
        // }
      }
    }

    this.setState({
      recordData,
      submitted: false,
      dataToSend,
    })
  }

  sendFiles(files) {
    let formData = new FormData()
    let thisObject = this;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', URL_RECORD_UPLOAD_FILE + this.props.params.recordId, true);

    xhr.onload = function(e) {
      var fileToUpload = JSON.parse(xhr.response).upload.files[0]
      //"http://localhost:3001/multimedia/"
      fileToUpload.src = fileToUpload.src;

      var dataToSend = thisObject.state.dataToSend
      dataToSend.featuredImage = fileToUpload.src

      thisObject.setState({dataToSend})
    };

    xhr.onerror = function(e) {
      // console.log(xhr.response)
      console.error(e)
    };

      // Listen to the upload progress.
      xhr.upload.onprogress = function(e) {
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
    const state = this.state
    // Data to upload



    let prepareDataToSend = {
      featuredImage : state.dataToSend.featuredImage,
      recordName :  state.dataToSend.Name,
      media : state.recordData.data.media,
      fields : [],
    };

    prepareDataToSend.fields = Object.keys(state.dataToSend).map( (name, i) => {
          let temporaldata
          let type

          for ( var a in state.recordData.structure.info){
            if ( state.recordData.structure.info[a].name === name){
                 type = state.recordData.structure.info[a].type
                 break;
            }
          }

          var data = state.dataToSend[name]

          if ( type === "rich_text"){
            var currentContentState = data.getCurrentContent()
            var rawContentState = convertToRaw(currentContentState)
            data = JSON.stringify(rawContentState)
          }

          let field = {name: name, type: type, data: data}

          return field
     })

     try {
       var recordData = await fetch.setRecordData(this.props.params.recordId, prepareDataToSend)
       this.setState({ submitted: true })
     } catch(error) {
       console.error('fetching record update data > ' + error)
     }
  }

  toggleMultimediaAdder (){

      this.setState ({showMediaAdder : true, previousData : {} })

  }

  /*
  * the type determines which media array to use when splicing at index i
  */
  deleteMedia = (type, i) => {
    var recordData = this.state.recordData
    var allowedTypes = ["image","audio","video","text","application"];
    var selectedType = type.split("/")[0];

    if ( allowedTypes.includes(selectedType)){
      selectedType = selectedType == "image" ? "picture" : selectedType;
      selectedType = selectedType == "application" ? "text" : selectedType;
      recordData.data.media[selectedType].splice(i,1)
    }
    this.setState({ recordData });
  }

  shiftPosition = (type, i, forward) => {
    var recordData = this.state.recordData
    var allowedTypes = ["image","audio","video","text","application"];
    var selectedType = type.split("/")[0];

    if ( allowedTypes.includes(selectedType)){
      selectedType = selectedType == "image" ? "picture" : selectedType;
      selectedType = selectedType == "application" ? "text" : selectedType;

      if (forward){
         if ( !((i+1) >= recordData.data.media[selectedType].length ) ){

           var shift = JSON.parse(JSON.stringify(recordData.data.media[selectedType][i]))
           var shift2 = JSON.parse(JSON.stringify(recordData.data.media[selectedType][i+1]))
           recordData.data.media[selectedType][i+1] = shift
           recordData.data.media[selectedType][i] = shift2
         }
      } else {
        if ( !(i-1 < 0) ){
          var shift = JSON.parse(JSON.stringify(recordData.data.media[selectedType][i]))
          var shift2 = JSON.parse(JSON.stringify(recordData.data.media[selectedType][i-1]))
          recordData.data.media[selectedType][i-1] = shift
          recordData.data.media[selectedType][i] = shift2
        }
      }
    }
    this.setState({ recordData });
  }

  /*
  * the type determines which media array to use when splicing at index i
  */
  updateMedia = (type, i, data) => {
    this.setState({showMediaAdder : true, previousData : data });
  }



  getMediaPreviewers (arrayOfMedia){
    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){ // if the array is empty there is no reason to draw the preview container at all.
      return (
        <div style={{width:"100%",height:200,border: "1px dashed lightgrey",backgroundColor:"lightgrey", overflowY:"scroll"}}>
        {
          arrayOfMedia.map( (element,i) => (
            <RecordMediaPreviewer
              key={i}
              media={{...element, src: URL_MULTIMEDIA + element.src}}
              mediaDeleter={this.deleteMedia}
              mediaUpdater={this.updateMedia}
              mediaShifter={this.shiftPosition}
              index={i}
            />)
          )
        }
        </div>
      )
    }
  }

  addMediaElement = (mediaObject) => {
    // debugger
    this.setState ({showMediaAdder : false})

    //console.log("sent shite: "+JSON.stringify(mediaObject))
    if ( !mediaObject ){
        return;
    }

    mediaObject.src = mediaObject.src.replace(URL_MULTIMEDIA, "")

    var recordData = this.state.recordData

    if ( Array.isArray(recordData.data.media) ){
      recordData.data.media = {"text":[],"audio":[],"video":[],"picture":[]}
    }

    var allowedTypes = ["image","audio","video","text","application"];
    var selectedType = mediaObject.type.split("/")[0];

    if ( allowedTypes.includes(selectedType)){
        selectedType = selectedType == "image" ? "picture" : selectedType;
        selectedType = selectedType == "application" ? "text" : selectedType;
        var i = recordData.data.media[selectedType].findIndex(

          (element) => { return mediaObject.src == element.src }

        );

        if ( i > -1 ){
          recordData.data.media[selectedType].splice(i,1)
        }
        // debugger;
        recordData.data.media[selectedType].push(mediaObject)
    }

    this.setState({ recordData });
  }

  focus = (e) => {
    this.editor[e].focus();
  };

  handleChange(event, index, value, name) {
    var dataToSend = this.state.dataToSend;

    if ( !dataToSend ){
      dataToSend = {}
    }

    dataToSend[name] = value

    this.setState({dataToSend : dataToSend})
  };

  onChangeRichText = (index, name, value) => {
    this._input[index] = value
    var dataToSend = this.state.dataToSend;

    if ( !dataToSend ){
      dataToSend = {}
    }

    dataToSend[name] = value; // conversion for storage
    this.setState({dataToSend : dataToSend})
  };

  updateMultilineData(name, index, data) {
    var dataToSend = this.state.dataToSend;
    var recordData = this.state.recordData;

    // if (recordData.data.fields[index].name != name) {
    //   return
    // }


    dataToSend[name] = data

    var foundIt = false;
    for ( var a in recordData.data.fields){

       if ( recordData.data.fields[a].name === name){
            recordData.data.fields[a].data = data
            foundIt = true;
            break;
       }
    }

    if (!foundIt){
        let getType
        for ( var a in recordData.structure.info){
          if ( recordData.structure.info[a].name === name){
               getType = recordData.structure.info[a].type
               break;
          }
        }
        recordData.data.fields.push({name : name, data : data, type: getType })
    }



    this.setState({
      dataToSend: dataToSend,
      recordData,
      updated: Date.now(),
    })
  }

  initialiseEditor(item,i,input){
    if( !this.state.toolbarPlugins[item.name] ){
     this.state.toolbarPlugins[item.name] = createInlineToolbarPlugin({
       structure: [
         BoldButton,
         ItalicButton,
         UnderlineButton,
         CodeButton,
         Separator,
         HeadlineOneButton,
         HeadlineTwoButton,
         HeadlineThreeButton,
         UnorderedListButton,
         OrderedListButton,
         BlockquoteButton,
         CodeBlockButton,
       ]
     });
     }

    return <div>
            <Editor editorState={input[i]}
              onChange={(value) => this.onChangeRichText(i, item.name, value)}
              plugins={[this.state.toolbarPlugins[item.name]]}
              ref={(element) => { if (!this.editor) { this.editor = {} }; this.editor[item.name] = element; }}
              placeholder={item.name}
            />
             {this.state.toolbarPlugins[item.name].InlineToolbar.prototype.render()}
            </div>
  }

  getExistingItem(itemList,name) {
    for ( var a in itemList){
      if (itemList[a].name == name)
        return itemList[a]
    }
    return { data: '' }
  }

  render() {
    const style = {
      margin: 12,
    };
    const input = this._input;
    var formFlexibleTemplate = []

    if( this.state && this.state.submitted){
      return <Card style={{padding:20}}><div> <h1> New Record Submitted! </h1>

                  <Link to={URL_VIEW_RECORD+this.props.params.recordId} target="_blank"> <h2> View changes... </h2></Link>

                  <Link to={URL_CONTROL_ROOM}> <h2> Back to Control Room... </h2></Link>
            </div></Card>
    }

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    let recordData = this.state.recordData;

    if (Object.keys(recordData.data).length < 1 ){
      recordData.data = JSON.parse(JSON.stringify(recordData.structure));
    }


    if ( !recordData ){
      return <div></div>
    }

    if ( !!recordData.structure && 'info' in recordData.structure ) {
      formFlexibleTemplate = recordData.structure.info.map( (item, i) => {

        let template = recordData.structure.info[i]

        let data = {}
        let dataEmpty = true
        for (var a in recordData.data.fields){
          if ( recordData.data.fields[a].name === recordData.structure.info[i].name){
            data = recordData.data.fields[a].data
            dataEmpty = false
          //  debugger
            if ( !data ){
              dataEmpty = true
            }

            //debugger
          }
        }

        //let data = recordData.data.fields[i].data || {}

        switch (item.type) {
          case 'multi_row':
            template = item.template

            if (data.constructor.name != 'Array') {
              data = []
            }

            return (
              <div key={i}>
                <span style={{marginRight:15, fontWeight:"bold"}}>{item.name+":"}</span>
                <MultipleRowInput
                  template={template}
                  data={data}
                  updateData={ (newData) => this.updateMultilineData(item.name, i, newData) }
                />
              </div>
            )

          case 'rich_text':

            if (!input[i]) {
              if (!dataEmpty) {

                // debugger
                if ( typeof data == "string" && data.length > 0){
                  try{ // Should be a contentState from raw
                    input[i] = EditorState.createWithContent(convertFromRaw(JSON.parse(data)))

                  } catch (e) { //it may be html
                    var blocksFromHTML = convertFromHTML(data)
                    var state = ContentState.createFromBlockArray(
                                  blocksFromHTML.contentBlocks,
                                  blocksFromHTML.entityMap
                                );
                    input[i] = EditorState.createWithContent(state)
                  }

                } else {
                  input[i] = EditorState.createWithContent(convertFromRaw(data))
                }

                 //RichTextEditor.createValueFromString(transcript, 'html')
              } else { //then just initialise it.
                input[i] = EditorState.createEmpty()
              }
            }

            return (
              <div key={i}>
                <span style={{marginRight:15, fontWeight:"bold"}}>{item.name+":"}</span>
                <div style={{marginLeft:20,marginTop:15,paddingBottom:5,borderBottom:"1px solid #cccccc",maxHeight:300,overflowY:"scroll"}} onClick={(e) => this.focus(item.name)}>
                  {this.initialiseEditor(item,i,input)}
                </div>
              </div>

            )
          // default:

        }
        return (
          <div key={i}>
            <span style={{marginRight:15,fontWeight:"bold"}}>{item.name+":"}</span>
            <TextField hintText={item.name} multiLine={true}
            rows={1}
            rowsMax={10}
            style={{width:790}}
            defaultValue={ this.getExistingItem(recordData.data.fields,item.name).data.replace(/<br\/>/gm,"\n") || ''}
            onChange={ (event, index, value)=>this.handleChange(event, value, index,  item.name)} />
          </div>
        )
      })
    }

    return (


      <Card style={{padding:30}}>

        <style>{"\
               .public-DraftEditorPlaceholder-inner {\
                 position: absolute;\
                 color: #aaaaaa;\
               }\
             "}</style>

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

        <AddMedia enableEditor={this.state.showMediaAdder} recordId={this.props.params.recordId} mediaAdder={this.addMediaElement} prevData={this.state.previousData}/>

        <h1> Adding/Editing  {recordData.type + " / " + recordData.subtype} </h1>

        { formFlexibleTemplate }

        <br/><span style={{fontWeight:"bolder",fontSize:18}}>Featured Photo</span>

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

        <img
          style={{maxWidth:500,maxHeight:300,marginTop:5}}
          src={
            this.state.dataToSend.featuredImage ?
              URL_MULTIMEDIA + this.state.dataToSend.featuredImage :
              URL_BASE_MULTIMEDIA_IMAGES + "institution-default.jpg"
          }
        />

        <br/>
        <br/>

        <span style={{fontWeight:"bolder",fontSize:18}}>Photos</span>
        <RaisedButton
          label="Add photo"
          primary={true}
          style={style}
          onClick={() => this.toggleMultimediaAdder()}
        />
        {
          this.getMediaPreviewers(recordData.data.media.picture)
        }


        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Audio Recordings</span>
        <RaisedButton
          label="Add Audio Recording"
          primary={true}
          style={style}
          onClick={() => this.toggleMultimediaAdder()}
        />

        {
          this.getMediaPreviewers(recordData.data.media.audio)
        }


        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Video Recordings</span>
        <RaisedButton
          label="Add Video Recording"
          primary={true}
          style={style}
          onClick={() => this.toggleMultimediaAdder()}
        />
        {
          this.getMediaPreviewers(recordData.data.media.video)
        }

        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Docs and PDFs</span>
        <RaisedButton
          label="Add PDF or text document"
          primary={true}
          style={style}
          onClick={() => this.toggleMultimediaAdder()}
        />
        {
          this.getMediaPreviewers(recordData.data.media.text)
        }


        <Card style={{marginTop:30,textAlign:"right"}}>

        <RaisedButton
          label="Cancel"
          primary={true}
          style={style}
          href={URL_CONTROL_ROOM}
        />

        <RaisedButton
          label="Submit"
          primary={true}
          style={style}
          onClick={() => this.updateRecord()}
        />
        </Card>

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
    dispatch(push(URL_CONTROL_ROOM_EDIT_RECORD + newRecordId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEdit);
