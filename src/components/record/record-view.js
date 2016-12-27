import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ContentLinkIcon from 'material-ui/svg-icons/content/link';
import capitalize from '../stringTools'

import fetchData from '../../network/fetch-data';

import RecordViewMediaElement from './record-view-mediaElement'

export default class RecordView extends Component {

  async componentDidMount() {
    let fetch = new fetchData();
    // Load the templateList
    let recordData

    try {
      recordData = await fetch.getRecordData(this.props.params.recordId)
      this.setState({recordData})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  getPreviewer = (elem) =>{
    var style = {maxWidth:290,maxHeight:250}
    if ( elem.src )
      if( elem.type.includes("image/")){
         return <img style={style} src={elem.src} />
      } else if (elem.type.includes("audio/")){
         return <span><img style={{maxWidth:290,maxHeight:210}} src={this.state.recordData.recordById[0].data.featuredImage || "http://localhost:3001/images/institution-default.jpg"} /><audio style={style} controls src={elem.src}  /> </span>
      } else if (elem.type.includes("video/")){
         return <video style={style} controls src={elem.src}  />
      } else {
        return <span style={{width:"100%",textAlign:"center"}}><br/><a style={style} href={elem.src} target={"_blank"}><ContentLinkIcon style={{width:80,height:80}}/><br/>{"Open in new tab: "+elem.title}</a></span>
      }
      return <span></span>
  }

  getMediaPreviewers = (arrayOfMedia) => {

    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){ // if the array is empty there is no reason to draw the preview container at all.
      return <div style={{width:"100%",height:310,padding:5,border: "1px dashed lightgrey",backgroundColor:"lightgrey"}}>
          {
            arrayOfMedia.map( (element,i) => <RecordViewMediaElement key={i} style={{maxHeight:300,maxWidth:300}} media={element} mediaPreviewer={this.getPreviewer}/>)
          }
          </div>
    }

  }

  render() {
    const style = {
      margin: 12,
    };

    if ( !this.state || !this.state.recordData ){
      return <div></div>
    }

    let recordData  = this.state.recordData.recordById[0];


    return (
      <Card style={{padding:50, paddingTop: 30}}>


        <span style ={{height:300}}>
          <span style={{textAlign:"center"}} > <img style={{maxWidth:450,maxHeight:300,border:"1px solid black"}} src={recordData.data.featuredImage || "http://localhost:3001/images/institution-default.jpg"} />  </span>
          <span style={{height:300,width:600,position:"absolute",float:"left",left:700}}>

              <h1>{capitalize(recordData.data.recordName)}</h1>
              <h3>{capitalize(recordData.type)+"/"+capitalize(recordData.subtype)}</h3>

          </span>
        </span>

        <Card style={{padding:50, paddingTop: 10, marginTop: 20}}>
        {
          recordData.data.fields.map( (entry,i) => {
            return <div key={i}>{entry.name === "featuredImage" ? "" : <span><h2>{capitalize(entry.name)}</h2>{entry.data.split("<br/>").map( (e,j) => {return <span key={j}>{e}<br/></span>})}</span>}</div>
          })
        }
        </Card>

        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Image Gallery</span>
        {
          this.getMediaPreviewers(recordData.data.media.picture)
        }

        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Audio Gallery</span>
        {
          this.getMediaPreviewers(recordData.data.media.audio)
        }

        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Video Gallery</span>
        {
          this.getMediaPreviewers(recordData.data.media.video)
        }

        <br/>
        <span style={{fontWeight:"bolder",fontSize:18}}>Text and PDF files</span>
        {
          this.getMediaPreviewers(recordData.data.media.text)
        }

      </Card>
    );
  }
}
