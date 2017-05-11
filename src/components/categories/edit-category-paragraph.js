import React, { Component } from 'react';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import { EditorState, convertFromRaw, convertToRaw, convertFromHTML, ContentState} from 'draft-js';

import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'; // eslint-disable-line import/no-unresolved
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'; // eslint-disable-line import/no-unresolved

import fetchData from '../../network/fetch-data';

import editorStyles from './editorStyles.css';
import buttonStyles from './buttonStyles.css';
import toolbarStyles from './toolbarStyles.css';
import blockTypeSelectStyles from './blockTypeSelectStyles.css';

import RaisedButton from 'material-ui/RaisedButton';

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
} from 'draft-js-buttons';

const text = 'In this editor a toolbar shows up once you select part of the text …';

export default class EditCategoryParagraph extends Component {

  constructor(props) {
    super()
    var buttonStyles = {height: 60}
    var inlineplugin = createSideToolbarPlugin({
        structure: [
          BoldButton,
          ItalicButton,
          UnderlineButton,
          HeadlineOneButton,
          HeadlineTwoButton,
          HeadlineThreeButton,
          UnorderedListButton,
          OrderedListButton,
          BlockquoteButton,
        ]
    });

    this.state = {
      editorState: EditorState.createEmpty(),
      plugins : inlineplugin,
      type: props.type,
      subtype : props.subtype,
      isActive : props.isActive
    };

    this.loadPrevState (props.type, props.subtype);

  }

  async loadPrevState (type, subtype){
    let fetch = new fetchData()
    var prevEditorState = (await fetch.getParagraph(type,subtype)).paragraph

    if ( prevEditorState ){
      try{

        var prevState = EditorState.createWithContent(convertFromRaw(prevEditorState))
        this.setState({editorState: prevState})
      } catch (e){
        console.log(e)
      }
    }
    //console.log(prevEditorState)
  }

  componentWillReceiveProps (newProps){
    this.setState({isActive: newProps.isActive})
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  submit = (data) =>{
    var currentContentState = data.getCurrentContent()
    var rawContentState = convertToRaw(currentContentState)
    data = JSON.stringify(rawContentState)
    console.log(data)
    let fetch = new fetchData()
    fetch.updateParagraph(this.state.type, this.state.subtype, data)
    
  }

  render() {
    if ( !this.state.isActive ){
      return <span></span>
    }

    return (
      <div className={"editor"} onClick={this.focus}>
        <span><Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[this.state.plugins]}
          ref={(element) => { if (!this.editor) { this.editor = {} }; this.editor = element; }}
        />
        </span>
        <span className="tooly" style={{display:"inline-block",position:"absolute", top:15, right:0}}>{this.state.plugins.SideToolbar.prototype.render()}</span>
        <RaisedButton
          label="Submit"
          primary={true}
          // style={style}
          onClick={() => this.submit(this.state.editorState)}
        />
      </div>
    );
  }
}
