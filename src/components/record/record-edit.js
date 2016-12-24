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


    } catch(error) {
      console.error('fetching record data > ' + error)
    }


    var currentRecord = recordData.recordById[0];
    var itemList = currentRecord.data.fields

    var dataToSend = {}
    for ( var a in itemList){
      dataToSend[itemList[a].name] = itemList[a].data;
    }

    this.setState({
      recordData,
      submitted: false,
      dataToSend,
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
              media : {},
              fields : [],
              };

     for ( var k in Object.keys(this.state.dataToSend) ){

       var key = Object.keys(this.state.dataToSend)[k]

       dataToSend.fields.push({name: key, data : this.state.dataToSend[key], type : "text"});

     }

     dataToSend.media = this.state.recordData.recordById[0].data.media

    try {
      var recordData = await fetch.setRecordData(this.props.params.recordId, dataToSend)
      this.setState({ submitted: true})
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

      var currentRecord = this.state.recordData.recordById[0]
      var allowedTypes = ["image","audio","video","text"];
      var selectedType = type.split("/")[0];

      if ( allowedTypes.includes(selectedType)){
          selectedType = selectedType == "image" ? "picture" : selectedType;
          currentRecord.data.media[selectedType].splice(i,1)
      }

      var newRecordData = this.state.recordData;
          newRecordData.recordById[0] = currentRecord;
      this.setState({recordData: newRecordData});
  }

  getMediaPreviewers (arrayOfMedia){

    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){ // if the array is empty there is no reason to draw the preview container at all.
      return <div style={{width:"100%",height:200,border: "1px dashed lightgrey",backgroundColor:"lightgrey"}}>
          {
            arrayOfMedia.map( (element,i) => <RecordMediaPreviewer key={i} media={element} mediaPreviewer={this.getPreviewer} mediaDeleter={this.deleteMedia} index={i}/>)
          }
          </div>
    }

  }

  addMediaElement = (mediaObject) => {

    this.setState ({showMediaAdder : false})

    //console.log("sent shite: "+JSON.stringify(mediaObject))
    if ( !mediaObject ){
        return;
    }

    var currentRecord = this.state.recordData.recordById[0]

    if ( Array.isArray(currentRecord.data.media) ){
      currentRecord.data.media = {"text":[],"audio":[],"video":[],"picture":[]}
    }

    var allowedTypes = ["image","audio","video","text"];
    var selectedType = mediaObject.type.split("/")[0];

    if ( allowedTypes.includes(selectedType)){
        selectedType = selectedType == "image" ? "picture" : selectedType;
        var i = currentRecord.data.media[selectedType].findIndex( (element) => {return element.title == mediaObject.title && element.src == mediaObject.src}  );
        if ( i > -1 ){
          currentRecord.data.media[selectedType].splice(i,1)
        }
        currentRecord.data.media[selectedType].push(mediaObject)
    }

    var newRecordData = this.state.recordData;
        newRecordData.recordById[0] = currentRecord;
    this.setState({recordData: newRecordData});
  }

  handleChange(event, index, value, name) {
    var currentData = this.state.dataToSend;

    if ( !currentData ){
      currentData = {}
    }

    currentData[name] = value

    this.setState({dataToSend : currentData})

  };

  getPreviewer = (elem,style) =>{

      if( elem.type.includes("image/")){
         return <img style={style} src={elem.src} />
      } else if (elem.type.includes("audio/")){
         return <audio style={{width:"95%"}} controls src={elem.src}  />
      }
      return <span></span>

  }

  getExistingItem(itemList,name){
    for ( var a in itemList){
      if (itemList[a].name == name)
        return itemList[a]
    }
    return {}
  }

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

     console.log(JSON.stringify(this.state))

    let currentRecord = this.state.recordData.recordById[0];
    //.recordData.recordById[0].data.fields

    if ( !currentRecord ){
      return <div></div>
    }

    const input = this._input;



    return (

      <Card style={{padding:30}}>

        {
          this.state.showMediaAdder ? <AddMedia recordId = {this.props.params.recordId} mediaAdder={this.addMediaElement} mediaPreviewer={this.getPreviewer}/> : <div></div>
        }

        <h1> Adding new  {currentRecord.type+" / "+currentRecord.subtype} </h1>

        {
          !!currentRecord.structure && 'info' in currentRecord.structure &&
          currentRecord.structure.info.map( (item, i) => {
            return <div key={i}> <span style={{marginRight:15}}>{capitalize(item.name)+":"}</span>
              <TextField hintText={item.name} defaultValue={this.getExistingItem(currentRecord.data.fields,item.name).data || ""} onChange={ (event, index, value)=>this.handleChange(event, value, index,  item.name)} />
            </div>
          } )
        }

        <h3>Featured Photo</h3>


        <span style={{fontWeight:"bolder",fontSize:18}}>Photos</span>
        <RaisedButton
                  label="Add photo"
                  primary={true}
                  style={style}
                  onClick={() => this.toggleMultimediaAdder()}
                />
        {
          this.getMediaPreviewers(currentRecord.data.media.picture)
        }



        <span style={{fontWeight:"bolder",fontSize:18}}>Audio Recordings</span>
        <RaisedButton
          label="Add Audio Recording"
          primary={true}
          style={style}
          onClick={() => this.toggleMultimediaAdder()}
        />

        {
          this.getMediaPreviewers(currentRecord.data.media.audio, this.getPreviewer)
        }



        <span style={{fontWeight:"bolder",fontSize:18}}>Video Recordings</span>
        <RaisedButton
          label="Add Video Recording"
          primary={true}
          style={style}
          onClick={() => this.toggleMultimediaAdder()}
        />
        {
          this.getMediaPreviewers(currentRecord.data.media.video, this.getPreviewer)
        }


        <Card style={{marginTop:30,textAlign:"right"}}>

        <RaisedButton
          label="Cancel"
          primary={true}
          style={style}
          href="http://localhost:3000/controlRoom/record/create"
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
    dispatch(push('/controlRoom/record/edit/' + newRecordId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEdit);
