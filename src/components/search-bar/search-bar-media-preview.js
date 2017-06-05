import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SearchIcon from 'material-ui/svg-icons/action/search';
import BackspaceIcon from 'material-ui/svg-icons/content/backspace';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {grey700} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';
import Editor from 'draft-js-plugins-editor';

import { URL_CATEGORIES_LIST, URL_MULTIMEDIA, URL_BASE_MULTIMEDIA_IMAGES } from '../../links';

class SearchBarMediaPreview extends Component {

  handleOpen = () => {
    // this.setState({open: true});
  };

  handleClose = () => {
    this.props.closeHandler(this.props.media.title)
    // this.setState({open: false});
  };

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
    const baseAvatarImage = URL_BASE_MULTIMEDIA_IMAGES + '/institution-default.jpg'

    if ( this.props.visible ){
      return (
        <Dialog

          modal={false}
          open={this.props.visible}
          onRequestClose={this.handleClose}
          // autoScrollBodyContent={true}
          // bodyStyle={{overflowX:"scroll"}}
        >
        <img style={{maxWidth:"30%",maxHeight:"30vh",float:"left" }} src={this.props.recordData.featuredImage ? URL_MULTIMEDIA + this.props.recordData.featuredImage: baseAvatarImage}/>
        <span style={{marginLeft:"1%",width:"69%",maxHeight:"30vh",float:"left"}} >
          <span >
            <a href={this.props.entryURL}><h2 style={{marginTop:0}}>{this.props.recordData.recordName}</h2></a>
            <h3>{this.props.media.title}</h3>
          </span>
        </span>

        <div ><audio style={{width:"100%"}} controls src={URL_MULTIMEDIA+this.props.media.src}  /></div>
        <div style={{marginTop:10,overflowY:"scroll",height:"50vh",float:"left"}}>{this.richTextToComponent(this.props.media.transcript)}</div>



        </Dialog>

      );
    } else {
      return (
        <span></span>
      );
    }

  }
}

const mapStateToProps = (state, ownProps) => ({
  templateList: state.templateList || null,
  categoryData: state.categoryData || null,
  // if route contains params
  params: ownProps.params,
  location: ownProps.location
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarMediaPreview);
