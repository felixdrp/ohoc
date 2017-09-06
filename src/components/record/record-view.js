import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ContentLinkIcon from 'material-ui/svg-icons/content/link';

import fetchData from '../../network/fetch-data';

import Carousel from 'nuka-carousel';

import RecordViewMediaElement from './record-view-mediaElement'

import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import Measure from 'react-measure';

import Lightbox from 'react-image-lightbox';

import Preload from 'react-preload';

import Halogen from 'halogen';


import Backkey from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Rightkey from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

var createReactClass = require('create-react-class');

import {
  URL_BASE_MULTIMEDIA_IMAGES,
  URL_MULTIMEDIA,
} from '../../links'

import referenceStyles from './referenceStyles.css';


import injectSheet from 'react-jss'

const styles = {
  button: {
    backgroundColor: 'yellow'
  },
  label: {
    fontWeight: 'bold'
  },
}

@injectSheet(styles)
export default class RecordView extends Component {
  state = {
      dimensions: {
        width: -1,
        height: -1
      }
    }

  async componentWillMount() {
    let fetch = new fetchData();
    // Load the templateListdialog
    let recordData


    try {
      recordData = await fetch.getRecordData(this.props.params.recordId)

      // Save the scroll position to return on unmount.
      this._initialScroll = document.body.scrollTop
      // Go to the top of the page
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.setState({recordData: recordData.recordById[0]})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  async componentWillReceiveProps(nextProps) {
    let fetch = new fetchData();
    // Load the templateListdialog
    let recordData

    try {
      recordData = await fetch.getRecordData(nextProps.params.recordId)
      this.setState({recordData: recordData.recordById[0]})
    } catch(error) {
      console.error('fetching record data > ' + error)
    }
  }

  componentWillUnmount() {
    document.body.scrollTop = this._initialScroll
  }

  getMediaPreviewers = (arrayOfMedia, type) => {
    // if the array is empty there is no reason to draw the preview container at all.

    var buttonSize = 35
    if ( Array.isArray(arrayOfMedia) && arrayOfMedia.length > 0){

      var Decorators = [{
        component: createReactClass({
          render() {
            return (
              <span
                onClick={this.props.previousSlide}>
                <Backkey className={"carouselButton"} style={{width:buttonSize,height:buttonSize}} ></Backkey>
              </span>
            )
          }
        }),
        position: 'CenterLeft',
        // style: {
        //   padding: 20
        // }
      },
      {
        component: createReactClass({
          render() {
            return (
              <span
                onClick={this.props.nextSlide}>
                <Rightkey className={"carouselButton"} style={{width:buttonSize,height:buttonSize}}></Rightkey>
              </span>
            )
          }
        }),
        position: 'CenterRight',
        // style: {
        //   padding: 20
        // }
      }];



       var minHeight;
       var maxWidth;
       var marginLeft = "1%"

       switch (type) {
         case "picture":
            minHeight =  310
            maxWidth = 400

           break;
         case "audio":
            minHeight =  "auto"
            maxWidth = 400
           break;
         case "text":
            minHeight =  100
            maxWidth = 250
            marginLeft = "1%"
           break;
         default:
           minHeight =  "auto"
       }


        var allMedia = []

        arrayOfMedia.map(
          (element,i) => (
            allMedia.push(<div key={i} style={{width:"98%", height: minHeight,textAlign:"center", marginTop:5, marginLeft: marginLeft}} >
              <RecordViewMediaElement
                key={i}
                style={{maxHeight:320,maxWidth:maxWidth, minHeight: minHeight, marginRight:10}}
                media={{...element, src: URL_MULTIMEDIA + element.src}}
                type={type}
              />
            </div>)
          )
        )

        var commonStyle = {marginBottom:5}


        if ( type == "audio") {
          return allMedia.map(
            (element,i) => (
                <span key={i} style={{...commonStyle, width:360}} >{element}</span>
            ))
        } else {
          return (<div style={{...commonStyle, width:360, minHeight : minHeight, marginTop:10, border: "1px dashed lightgrey",backgroundColor:"#e8e8e8"}}>
                    <Carousel decorators={Decorators}>
                          {allMedia}
                    </Carousel>
                  </div>)
        }
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
      var prevContentState = JSON.parse(textStateFromDB)
      if ( prevContentState.blocks && prevContentState.blocks[0] && prevContentState.blocks[0].text.length == 0  ) { //this means the text is empty
        return <div></div>
      }
      componentToReturn = EditorState.createWithContent(convertFromRaw(prevContentState))
      componentToReturn = <Editor readOnly={true} editorState={componentToReturn} onChange={(value) => {return null}} />
    } catch (e){
      componentToReturn = <div style={{marginLeft:10}} dangerouslySetInnerHTML={{__html: textStateFromDB}} />
    }
    return componentToReturn
  }

  prepareLine = (name,title,data) => {
    switch (name.toLowerCase()){
      case 'featuredimage':
        return <div></div>;
      case 'name':
        return <div><h3 style={{fontSize:18,fontWeight:500}}>{data}</h3></div>
      default:
        return <div>{title}<span style={{marginLeft:0}}>{data}</span></div>
    }
  }

  hasAnyMedia = ( media ) => {
    if (
      media.picture.length > 0 ||
      media.audio.length > 0 ||
      media.video.length > 0 ||
      media.text.length > 0
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {classes} = this.props
    // console.log('classes')
    // console.log(classes)
    const style = {
      margin: 12,
    };

    var loadingIndicator = (<Halogen.MoonLoader color={"blue"}/>)

    if ( !this.state || !this.state.recordData ){
      return <Card style={{minHeight:600,textAlign:"centered"}}>
                <div style={{width:100,height:100, marginLeft: "auto", marginRight: "auto" ,paddingTop: 30}}>{loadingIndicator}</div>
              </Card>
    }

    const baseImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg' // This is the image used by default when we have no image to show.

    let recordData  = this.state.recordData;

    let copyrightNotice = ""

    for ( var f in recordData.data.fields ){

      if ( recordData.data.fields[f].name === "featured copyright notice" ){
          copyrightNotice = recordData.data.fields[f].data
          break
      }

    }

    // debugger;
    let fieldsFlex = recordData.structure.info.map( (entry,i) => { // We look in the template structure so we follow the order in which the different fields appear in the template.

      for ( var a in recordData.data.fields ){ // Here we find the data in the record for the element in the template. Not the opposite because then we cannot guarantee the order of the fields.
        if ( recordData.data.fields[a].name == entry.name){
          entry = recordData.data.fields[a];
        }
      }

      let multiRows

      let fieldsToHide = ["Biography","Name",""]

      let title = fieldsToHide.includes(entry.name) ? "" : <h3 style={{fontSize:17,fontWeight:500}}>{entry.name == 'clerks' ? "Clerks" : entry.name}</h3>

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
                marginRight: 5,
              }

              return <span className={entry.name.toLowerCase()+" "+cell.name.toLowerCase()} key={j} style={{...styleBasic}}>{cell.data}</span>

            })

            return <div style={{marginLeft:5}} key={rowIndex}>{rowProcessed}</div>
          })


          return (
            <div key={i}>
              { entry.data.length > 0 ? title : <span></span> }
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

    let allImageUrls = []

    recordData.data.media.picture.map(
      (element,i) => (
        allImageUrls.push(URL_MULTIMEDIA + element.src)
      )
    )

    return (
      <Card
        expandable={false}
        initiallyExpanded={true}
        style={{
          // display: 'flex',
          padding:30,
          minHeight:600,
          // minWidth: 450,
          transition: 'all 0ms'
        }}
      >

        {this.state.isOpen &&
            <Lightbox
                mainSrc={recordData.data.featuredImage ?
                  URL_MULTIMEDIA + recordData.data.featuredImage:
                  baseImage}
                // nextSrc={images[(photoIndex + 1) % images.length]}
                // prevSrc={images[(photoIndex + images.length - 1) % images.length]}

                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() => this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                })}
                onMoveNextRequest={() => this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                })}

                reactModalStyle = {{overlay : {zIndex:5000}}}
                imageCaption ={<CardTitle title={copyrightNotice} style={{margin:0,padding:0,height:40}} titleStyle={{fontSize:"1.5em",lineHeight: 1,padding:5, color:"white"}} ></CardTitle>}
            />
        }

        <style>
        {"\
         .public-DraftEditor-content div{\
           word-wrap:normal;\
         }\
        "}
        </style>

         <Measure
           onMeasure={(dimensions) => {
             this.setState({dimensions})
           }}
         >
          <span className={"beingmeasured"} style={{ width:"100%", display: "inline-block", verticalAlign: "top"}}>
            <span
              style={{
                maxHeight:300,
                width:360,
                maxWidth:360,
                display: "inline-block",
                verticalAlign: "top",
                float:"left",
                margin:2,
                marginRight:10,
                marginTop:10,
                textAlign:"center"
              }}
              onClick={() => this.setState({ isOpen: true })}
            >
              <Card
                expandable={false}
                initiallyExpanded={true}
                containerStyle={{
                  transition: 'all 0ms'
                }}
                style={{
                  maxWidth:360,
                  border:"1px solid black",
                  transition: 'all 0ms'
                }}
                src={
                   recordData.data.featuredImage ?
                     URL_MULTIMEDIA + recordData.data.featuredImage:
                     baseImage
                }
              >
                <CardMedia
                  style={{
                    transition: 'all 0ms'
                  }}
                  overlay={<CardTitle title={copyrightNotice} style={{margin:0, padding:0, height:20}} titleStyle={{fontSize:10, lineHeight:1, padding:0}} ></CardTitle>}
                >
                  <span style={{width:360,height:250}}><img style={{maxHeight:250, maxWidth:360}} src={
                       recordData.data.featuredImage ?
                       URL_MULTIMEDIA + recordData.data.featuredImage:
                       baseImage
                  } /></span>
                </CardMedia>
              </Card>
            </span>

            {/* Right Multimedia panel */}
            <span
              className={classes.mediaPanel}
              style={{
                display: "inline-block",
                verticalAlign: "top",
                marginLeft: (this.state.dimensions.width < 746) ? 0 : 10,
                float: (this.state.dimensions.width < 747) ? 'none' : 'right',
                marginBottom:20
              }}
            >

              <Preload
                loadingIndicator={loadingIndicator}
                images={allImageUrls}
                autoResolveDelay={3000}
                onError={this._handleImageLoadError}
                onSuccess={() => this.setState({imagesReady : true})}
                resolveOnError={true}
                mountChildren={true}
              >
                  {this.getMediaPreviewers(recordData.data.media.picture,"picture")}
              </Preload>

              <span>{this.getMediaPreviewers(recordData.data.media.audio,"audio")}</span>
              <span>{this.getMediaPreviewers(recordData.data.media.video,"video")}</span>
              <span>{this.getMediaPreviewers(recordData.data.media.text,"text")}</span>
            </span>

            {/* Text in the Middle */}
            <div
              style={{
                paddingLeft: (this.state.dimensions.width < (626)) || this.hasAnyMedia(recordData.data.media) ? 0 : 365,
                clear: this.hasAnyMedia(recordData.data.media) ?
                                  ((this.state.dimensions.width < 1100 ) ? "both" : "none" ) :
                                  ((this.state.dimensions.width < 626 ) ? "both" : "none" ),
                maxWidth: "90%",
              }}
            >
              { fieldsFlex }
            </div>
          </span>
        </Measure>
      </Card>
    );
  }
}
