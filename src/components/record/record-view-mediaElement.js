import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/border-color';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

// import getPreviewer from './previewGenerator'
import PreviewGenerator from './preview-generator'
import Lightbox from 'react-image-lightbox';


import Measure from 'react-measure';

export default class RecordViewMediaElement extends Component {
  constructor() {
    super()
    this.state = {showExtendedDialog:false};
  }

  openExtendedView = () =>{
    let allowedToShowDialog = ["video","picture"]

    if (allowedToShowDialog.includes(this.props.type) ){
      this.setState({showExtendedDialog: true})
    }
  }


  richTextToComponent = (textStateFromDB) => {
    var componentToReturn

    try {
      componentToReturn = EditorState.createWithContent(convertFromRaw(JSON.parse(textStateFromDB)))
      componentToReturn = <Editor editorState={componentToReturn} readOnly={true} onChange={(value) => {return null}} />
    } catch (e){
      console.log(e)
      componentToReturn = <div style={{marginLeft:10}} dangerouslySetInnerHTML={{__html: textStateFromDB}} />
    }
    return componentToReturn
  }

  render() {

    console.log(this.props.media)
    const actions = [
      <FlatButton
        label="Close [X]"
        primary={true}
        onTouchTap={() => this.setState({showExtendedDialog: false})}
      />,
    ];

    let pictureMediaElement = <CardMedia
              style={{
                transition: 'all 0ms'
              }}
              overlay={<CardTitle title={this.props.media.title} style={{margin:0,padding:0,height: this.props.media.title  ? 20 : 0}} titleStyle={{fontSize:10,lineHeight: 1,padding:0}} ></CardTitle>}
            >
              <span style={{width:345,height:250}}>
                <PreviewGenerator element={this.props.media} style={{maxHeight: 250,maxWidth:343}} />
              </span>
            </CardMedia>

    let otherMediaElement =
          <span>
            <span style={{maxWidth:"100%",fontSize:15,height:30}}>
              {
                this.props.media.title
              }
            </span>
            <br/>
            <span
              style={{
                float:"left",
                width: this.props.type === "audio" ? 260 : "100%",

              }}>
              <PreviewGenerator element={this.props.media} style={{maxHeight:250,maxWidth:"100%", minWidth: 100,marginTop:5}} />
            </span>

          </span>



    return (

      <Card style={{padding:3,paddingTop:5, display: "inline-block",zIndex: this.state.isOpen ? 200 : 1500}} onClick={this.openExtendedView}>

        {this.state.isOpen &&
          <Lightbox
              mainSrc={this.props.media.src}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() => this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
              })}
              onMoveNextRequest={() => this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
              })}

              reactModalStyle = {{overlay : {zIndex:5000}}}
              imageCaption ={<CardTitle title={this.props.media.copyright ? this.props.media.copyright : ""} style={{margin:0,padding:0,height:40}} titleStyle={{fontSize:"1.5em",lineHeight: 1,padding:5, color:"white"}} ></CardTitle>}
          />
        }

        {/* <Measure
          onMeasure={(dimensions) => {
            this.setState({dimensions})
          }}
        > */}
        <Dialog
          title={ this.props.media.title ? <h2> {this.props.media.title} <hr/> </h2> : ""}
          actions={actions}
          modal={true}
          open={this.state.showExtendedDialog}
          style={{paddingTop:0,marginTop:0, top: -40}}
          autoDetectWindowHeight={{false}}
          autoScrollBodyContent={{true}}
          contentStyle={{
            width: '94vw',
            maxWidth: 1000,
            minWidth:300,
            height:"100%"
          }}
          actionsContainerStyle	={{marginTop:0,paddingTop:0}}
          repositionOnUpdate={{false}}
        >

          <div onClick={() => this.setState({ isOpen: true })} style={{width:"100%",textAlign:"center",marginRight:"1%", cursor:"pointer", marginBottom:15}}>
            <PreviewGenerator element={this.props.media} style={{maxHeight:450,maxWidth:"100%"}} /> <br/><span>Click to enlarge picture</span>
          </div>

          <div style={{width:"100%", textAlign:"left",marginBottom:0, padding:0}}>

            <div style={{margin:10}}>Description:</div>
              <div style={{width:"95%",padding:"1%",margin:10,overflowY:"scroll",border: "1px dashed lightgrey",textAlign:"left"}}>
                {
                  this.props.media.transcript ? this.richTextToComponent(this.props.media.transcript) : <span></span>
                }
              </div>

              <div style={{marginTop:10,marginLeft:10}}>{this.props.media.copyright ? ""+ this.props.media.copyright : ""}</div>
          </div>


         </Dialog>
       {/* </Measure> */}

        {this.props.type == "picture" ? pictureMediaElement : otherMediaElement}

        { (this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video"))
                      ? <span style={{}}><RaisedButton label="Transcript" style={{height:31,marginTop:5}} labelStyle={{paddingLeft:10,paddingRight:10,marginLeft:10}}
                        onClick={ () => this.state.showTranscript ? this.setState({showTranscript : false}) : this.setState({showTranscript : true})}/></span>
                      : ""}

        { (this.state.showTranscript && this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video")) ?
              <div style = {{width:"100%", height:170, overflowY:"scroll",border: "1px dashed lightgrey",textAlign:"center"}}>
                {
                  this.props.media.transcript ? this.richTextToComponent(this.props.media.transcript) : <span></span>
                }
              </div> : <div></div>

        }
      </Card>
    );
  }
}
