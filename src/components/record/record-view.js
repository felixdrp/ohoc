import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ContentLinkIcon from 'material-ui/svg-icons/content/link';
import capitalize from '../stringTools'

import fetchData from '../../network/fetch-data';

import Carousel from 'nuka-carousel';

import RecordViewMediaElement from './record-view-mediaElement'

import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';





import {
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
} from '../../links'

export default class RecordView extends Component {

  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateListdialog
    let recordData

    try {

      recordData = await fetch.getRecordData(this.props.params.recordId)

      this.setState({recordData: recordData.recordById[0]})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }


  getMediaPreviewers = (arrayOfMedia,type) => {
    // if the array is empty there is no reason to draw the preview container at all.
    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){

        var allImages = []

        arrayOfMedia.map(
          (element,i) => (
            allImages.push(<div key={i} style={{width:"100%",height:310,textAlign:"center"}} >
              <RecordViewMediaElement
                key={i}
                style={{maxHeight:300,maxWidth:400}}
                media={{...element, src: URL_MULTIMEDIA + element.src}}
                type={type}
              />
            </div>)
          )
        )

        return (<div style={{width:400,height:310,marginTop:0,adding:5,border: "1px dashed lightgrey",backgroundColor:"lightgrey"}}>
                  <Carousel>
                        {allImages}

                  </Carousel>
                </div>)
    }

    return <div></div>
  }

  sectionTitle = (title) => {
    return (
      <span style={{fontWeight:"bolder",fontSize:20}}>
        {title}
      </span>
    )
  }

  richTextToComponent = (textStateFromDB) => {
    var componentToReturn
    try {
      componentToReturn = EditorState.createWithContent(convertFromRaw(JSON.parse(textStateFromDB)))
      componentToReturn = <Editor editorState={componentToReturn} onChange={(value) => {return null}} />
    } catch (e){
      componentToReturn = <div style={{marginLeft:10}} dangerouslySetInnerHTML={{__html: textStateFromDB}} />
    }
    return componentToReturn
  }

  prepareLine = (name,title,data) => {


    switch (name){
      case 'featuredImage':
        return <div></div>;
      case 'name':
        return <div><h3 style={{fontSize:18}}>{data}</h3></div>
      default:
        return <div>{title}<span style={{marginLeft:0}}>{data}</span></div>
    }
  }

  render() {
    const style = {
      margin: 12,
    };

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    const baseImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

    let recordData  = this.state.recordData;

    let copyrightNotice = ""

    for ( var f in recordData.data.fields ){

      if ( recordData.data.fields[f].name === "featured copyright notice" ){
          copyrightNotice = recordData.data.fields[f].data
          break
      }

    }

    let fieldsFlex = recordData.data.fields.map( (entry,i) => {
      let multiRows

      let fieldsToHide = ["biography","name",""]

      let title = fieldsToHide.includes(entry.name) ? "" : <h3 style={{fontSize:17}}>{capitalize(entry.name)}</h3>

      if ( !entry.data || entry.name == "featured copyright notice"){ // If there is no data, we do not want to print the titles/names of the fields
        return <div key={i}></div>
      }

      switch (entry.type) {
        case 'multi_row':

          if ( entry.data === "" ){
            entry.data = []
          }

          //Should be an array, but there was some old data that was a string. So we handle that with the following return.
          if ( typeof entry.data === 'string'){
            return <span> {entry.data} </span>
          }

          // debugger;
          multiRows = entry.data.map( (row, rowIndex) => {
            let rowProcessed = row.map( (cell, j) => {
              let styleBasic = {
                marginRight: 0,
              }

              switch (cell.name) {
                // case
                case 'name':
                  return <span key={j} style={{...styleBasic,fontStyle:"italic"}}>{cell.data}</span>
                case 'date':
                  return <span key={j} style={{...styleBasic}}>{cell.data}</span>
                case 'reference':
                  return <span key={j} style={{...styleBasic}}>{cell.data}</span>
                // references
                case 'autor':
                  return <span key={j} style={{...styleBasic}}>{cell.data}</span>
                case 'title':
                  return <span key={j} style={{...styleBasic,fontStyle:"italic"}}>{cell.data}</span>
                case 'publication info':
                  return <span key={j} style={{...styleBasic}}>{cell.data}</span>

                default:
                  return <span key={j} style={{...styleBasic}}>{cell.data}</span>
              }
            })

            return <div style={{marginLeft:0}} key={rowIndex}>{rowProcessed}</div>
          })


          return (
            <div key={i}>
              { title }
              <div>
                {multiRows}
              </div>
            </div>
          )

        case 'rich_text':
        return (
          <div key={i}>
            {title}
            {this.richTextToComponent(entry.data)}
            {/* <div style={{marginLeft:10}} dangerouslySetInnerHTML={{__html: entry.data}} /> */}
          </div>
        )

        default:
          return (
            <div key={i}>
              { this.prepareLine(entry.name,title,entry.data) }
            </div>
          )
      }
    })

    return (
      <Card style={{padding:30}}>
          <style>{"\
                 .public-DraftEditor-content div{\
                   word-wrap:normal;\
                 }\
               "}</style>

          <span style={{ width:"100%", display: "inline-block", verticalAlign: "top"}}>

            <span style ={{maxHeight:300, display: "inline-block", verticalAlign: "top", float:"left",margin:5,marginRight:10}}>
              <Card
                  style={{maxWidth:345,border:"1px solid black"}}
                  src={
                     recordData.data.featuredImage ?
                       URL_MULTIMEDIA + recordData.data.featuredImage:
                       baseImage
                  }
              >
                <CardMedia
                  overlay={<CardTitle title={copyrightNotice} style={{margin:0,padding:0,height:40}} titleStyle={{fontSize:10,lineHeight: 1,padding:5}} ></CardTitle>}
                >
                  <span style={{width:345,height:250}}><img style={{maxHeight: 250,maxWidth:343}} src={
                       recordData.data.featuredImage ?
                       URL_MULTIMEDIA + recordData.data.featuredImage:
                       baseImage
                  } /></span>
                </CardMedia>
              </Card>
            </span>


            <span style={{maxWidth:"50%", display: "inline-block", verticalAlign: "top", float:"right",marginLeft:20}}>
              {/* { recordData.data.media.picture.length > 0 ? this.sectionTitle('Image Gallery') : "" } */}
              {
                this.getMediaPreviewers(recordData.data.media.picture,"picture")
              }

              <br/>
              {/* { recordData.data.media.audio.length > 0 ? this.sectionTitle('Audio Gallery') : "" } */}
              {
                this.getMediaPreviewers(recordData.data.media.audio,"audio")
              }

              <br/>
              {/* { recordData.data.media.video.length > 0 ? this.sectionTitle('Video Gallery') : ""  } */}
              {
                this.getMediaPreviewers(recordData.data.media.video,"video")
              }

              <br/>
              {/* { recordData.data.media.text.length > 0 ? this.sectionTitle('Text and PDF files') : ""  } */}
              {
                this.getMediaPreviewers(recordData.data.media.text,"text")
              }
            </span>

            <span style={{width:"80%"}}>
            { fieldsFlex }
            </span>
          </span>
      </Card>
    );
  }
}
