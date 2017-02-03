import React, { Component } from 'react';
import { connect } from 'react-redux'

import fetchData from '../../network/fetch-data';
import TextField from 'material-ui/TextField';


import capitalize from '../stringTools'

import RaisedButton from 'material-ui/RaisedButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import AddMedia from './record-addMedia'
import RecordMediaPreviewer from './record-mediaPreviewer'

import { MultipleRowInput } from '../multiple-row-input'

import {
  URL_CONTROL_ROOM_EDIT_RECORD,
  URL_CONTROL_ROOM_CREATE_RECORD,
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
  URL_RECORD_UPLOAD_FILE,
} from '../../links'


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
    var dataToSend = {}

    try {
      recordData = await fetch.getRecordData(this.props.params.recordId)
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
    // debugger;

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
      var itemList = recordData.data.fields
      for ( var a in itemList){
        if (recordData.structure.info[a] && recordData.structure.info[a].type == 'text') {
          dataToSend[itemList[a].name] = itemList[a].data && itemList[a].data.replace("<br/>","\n");
        } else {
          dataToSend[itemList[a].name] = itemList[a].data
        }
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
    const state = this.state
    // Data to upload

    let dataToSend = {
      featuredImage : state.dataToSend.featuredImage,
      recordName :  state.dataToSend.name,
      media : state.recordData.data.media,
      fields : state.recordData.data.fields,
    };
    // debugger

    dataToSend.fields = dataToSend.fields.map( (field, i) => {
      switch (state.recordData.structure.info[i]) {
        case 'text':
          return { ...field, data: state.dataToSend[field.name].replace(/\n/gm, "<br/>") }
        default:
          return field
      }
    })
    //
    // for ( var k in Object.keys(state.dataToSend) ){
    //   var key = Object.keys(state.dataToSend)[k]
    //
    //   var fieldData = state.dataToSend[key].replace(/\n/gm, "<br/>");
    //
    //   dataToSend.fields.push({name: key, data : fieldData, type : "text"});
    // }

     try {
       var recordData = await fetch.setRecordData(this.props.params.recordId, dataToSend)
       this.setState({ submitted: true })
     } catch(error) {
       console.error('fetching record update data > ' + error)
     }
  }

  toggleMultimediaAdder (){

      this.setState ({showMediaAdder : true})

  }

  /*
  * the type determines which media array to use when splicing at index i
  */
  deleteMedia = (type, i) => {
    //alert("imagine we delete "+type+" "+i)

    var recordData = this.state.recordData
    var allowedTypes = ["image","audio","video","text"];
    var selectedType = type.split("/")[0];

    if ( allowedTypes.includes(selectedType)){
        selectedType = selectedType == "image" ? "picture" : selectedType;
        recordData.data.media[selectedType].splice(i,1)
    }

    this.setState({ recordData });
  }

  getMediaPreviewers (arrayOfMedia){
    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){ // if the array is empty there is no reason to draw the preview container at all.
      return (
        <div style={{width:"100%",height:200,border: "1px dashed lightgrey",backgroundColor:"lightgrey"}}>
        {
          arrayOfMedia.map( (element,i) => (
            <RecordMediaPreviewer
              key={i}
              media={{...element, src: URL_MULTIMEDIA + element.src}}
              mediaDeleter={this.deleteMedia}
              index={i}
            />)
          )
        }
        </div>
      )
    }
  }

  addMediaElement = (mediaObject) => {

    this.setState ({showMediaAdder : false})

    //console.log("sent shite: "+JSON.stringify(mediaObject))
    if ( !mediaObject ){
        return;
    }

    var recordData = this.state.recordData

    if ( Array.isArray(recordData.data.media) ){
      recordData.data.media = {"text":[],"audio":[],"video":[],"picture":[]}
    }

    var allowedTypes = ["image","audio","video","text","application"];
    var selectedType = mediaObject.type.split("/")[0];

    if ( allowedTypes.includes(selectedType)){
        selectedType = selectedType == "image" ? "picture" : selectedType;
        selectedType = selectedType == "application" ? "text" : selectedType;
        var i = recordData.data.media[selectedType].findIndex( (element) => {return element.title == mediaObject.title && element.src == mediaObject.src}  );
        if ( i > -1 ){
          recordData.data.media[selectedType].splice(i,1)
        }
        recordData.data.media[selectedType].push(mediaObject)
    }

    this.setState({ recordData });
  }

  handleChange(event, index, value, name) {
    var dataToSend = this.state.dataToSend;

    if ( !dataToSend ){
      dataToSend = {}
    }

    dataToSend[name] = value

    this.setState({dataToSend : dataToSend})
  };

  updateMultilineData(name, index, data) {
    var dataToSend = this.state.dataToSend;
    var recordData = this.state.recordData;

    if (recordData.data.fields[index].name != name) {
      return
    }

    dataToSend[name] = data
    recordData.data.fields[index].data = data

    this.setState({
      dataToSend: dataToSend,
      recordData,
      updated: Date.now(),
    })
  }

  //
  // getPreviewer = (elem,style) => {
  //   if ( elem.src )
  //     if( elem.type.includes("image/")){
  //        return <img style={style} src={URL_MULTIMEDIA + elem.src} />
  //     } else if (elem.type.includes("audio/")){
  //        return <audio style={{width:"95%"}} controls src={URL_MULTIMEDIA + elem.src}  />
  //     } else if (elem.type.includes("video/")){
  //        return <video style={{width:"95%"}} controls src={URL_MULTIMEDIA + elem.src}  />
  //     } else {
  //       return <a style={{width:"95%"}} href={URL_MULTIMEDIA + elem.src} target={"_blank"} >{elem.title}</a>
  //     }
  //     return <span></span>
  // }

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
      return <div> <h1> New Record Submitted! </h1> </div>
    }

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    // console.log(JSON.stringify(this.state))

    let recordData = this.state.recordData;

    if (Object.keys(recordData.data).length < 1 ){
      recordData.data = JSON.parse(JSON.stringify(recordData.structure));
    }


    if ( !recordData ){
      return <div></div>
    }

    if ( !!recordData.structure && 'info' in recordData.structure ) {
      formFlexibleTemplate = recordData.structure.info.map( (item, i) => {
        let data = recordData.data.fields[i].data || {}
        let template = recordData.structure.info[i]

        switch (item.type) {
          case 'multi_row':
            template = item.template

            if (data.constructor.name != 'Array') {
              data = []
            }

            return (
              <div key={i}>
                <span style={{marginRight:15, fontWeight:"bold"}}>{capitalize(item.name)+":"}</span>
                <MultipleRowInput
                  template={template}
                  data={data}
                  updateData={ (newData) => this.updateMultilineData(item.name, i, newData) }
                />
              </div>
            )
          // default:

        }
        return (
          <div key={i}>
            <span style={{marginRight:15,fontWeight:"bold"}}>{capitalize(item.name)+":"}</span>
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

        {
          this.state.showMediaAdder ? <AddMedia recordId={this.props.params.recordId} mediaAdder={this.addMediaElement} /> : <div></div>
        }

        <h1> Adding new  {recordData.type + " / " + recordData.subtype} </h1>

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
          href={URL_CONTROL_ROOM_CREATE_RECORD}
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
