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
        componentToReturn = <Editor editorState={componentToReturn} onChange={(value) => {return null}} />
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


    return (

      <Card style={{padding:3,paddingTop:5, minWidth:380, maxWidth:400,marginLeft:5,marginTop:5,display: "inline-block",zIndex: this.state.isOpen ? 200 : 1500}} onClick={this.openExtendedView}>

        {this.state.isOpen &&
                    <Lightbox
                        mainSrc={this.props.media.src}
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
                        imageCaption ={<CardTitle title={this.props.media.copyright ? this.props.media.copyright : ""} style={{margin:0,padding:0,height:40}} titleStyle={{fontSize:"1.5em",lineHeight: 1,padding:5, color:"white"}} ></CardTitle>}

                    />
                }


        <Dialog
              title={ <h2> {this.props.media.title || ""} <br/> <hr/> </h2>}
              actions={actions}
              modal={true}
              open={this.state.showExtendedDialog}
              style={{textAlign:"left"}}
              contentStyle={{
                  width: '70%',
                  maxWidth: 'none',
                  minWidth:900
                }}
            >
            <span onClick={() => this.setState({ isOpen: true })} style={{float:"left",width:"40%",textAlign:"center",marginRight:"1%", cursor:"pointer"}}>
              <PreviewGenerator element={this.props.media} style={{maxHeight:450,maxWidth:"100%"}} /> <br/><br/> <span>Click to enlarge picture</span>
            </span>

            <span style={{float:"left", width:"59%", textAlign:"left"}}>
              <span>{this.props.media.copyright ? "Copyright: "+ this.props.media.copyright : ""}</span><br/><br/>
              <span>Description:</span>
                <div style={{width:"100%",minHeight:350,overflowY:"scroll",border: "1px dashed lightgrey",textAlign:"center"}}>
                  {
                    this.props.media.transcript ? this.richTextToComponent(this.props.media.transcript) : <span></span>
                  }
                </div>
            </span>

         </Dialog>




         {/* <IconButton style={{float:"right"}} onClick={() => this.props.mediaDeleter(this.props.media.type,this.props.index)}>
            <ClearIcon />
          </IconButton> */}
        <span style={{maxWidth:"100%",fontSize:15,height:30}}>
          {
            this.props.media.title
          }
        </span>
        <br/>

        <span>
          <PreviewGenerator element={this.props.media} style={{maxHeight:250,maxWidth:"95%",marginTop:5}} />
        </span>
        <br/>
        { (this.props.media.transcript && this.props.media.transcript.length > 0 && (this.props.type === "audio" || this.props.type === "video"))
                      ? <RaisedButton label="Show Transcript" style={{margin:12}}
                        onClick={ () => this.state.showTranscript ? this.setState({showTranscript : false}) : this.setState({showTranscript : true})}/>
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
