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
      debugger
      recordData = await fetch.getRecordData(this.props.params.recordId)
      debugger
      this.setState({recordData: recordData.recordById[0]})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  // getPreviewer = (elem) =>{
  //   var style = {maxWidth:290,maxHeight:250}
  //   if ( elem.src )
  //     if( elem.type.includes("image/")){
  //        return <img style={style} src={elem.src} />
  //     } else if (elem.type.includes("audio/")){
  //        return <span><img style={{maxWidth:290,maxHeight:210}} src={this.state.recordData.recordById[0].data.featuredImage || "http://localhost:3001/images/institution-default.jpg"} /><audio style={style} controls src={elem.src}  /> </span>
  //     } else if (elem.type.includes("video/")){
  //        return <video style={style} controls src={elem.src}  />
  //     } else {
  //       return <span style={{width:"100%",textAlign:"center"}}><br/><a style={style} href={elem.src} target={"_blank"}><ContentLinkIcon style={{width:80,height:80}}/><br/>{"Open in new tab: "+elem.title}</a></span>
  //     }
  //     return <span></span>
  // }

  getMediaPreviewers = (arrayOfMedia,type) => {
    // if the array is empty there is no reason to draw the preview container at all.
    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){

        var allImages = []

        arrayOfMedia.map(
          (element,i) => (
            allImages.push(<div style={{width:400,height:310,textAlign:"center"}} >
              <RecordViewMediaElement
                key={i}
                style={{maxHeight:300,maxWidth:400}}
                media={{...element, src: URL_MULTIMEDIA + element.src}}
                type={type}
              />
            </div>)
          )
        )

        return (<div style={{width:400,height:310,marginTop:10,adding:5,border: "1px dashed lightgrey",backgroundColor:"lightgrey"}}>
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

  prepareLine = (name,title,data) => {
    switch (name){
      case 'featuredImage':
        return <div></div>;
      case 'name':
        return <div><h2>{data}</h2></div>
      default:
        return <div>{title}<span style={{marginLeft:10}}>{data}</span></div>
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

    let fieldsFlex = recordData.data.fields.map( (entry,i) => {
      let multiRows

      let fieldsToHide = ["biography","name"]

      let title = fieldsToHide.includes(entry.name) ? "" : <h3>{capitalize(entry.name)}</h3>


      switch (entry.type) {
        case 'multi_row':
      
          if ( entry.data === "" ){
            entry.data = []
          }
          multiRows = entry.data.map( (row, rowIndex) => {
            let rowProcessed = row.map( (cell, j) => {
              let styleBasic = {
                marginRight: 15,
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

            return <div style={{marginLeft:10}} key={rowIndex}>{rowProcessed}</div>
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
            { title }
            <div style={{marginLeft:10}} dangerouslySetInnerHTML={{__html: entry.data}} />
          </div>
        )

        default:
        //  debugger
          return (
            <div key={i}>
              { this.prepareLine(entry.name,title,entry.data) }
            </div>
          )
      }
    })

    return (
      <Card style={{padding:50,paddingRight:0, paddingTop: 30}}>


        <span style ={{height:300,display: "inline-block", verticalAlign: "top" }}>
          <img
              style={{maxWidth:345,maxHeight:300,border:"1px solid black"}}
              src={
                 recordData.data.featuredImage ?
                   URL_MULTIMEDIA + recordData.data.featuredImage:
                   baseImage
              }
            />
        </span>

                  {/* <span style={{height:300,width:600,position:"absolute",float:"left",left:700}}>

                      <h1>{capitalize(recordData.data.recordName)}</h1>
                      <h3>{capitalize(recordData.type)+"/"+capitalize(recordData.subtype)}</h3>

                  </span> */}

        <span style={{padding:50, paddingTop: 0, width:600,display: "inline-block", verticalAlign: "top"}}>
          { fieldsFlex }
        </span>

        <span style={{padding:0, paddingTop: 0, width:400,display: "inline-block", verticalAlign: "top", float:"right", position:"relative",right:50}}>
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
      </Card>
    );
  }
}
